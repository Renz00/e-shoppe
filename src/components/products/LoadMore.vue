<template>
  <v-container>
      <v-row class="mb-5 mt-2">
        <v-col cols="12" class="d-flex justify-center align-center">
          <v-btn color="black" size="large" width="50%" @click="emits('emitLoadMore')" :loading="isLoadingProducts" v-if="productLimit<120">Load More</v-btn>
          <v-btn color="black" size="large" width="50%" :to="{name:'CatalogView',params: {productCategory: 'apparel'}}" :loading="isLoadingProducts" v-else>See More Products</v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>
<script setup>
const props = defineProps({
  isLoadingProducts: Boolean,
  productLimit: Number
})
const emits = defineEmits(['emitLoadMore'])
</script>
