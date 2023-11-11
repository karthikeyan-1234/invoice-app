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
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: '',
      calories: 0
    },
    defaultItem: {
      id: 0,
      name: 'New Item',
      calories: 0
    }
  }),
  created () {
    this.initialize();
  },
  async mounted(){
    console.log("Calling purchases")
    var res = await purchaseService.TestMethod();
    console.log(res.data);
  },
  methods: {
    async initialize () {

      var res = await purchaseService.TestMethod(); 
      this.desserts = res.data;
    },
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },
    deleteItem (item) {
      const index = this.desserts.indexOf(item);
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);
    },
    close () {
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300)
    },
    addNew() {
       const addObj = Object.assign({}, this.defaultItem);
       addObj.id = this.desserts.length + 1;
       this.desserts.unshift(addObj);
       this.editItem(addObj);
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      }
      this.close()
    }
    }
  }
</script>