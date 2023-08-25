<template>
<v-sheet height="500" width="auto" color='black' class="stack-container">
  <div class="stack">
    <v-img
      class="img-blur"
      height="100%"
      width="100%"
      aspect-ratio="16/9"
      cover
      src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
    >
    </v-img>
  </div>
  <div class="stack stack-front">
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
             
          </v-col>
          <v-spacer width="10%"></v-spacer>

        </v-row>
    </v-container>
  </div>
</v-sheet>
</template>

<script setup>
import { ref } from 'vue';

</script>


