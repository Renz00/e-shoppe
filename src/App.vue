<template>
  <v-app id="inspire">

    <Navbar />
    <v-main>
      <Banner />
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Banner from "./components/Banner.vue"
import Navbar from "./components/Navbar.vue"
</script>
