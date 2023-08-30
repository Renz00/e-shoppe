<template>
  <v-app>
    <Navbar :cartItemCount="cartItemCount" :showLinks="showLinks"/>
    <v-main>
      <router-view :cartItemCount="cartItemCount" :showLinks="showLinks"/>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import Navbar from "./components/layout/Navbar.vue"
import Footer from "./components/layout/Footer.vue"
import { storeToRefs } from "pinia";
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useProductStore } from '@/store/product-store'

const { cartItemCount } = storeToRefs(useProductStore())

//Used to check if display size is for mobile. mobile.value is Boolean
const { mobile } = useDisplay()
const showLinks = computed(() => {
  return mobile.value
})

</script>

<style lang="scss">
  @import './styles/styles.scss';
</style>
