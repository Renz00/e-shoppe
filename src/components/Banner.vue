<template>
<v-sheet height="500" width="auto" color='black'>
    <v-img
      height="100%"
      width="100%"
      aspect-ratio="16/9"
      cover
      src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
    >
      <v-container>
        <v-row class="justify-center align-center text-center mt-15 pt-15 mx-15">
          <v-spacer width="25%"></v-spacer>
          <v-col cols='auto' sm="6">
            <span class="text-h3">
              Buy what you love
              <v-icon icon="mdi-heart-outline" size="small"></v-icon>
            </span>
          </v-col>
          <v-spacer width="25%"></v-spacer>
        </v-row>
        <v-row class="mt-10 mx-15">
          <v-spacer width="10%"></v-spacer>
          <v-col cols='12'>
              <v-autocomplete
                class="text-white"
                placeholder="Find your product"
                variant="solo"
                bg-color="#FF7043"
                v-model="values"
                :items="items"
                dark
                clearable
              >
              <template v-slot:prepend-inner>
                <v-icon icon="mdi-magnify" color="white"></v-icon>
              </template>
                <template v-slot:no-data>
                  <span class="px-5">No results</span>
                </template>
              </v-autocomplete>
          </v-col>
          <v-spacer width="10%"></v-spacer>
        
        </v-row>
    </v-container>
  </v-img>
</v-sheet>
</template>

<script setup>
import { ref } from 'vue';

const items = ref(['Shoes', 'Dresses', 'Shirts'])
const values = ref('')
</script>

<style>
    .text-white input {
      color: white !important;
    }
</style>



