<template>
  <v-row class="justify-center text-center">
      <v-col class="mb-5" cols="12" sm="6" lg="3" md="4" v-for="product in products" :key="product.id">
          <v-card @click="router.push({ name: 'ShowProductView'})" variant="outlined">
              <div class="d-flex justify-center align-center">
                <v-img
                  @loadstart="imgload=true"
                  @load="imgload=false"
                  lazy-src="https://picsum.photos/600/700"
                  aspect-ratio="4/3"
                  width="auto"
                  height="auto"
                  src="https://picsum.photos/600/700"
                  >
                  <div class="d-flex align-center justify-center fill-height py-5" v-if="imgload">
                    <v-progress-circular
                      color="blue"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </v-img>
              </div>
              <div class="pa-2">
                <div class="text-h6 mb-1">
                  {{ product.title }}
                </div>
                <div class="text-caption font-italic">
                  {{ product.category }}
                </div>
                <div class="text-caption text-truncate">{{ product.rating+' | ₱ '+product.price }}</div>
              </div>
          <v-card-actions>
            <!-- click.stop prevents child click from triggering parent click -->
            <v-btn @click.stop="emits('emitSetCartItemCount')" width="100%" variant="outlined">
              <v-icon icon="mdi-cart-plus"></v-icon>
            </v-btn>
          </v-card-actions>
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
