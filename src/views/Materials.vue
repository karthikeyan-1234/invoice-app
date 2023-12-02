<template>
    <div id="app">
  <v-app id="inspire">
    <v-card class="purchase-card" outlined>
      <v-card-title>Materials
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
            <td><v-label>Material Name</v-label></td>
            <td><v-label>Description</v-label></td>
            <td><v-label>Expiry Days</v-label></td>
          </tr>

          <tr>
            <td><v-text-field v-model="defaultItem.name" outlined dense ref="firstText"></v-text-field></td>
            <td><v-text-field v-model="defaultItem.description" outlined dense @keydown.enter="pushNew()"></v-text-field></td>
            <td><v-text-field v-model="defaultItem.expiryInDays" outlined dense @keydown.enter="pushNew()"></v-text-field></td>

          </tr>

        </table>
      </div>
      </v-card>



      <div>
        <v-data-table :headers="headers" :items="entries" :search="search" class="elevation-1" fixed-header height="300px">
          <v-divider inset></v-divider>

          <template v-slot:item.id="{ item }">
            <span>{{item.id}}</span>
          </template>

          <template v-slot:item.name="{ item }">
            <v-text-field v-model="editedItem.name" :hide-details="true" dense single-line v-if="item.id === editedItem.id" ></v-text-field>
            <span v-else>{{item.name}}</span>
          </template>

          <template v-slot:item.description="{ item }">
            <v-text-field v-model="editedItem.description" :hide-details="true" dense single-line v-if="item.id === editedItem.id" ></v-text-field>
            <span v-else>{{item.description}}</span>
          </template>

          <template v-slot:item.expiryInDays="{ item }">
            <v-text-field v-model="editedItem.expiryInDays" :hide-details="true" dense single-line v-if="item.id === editedItem.id" ></v-text-field>
            <span v-else>{{item.expiryInDays}}</span>
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

import materialService from '../services/MaterialService'
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
        text: 'Name',
        value: 'name',
        sortable: false
      },
      {
        text: 'Description',
        value: 'description',
        sortable: false
      },
      {
        text: 'Expiry in Days',
        value: 'expiryInDays',
        sortable: false
      },
      { text: 'Actions', value: 'actions', sortable: false , width: "100px"},
    ],
    entries: [],
    editedItem: {
      id: 0,
      name: '',
      description: 0,
      expiryInDays: 0
    },
    defaultItem: {
      id: -1,
      name: '',
      description: 0,
      expiryInDays: 0
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
      var res = await materialService.TestMethod(); 
      this.entries = JSON.parse(JSON.stringify(res.data));
    },
    editItem(item) {
      this.oldItem = item;
      this.editedItem = JSON.parse(JSON.stringify(item));
      this.isEdited = true;
    },
    deleteItem(item) {
      const index = this.entries.indexOf(item);
      confirm('Are you sure you want to delete this item?') && this.entries.splice(index, 1);
    },
    resetDefaultItem(){
      this.defaultItem = {};
      this.$refs["firstText"].focus();
    },
    pushNew(){
      this.isEdited = false;
      if(this.entries.length > 0)
        this.defaultItem.id = this.entries.length + 1;
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
      this.entries.unshift(JSON.parse(JSON.stringify(this.defaultItem)));
      this.editItem(this.defaultItem);
    },
    save () {
      if(!this.isEdited) return;

      if(this.editedItem.id == -1 || this.editedItem.id == undefined)
      {
        Object.assign(this.entries[0],this.editedItem);
        if(this.entries.length > 1)
          this.entries[0].id = this.entries.length + 1;
      }
      else
      {
        var index = this.entries.indexOf(this.oldItem);
        if(index != -1)
          Object.assign(this.entries[index],this.editedItem);
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