<template>
  <v-app>
    <Navbar :cartItemCount="cartItemCount"/>
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue"

import { storeToRefs } from "pinia";
import { useProductStore } from '@/store/product-store'

const { cartItemCount } = storeToRefs(useProductStore())

</script>

<style lang="scss">
  @import './styles/styles.scss';
</style>
