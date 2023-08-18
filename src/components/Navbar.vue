<template>
  <v-app-bar height="50">
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    <v-app-bar-title class="ml-10" v-if="!showLinks">
      <router-link style="text-decoration: none; color: black;" class="text-h6 text--black" :to="{name: 'ProductsView'}">
        E-Shoppe
      </router-link>
    </v-app-bar-title>
    <v-row>
      <v-col>
        <span v-if="!showLinks">
          <v-btn variant="text">Men</v-btn>
          <v-btn variant="text">Women</v-btn>
          <v-btn variant="text">Kids</v-btn>
        </span>
        <span class="ml-5" v-if="showLinks">
          <v-btn
            id="menu-activator"
            color="black"
          > 
          <v-icon icon="mdi-menu"></v-icon>
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
    <div class="mr-1">
      <v-btn icon="" id="menu-activator2">
      <span v-if="cartItemCount>0">
        <v-badge :content="cartItemCount" color="error">
          <v-icon icon="mdi-cart-outline"></v-icon>
        </v-badge>
      </span>
      <span v-else>
        <v-icon icon="mdi-cart-outline"></v-icon>
      </span>
    </v-btn>
    <v-menu activator="#menu-activator2">
        <v-list>
          <v-list-item v-for="n of cartItemCount">
            <v-list-item-title>
              <span class="text-truncate">
                Product {{ n }} added to cart!
              </span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="mr-5">
      <v-btn id="menu-activator3" icon=""><v-icon icon="mdi-account-circle"></v-icon></v-btn>
      <v-menu activator="#menu-activator3">
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <span class="text-truncate">
                  Profile
                </span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <span class="text-truncate">
                  Account Settings
                </span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <span class="text-truncate">
                  Logout
                </span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    </div>
  </v-app-bar>
</template>


<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
    cartItemCount: Number,
})
const { mobile } = useDisplay()

const showLinks = computed(() => {
    return mobile.value
})
</script>
