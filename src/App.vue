<template>
  <v-app>
    <Navbar :cartItemCount="cartItemCount"/>
    <v-main>
      <router-view :cartItemCount="cartItemCount"/>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import Navbar from "./components/layout/Navbar.vue"
import Footer from "./components/layout/Footer.vue"

import { storeToRefs } from "pinia";
import { useProductStore } from '@/store/product-store'

const { cartItemCount } = storeToRefs(useProductStore())

</script>

<style lang="scss">
  @import './styles/styles.scss';
</style>
