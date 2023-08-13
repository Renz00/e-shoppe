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
        <v-row width="10%" class="mb-15 pb-15 py-10 mx-15">
          <v-text-field
            placeholder="Find your product"
            variant="outlined"
          ><v-icon icon="mdi-magnify" class="mx-5"></v-icon></v-text-field>
        </v-row>
    </v-container>
  </v-img>
</v-sheet>
</template>

<style>
/* .hero-img {
  filter: brightness(50%);
} */
</style>
