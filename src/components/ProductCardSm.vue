<template>
  <v-row class="justify-center text-center">
      <v-col class="mb-5" cols="12" sm="6" lg="3" md="4" v-for="product in products" :key="product.id">
        <v-sheet>
          <v-card :to="{name: 'ShowProductView'}" max-width="400" variant="outlined">
          <v-card-item>
            <v-row class="justify-center align-center text-center mb-1">
              <v-col>
                <v-img
                  @loadstart="imgload=true"
                  @load="imgload=false"
                  lazy-src="https://picsum.photos/600/700"
                  aspect-ratio="4/3"
                  width="auto"
                  height="auto"
                  src="https://picsum.photos/600/700"
                  >
                  <div class="d-flex align-center justify-center fill-height" v-if="imgload">
                    <v-progress-circular
                      color="blue"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </v-img>
              </v-col>
            </v-row>

              <div class="text-h6 mb-1">
                {{ product.title }}
              </div>
              <div class="text-caption font-italic">
                {{ product.category }}
              </div>
              <div class="text-caption text-truncate">{{ product.description }}</div>
          </v-card-item>
          <v-card-actions>
            <v-btn variant="outlined">
              <v-icon icon="mdi-cart-plus"></v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-sheet>
      </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  products: Array,
})

var imgload = ref(false)
</script>
