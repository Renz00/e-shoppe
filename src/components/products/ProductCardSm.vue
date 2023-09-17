<template>
  <v-container class="py-0 my-0" fluid>
      <v-row class="justify-center text-center">
      <v-col class="pb-3 px-2" cols="12" sm="6" lg="3" md="4" v-for="product in products" :key="product.id">
          <v-card @click="router.push({ name: 'ShowProductView'})">
              <div class="d-flex">
                <v-img
                  @loadstart="imgload=true"
                  @load="imgload=false"
                  lazy-src="https://picsum.photos/600/700"
                  aspect-ratio="4/3"
                  width="auto"
                  height="250"
                  cover
                  src="https://picsum.photos/600/700"
                  >
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular
                        color="primary"
                        indeterminate
                      ></v-progress-circular>
                    </div>
                  </template>
                </v-img>
              </div>
              <div class="pa-2">
                <div class="text-h6 mb-1">
                  {{ product.product_name }}
                </div>
                <v-divider></v-divider>
                <div class="text-caption font-weight-bold">
                  {{ category(product.product_category) }}
                </div>
                <div class="d-flex justify-center align-center text-caption text-truncate">
                  <v-icon icon="mdi-star" color="yellow"></v-icon>{{ product.product_rating+' | ₱'+product.product_price.toLocaleString() }}
                </div>
              </div>
            <!-- click.stop prevents child click from triggering parent click -->
            <v-btn class="rounded-0" @click.stop="setCartItemCount" width="100%" color="success">
              <span style="color: white;">
                Add to Cart
              </span>
            </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup>
import { ref, computed } from 'vue';
import router from '@/router/index';
import { useProductStore } from '@/store/product-store'

const { setCartItemCount } = useProductStore()

const props = defineProps({
  products: Array,
})

var imgload = ref(false)

const category = (val) => {
  switch (val){
    case 1:
      return 'Gadgets'
      break
    case 2:
      return 'Cosmetics'
      break
    case 3:
      return 'Apparel'
      break
    default:
      break
  }
}

</script>
