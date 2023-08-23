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
        <v-row class="justify-center text-center mt-15 pt-15 mx-15">
            <span class="text-h3">
              Buy what you love
              <v-icon icon="mdi-heart-outline" size="small"></v-icon>
            </span>
        </v-row>
        <v-row class="mt-10 mx-15">
          <v-spacer width="10%"></v-spacer>
          <v-col cols='12'>
              <v-autocomplete
                class="white--text rounded-outline"
                placeholder="Find your product"
                bg-color="#0091EA"
                v-model="values"
                :items="items"
                variant="outlined"
                rounded
                center-affix
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

<style scoped lang="scss">
.rounded-outline:deep(.v-field__outline) {
  border: 2px solid #F6FDEB;
  border-radius: 999px !important;

  .v-field__outline__start,
  .v-field__outline__end {
    border: none !important;
  }
}
</style>
