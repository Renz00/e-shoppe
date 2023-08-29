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
          <v-btn icon="" id="menu-activator" color="black">
            <v-icon icon="mdi-menu"></v-icon>
          </v-btn>
          <v-menu activator="#menu-activator" v-model="showHamburgerMenu" :close-on-content-click="false">
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <SearchBar :showLinks="showLinks"/>
                </v-list-item-title>
              </v-list-item>
              <v-list-item :to="{ name: 'ProductsView' }" @click="showHamburgerMenu = false" link>
                <v-list-item-title>
                  Home
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="showHamburgerMenu = false" link>
                <v-list-item-title>
                  Men Apparel
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="showHamburgerMenu = false" link>
                <v-list-item-title>
                  Women Apparel
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="showHamburgerMenu = false" link>
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
            <div>
               <SearchBar :showLinks="showLinks"/>
            </div>
            <div class="ml-1">
              <v-btn icon="" :to="{ name: 'CartView' }" v-if="cartItemCount > 0">
                  <v-badge :content="cartItemCount" color="error">
                    <v-icon icon="mdi-cart-outline"></v-icon>
                  </v-badge>
              </v-btn>

              <v-tooltip
                  v-model="showCartTooltip"
                  text="No Items in Cart."
                  location="top"
                  open-on-click
                  :open-on-hover="false"
                  v-else
              >
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" icon="mdi-cart-outline" @click="showCartTooltip=true">
                    </v-btn>
                  </template>
              </v-tooltip>
            </div>
            <div class="mr-5">
              <v-btn id="menu-activator3" icon=""><v-icon icon="mdi-account-circle"></v-icon></v-btn>
              <v-menu activator="#menu-activator3">
                <v-list>
                  <v-list-item link>
                    <v-list-item-title>
                      <span class="text-truncate">
                        Track Orders
                      </span>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item link>
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
import SearchBar from '@/components/products/SearchBar.vue'
import { ref, computed, watchEffect } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
  cartItemCount: Number,
})

const { mobile } = useDisplay()
const searchValues = ref('')
const showHamburgerMenu = ref(false)
const showCartTooltip = ref(false)
const loading = ref(false)
const items = ref([])
const search = ref(null)
const searchValue = ref(null)
const searchProducts = [
    'Shoes',
    'Dresses',
    'Gadgets'
]

watchEffect(() => {
  if (showCartTooltip.value){
      setTimeout(() => {
        showCartTooltip.value = false
      }, 1000)
  }
  //Watch changes in the value of search
  if (search.value){
    search.value && search.value !== searchValue.value && querySelections(search.value)
  }
})

function querySelections (newVal) {
  loading.value = true
  setTimeout(() => {
    items.value = searchProducts.filter(e => {
      return (e || '').toLowerCase().indexOf((newVal || '').toLowerCase()) > -1
    })
    loading.value = false 
  }, 500)
}

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
