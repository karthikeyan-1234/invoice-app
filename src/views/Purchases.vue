<template>
    <div id="app">
  <v-app id="inspire">
    <v-card class="purchase-card" outlined>
      <v-card-title>Purchases
        <v-btn
                color="primary"
                class="ml-2 white--text"
                @click="addNew">
                <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>

      <v-card>
        <div>
        <table>
          <tr>
            <td>
              <v-label>Purchase Date</v-label>
            </td>
            <td>
              <v-label>Vendor ID</v-label>
            </td>
          </tr>
          <tr>
            <td>
              <v-text-field v-model="defaultItem.purchaseDate" outlined dense  type="date">
              </v-text-field>
            </td>
            <td><v-text-field v-model="defaultItem.vendorId" outlined dense @keydown.enter="pushNew()" ref="firstText"></v-text-field></td>
          </tr>
        </table>
      </div>
      </v-card>



      <div>
        <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-1" fixed-header height="300px">
          <v-divider inset></v-divider>

          <template v-slot:item.id="{ item }">
            <span>{{item.id}}</span>
          </template>
          <template v-slot:item.purchaseDate="{ item }">
            <v-text-field v-model="editedItem.purchaseDate" :hide-details="true" dense single-line v-if="item.id === editedItem.id" >
              <template v-slot:append-outer>
                <date-picker v-model="editedItem.purchaseDate" />
              </template>
            </v-text-field>
            <span v-else>{{item.purchaseDate}}</span>
          </template>
          <template v-slot:item.vendorId="{ item }">
            <v-text-field v-model="editedItem.vendorId" :hide-details="true" dense single-line v-if="item.id === editedItem.id" ></v-text-field>
            <span v-else>{{item.vendorId}}</span>
          </template>

          <template v-slot:item.actions="{ item }">

            <div v-if="item.id === editedItem.id">
              <v-icon color="red" class="mr-3" @click="close">
                mdi-window-close
              </v-icon>
              <v-icon color="green"  @click="save">
                mdi-content-save
              </v-icon>
            </div>

            <div v-else>
              <v-icon color="green" class="mr-3" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon color="red" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </div>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>

        </v-data-table>
      </div>
    </v-card>
  </v-app>
</div>
</template>

<style>
.purchase-card{
  margin-left:50px;
  margin-top:50px;
  height: 100px;
  width:800px;
  max-height: 120px;
}

.v-data-table__wrapper {
  max-height: none !important;
}

.v-data-table__wrapper thead {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
}
</style>

<script>

import purchaseService from '../services/PurchaseService'
import DatePicker from "../components/DatePicker.vue";
import { VLabel } from 'vuetify/lib';
import { VAlert } from 'vuetify/lib';
import moment from 'moment';

 export default {
    name: 'Purchases',
    components: {
      DatePicker
    },
    data: () => ({
    search: '',
    headers: [
      {
        text: 'Id',
        value: 'id',
        sortable: true,
        width: '200px'
      },
      {
        text: 'Purchases Date',
        value: 'purchaseDate',
        sortable: false
      },
      {
        text: 'Vendor ID',
        value: 'vendorId',
        sortable: false
      },
      { text: 'Actions', value: 'actions', sortable: false , width: "100px"},
    ],
    desserts: [],
    editedItem: {
      id: 0,
      purchaseDate: '',
      vendorId: 0
    },
    defaultItem: {
      id: -1,
      purchaseDate: moment().format('yyyy-MM-DD'),
      vendorId: 0
    },
    oldItem:{},
    isEdited: false
  }),
  created () {
    this.initialize();
  },
  async mounted(){
  },
  methods: {
    async initialize () {
      var res = await purchaseService.TestMethod(); 
      this.desserts = JSON.parse(JSON.stringify(res.data));
    },
    editItem(item) {
      this.oldItem = item;
      this.editedItem = JSON.parse(JSON.stringify(item));
      this.isEdited = true;
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);
    },
    resetDefaultItem(){
      this.defaultItem = {};
      this.defaultItem.purchaseDate = moment().format('yyyy-MM-DD');
      this.$refs["firstText"].focus();
    },
    pushNew(){
      this.isEdited = false;
      if(this.desserts.length > 0)
        this.defaultItem.id = this.desserts[0].id + 1;
      else
        this.defaultItem.id = 1;
      this.addNew();
      this.isEdited = true;
      this.save();
      this.resetDefaultItem();
    },
    addNew() {
      if(this.isEdited) return;
      console.log("Adding new item");
      this.desserts.unshift(JSON.parse(JSON.stringify(this.defaultItem)));
      this.editItem(this.defaultItem);
    },
    save () {
      if(!this.isEdited) return;

      if(this.editedItem.id == -1 || this.editedItem.id == undefined)
      {
        Object.assign(this.desserts[0],this.editedItem);
        if(this.desserts.length > 1)
          this.desserts[0].id = this.desserts[1].id + 1;
      }
      else
      {
        var index = this.desserts.indexOf(this.oldItem);
        if(index != -1)
          Object.assign(this.desserts[index],this.editedItem);
      }

      this.isEdited = false;
      this.close()
    },
    close () {
    this.editedItem = {};
    }
    }
    
  }
</script>