<template>
  <nav>
      <v-app-bar  color="red" dark app >
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title class="text-uppercase ">
              <span>Business Manager</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu offset-y>
     <v-list flat>
       <v-list-item v-for="link in links"  :key="link.text" router :to="link.route" active-class="border">
         <v-list-item-title >{{link.text}}</v-list-item-title>
       </v-list-item>
     </v-list>
           </v-menu>
           <v-btn text>
               <span>Exit</span>
               <v-icon right>exit_to_app</v-icon>
            </v-btn>
      </v-app-bar>
     <v-navigation-drawer  v-model="drawer" dark app class="red darken-4">
         <v-list flat>
             <v-list-item v-for="link in links"  :key="link.text" router :to="link.route" active-class="border">
                 <v-list-item-action>
                    <v-icon >{{link.icon}}</v-icon>
                 </v-list-item-action>
                 <v-list-item-content >
                     <v-list-item-title >{{link.text}}</v-list-item-title>
                 </v-list-item-content>
             </v-list-item>
         </v-list>
     </v-navigation-drawer>
  </nav>
</template>
<script>
import Popup from './Popup.vue'
export default {
  data: () => ({
     drawer: true,
     links :[
         {icon: 'dashboard', text:'Dashboard', route: '/'},
         {icon: 'shop_two', text:'Purchases', route: '/purchases'},
         {icon: 'summarize', text:'Sales', route: '/sales'},
         {icon: 'category', text:'Materials', route: '/materials'},
         {icon: 'summarize', text:'Reports', route: '/reports'},

     ]
    
   }),
   components: {
   Popup
 },

  
}
</script>
<style scoped>
.border {
 border-left: 4px solid #0ba518;
}
</style>