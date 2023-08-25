<template>
<v-sheet height="500" width="auto" class="gradient">
     <v-carousel
      cycle
      hide-delimiter-background
      show-arrows="hover"
      hide-delimiters
    >
    <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
    >
      <v-img
        height="100%"
        width="100%"
        aspect-ratio="16/9"
        cover
        :lazy-src="'src/assets/'+slide"
        :src="'src/assets/'+slide"
      >
      <div class="d-flex fill-height justify-center align-center text-center">
          <div class="text-h2" style="color: white; filter: blur(0px);">
            Buy What You Love
            <v-icon icon="mdi-heart"></v-icon>
          </div>

        </div>
      </v-img>
   </v-carousel-item>
  </v-carousel>
</v-sheet>
</template>

<script setup>
import {ref} from "vue"

const slides = ref(['img1.jpg', 'img2.jpg', 'img3.png'])

</script>


