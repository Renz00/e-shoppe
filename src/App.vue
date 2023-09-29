<template>
  <v-app>
    <Navbar :cartItemCount="cartItemCount" :mobileView="mobileView"/>
    <v-main>
        <router-view :cartItemCount="cartItemCount" :mobileView="mobileView"/>
    </v-main>
    <AuthDialog />
    <Footer />
  </v-app>
</template>

<script setup>
import Navbar from "./components/layout/Navbar.vue"
import Footer from "./components/layout/Footer.vue"
import AuthDialog from "./components/auth/authDialog.vue";

import { storeToRefs } from "pinia";
import { computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useProductStore } from '@/store/product-store'
import { useAuthStore } from '@/store/auth-store'

const { cartItemCount } = storeToRefs(useProductStore())
const { getCartItemCount } = useProductStore()
const { isLoggedIn } = storeToRefs(useAuthStore())

//Used to check if display size is for mobile. mobile.value is Boolean
const { mobile } = useDisplay()

const mobileView = computed(() => {
  return mobile.value
})

onMounted ( async () => {

  if (sessionStorage.getItem('cart')!=null){
    //sets the value of states cartItemCount and cartItems in product-store
    getCartItemCount()
  }

  if (sessionStorage.getItem('data')!=null){
    isLoggedIn.value = true
  }
  else {
    isLoggedIn.value = false
  }
  
})
</script>

<style lang="scss">
  @import './styles/styles.scss';
</style>
