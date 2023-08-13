<template>
  <v-app-bar height="10%">
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    <v-app-bar-title class="ml-10">E-Shoppe</v-app-bar-title>

    <v-row>
      <v-col>
        <span v-if="!showLinks">
          <v-btn variant="text">Men</v-btn>
          <v-btn variant="text">Women</v-btn>
          <v-btn variant="text">Kids</v-btn>
        </span>
        <span v-if="showLinks">
          <v-btn
            id="menu-activator"
            color="black"
          >
            Categories
          </v-btn>
          <v-menu activator="#menu-activator">
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-btn variant="plain">Men</v-btn>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-btn variant="plain">Women</v-btn>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-btn variant="plain">Kids</v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </span>
      </v-col>
    </v-row>
    <v-btn icon="mdi-dots-vertical"  class="mr-5"></v-btn>

  </v-app-bar>
</template>


<script setup>
  import { onMounted, computed } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const showLinks = computed(() => {
    return mobile.value
  })
</script>
