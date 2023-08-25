<template>
  <v-app-bar class="elevation-2" height="50">
    <v-row>
      <v-col class="d-flex justify-start align-center" v-if="!showLinks">
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
        <v-app-bar-title class="ml-10">
          <router-link style="text-decoration: none; color: black;" class="text-h6 text--black"
            :to="{ name: 'ProductsView' }">
            E-Shoppe
          </router-link>
        </v-app-bar-title>
      </v-col>
      <v-col class="d-flex justify-start justify-lg-center align-center">
        <div v-if="!showLinks">
          <v-row>
            <v-btn variant="text">Men Apparel</v-btn>
            <v-btn variant="text">Women Apparel</v-btn>
            <v-btn variant="text">Gadgets</v-btn>
          </v-row>
        </div>
        <div class="ml-5" v-if="showLinks">
          <v-btn id="menu-activator" color="black">
            <v-icon icon="mdi-menu"></v-icon>
          </v-btn>
          <v-menu activator="#menu-activator" :close-on-content-click="false">
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-autocomplete
                    class="white--text rounded-outline pt-2"
                    v-model="searchValues"
                    style="width: 300px;"
                    :items="searchItems"
                    variant="outlined"
                    density="compact"
                    rounded
                    center-affix
                    v-if="showLinks"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon icon="mdi-magnify" color="black"></v-icon>
                    </template>
                    <template v-slot:no-data>
                      <span class="px-5">No results</span>
                    </template>
                  </v-autocomplete>
                </v-list-item-title>
              </v-list-item>
              <v-list-item :to="{ name: 'ProductsView' }" link>
                <v-list-item-title>
                  Home
                </v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-title>
                  Men Apparel
                </v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-title>
                  Women Apparel
                </v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-title>
                  Gadgets
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
      <v-col>
        <v-row>
          <v-col class="d-flex justify-end align-center">
            <div class="pt-5">
              <v-autocomplete
                class="white--text rounded-outline"
                v-model="searchValues"
                style="width: 300px;"
                :items="searchItems"
                variant="outlined"
                density="compact"
                rounded
                center-affix
                v-if="!showLinks"
              >
                <template v-slot:prepend-inner>
                  <v-icon icon="mdi-magnify" color="black"></v-icon>
                </template>
                <template v-slot:no-data>
                  <span class="px-5">No results</span>
                </template>
              </v-autocomplete>
            </div>
            <div class="ml-1">
              <v-btn icon="" :to="{ name: 'CartView' }">
                <span v-if="cartItemCount > 0">
                  <v-badge :content="cartItemCount" color="error">
                    <v-icon icon="mdi-cart-outline"></v-icon>
                  </v-badge>
                </span>
                <span v-else>
                  <v-icon icon="mdi-cart-outline"></v-icon>
                </span>
              </v-btn>
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
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-app-bar>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
  cartItemCount: Number,
})
const searchItems = ref(['Shoes', 'Dresses', 'Shirts'])
const searchValues = ref('')
const { mobile } = useDisplay()

const showLinks = computed(() => {
  return mobile.value
})
</script>


<style scoped lang="scss">
.rounded-outline:deep(.v-field__outline) {
  border: 1px solid black;
  border-radius: 999px !important;

  .v-field__outline__start,
  .v-field__outline__end {
    border: none !important;
  }
}
</style>
