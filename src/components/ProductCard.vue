<template>
  <v-row class="justify-center text-center pt-10">
      <v-col cols="12" sm="6" lg="3" md="4" v-for="product in products" :key="product.id">
        <v-sheet>
          <v-card variant="outlined">
          <v-card-item class="justify-center align-center text-center">
              <div class="text-overline mb-1">
                <img src="https://picsum.photos/350/150" alt="">
              </div>
              <div class="text-h6 mb-1">
                {{ product.title }}
              </div>
              <div class="text-caption text-truncate">{{ product.description }}</div>
          </v-card-item>
          <v-card-actions>
            <v-btn variant="outlined">
              <v-icon icon="mdi-cart-plus"></v-icon>
            </v-btn>
            <v-btn variant="outlined">
              <v-icon icon="mdi-eye-outline"></v-icon>
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
