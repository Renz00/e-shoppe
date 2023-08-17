<template>
  <v-app-bar height="10%">
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
            icon="mdi-menu"
          > 
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
    <v-btn icon="mdi-cart-outline" id="menu-activator2"></v-btn>
    <v-menu activator="#menu-activator2">
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <span class="text-truncate">
                Item 1
              </span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <span class="text-truncate">
                Item 2
              </span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <span class="text-truncate">
                Item 3
              </span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    <v-btn icon="mdi-account-circle" id="menu-activator3" class="mr-5"></v-btn>
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
  </v-app-bar>
</template>


<script setup>
  import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const showLinks = computed(() => {
    return mobile.value
  })
</script>
