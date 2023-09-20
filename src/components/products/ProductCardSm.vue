<template>
  <v-container class="py-0 my-0" fluid>
    <v-sheet height="auto">
      <v-row class="justify-center text-center">
      <v-col class="pb-3 px-2" cols="12" sm="6" lg="3" md="4" v-for="(product, key) in products" :key="key">
          <v-card :to="{name: 'ShowProductView', params: {productId: product.id}}">
              <div class="d-flex">
                <v-img
                  @loadstart="imgload=true"
                  @load="imgload=false"
                  lazy-src="https://picsum.photos/600/700"
                  aspect-ratio="4/3"
                  width="auto"
                  height="230"
                  cover
                  src="https://picsum.photos/600/700"
                  >
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular
                        :size="50" 
                        color="primary"
                        indeterminate
                      ></v-progress-circular>
                    </div>
                  </template>
                </v-img>
              </div>
              <div class="pa-2">
                <div class="text-subtitle-1 mb-1">
                  {{ product.product_name }}
                </div>
                <v-divider class="mb-1"></v-divider>
                <div class="text-caption font-weight-bold mb-1">
                  {{ category(product.product_category)+' | '}}<v-icon icon="mdi-star" color="yellow"></v-icon>{{product.product_rating }}
                </div>
                <div class="d-flex justify-center align-center text-subtitle-2 text-truncate">
                  {{ '₱'+product.product_price.toLocaleString() }}
                </div>
              </div>
            <!-- click.stop prevents child click from triggering parent click -->
            <v-btn class="rounded-0" @click.stop="setCartItemCount()" width="100%" color="success">
              <span style="color: white;">
                Add to Cart
              </span>
            </v-btn>
        </v-card>
      </v-col>
      </v-row>
    </v-sheet>
  </v-container>

</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
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
