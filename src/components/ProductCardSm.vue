<template>
  <v-row class="justify-center text-center pt-5">
      <v-col class="mb-5" cols="12" sm="6" lg="3" md="4" v-for="product in products" :key="product.id">
        <v-sheet>
          <v-card :to="{name: 'ShowProductView'}" variant="outlined">
          <v-card-item>
            <v-row class="justify-center align-center text-center mb-1">
              <div class="text-overline">
                <v-img
                class="mx-auto"
                  lazy-src="https://picsum.photos/900/400"
                  :width="400"
                  :height="150"
                  src="https://picsum.photos/900/400"
                >
                  <template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular
                        color="grey-4"
                        indeterminate
                      ></v-progress-circular>
                    </div>
                  </template>
                </v-img>
              </div>
            </v-row>
              
              <div class="text-h6 mb-1">
                {{ product.title }}
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
const props = defineProps({
    products: Array,
})
</script>
