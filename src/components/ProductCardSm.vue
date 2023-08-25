<template>
  <v-row class="justify-center text-center">
      <v-col class="mb-5" cols="12" sm="6" lg="3" md="4" v-for="product in products" :key="product.id">
          <v-card @click="router.push({ name: 'ShowProductView'})">
              <div class="d-flex">
                <v-img
                  @loadstart="imgload=true"
                  @load="imgload=false"
                  lazy-src="https://picsum.photos/600/700"
                  aspect-ratio="4/3"
                  width="auto"
                  height="320"
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
                  {{ product.title }}
                </div>
                <div class="text-caption font-italic">
                  {{ product.category }}
                </div>
                <div class="d-flex justify-center align-center text-caption text-truncate">
                  <v-icon icon="mdi-star" color="yellow"></v-icon>{{ product.rating+' | ₱'+product.price.toLocaleString() }}
                </div>
              </div>
            <!-- click.stop prevents child click from triggering parent click -->
            <v-btn class="rounded-0" @click.stop="emits('emitSetCartItemCount')" width="100%" color="secondary">
              <span style="color: white;">
                Add to Cart
              </span>
            </v-btn>
        </v-card>
        
      </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router/index';

const props = defineProps({
  products: Array,
})

var imgload = ref(false)

const emits = defineEmits(['emitSetCartItemCount'])
</script>
