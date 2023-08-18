<template>
  <v-container class="my-2">
    <v-row>
      <v-col>
        <h1 class="mr-3">I'm looking for <span id="menu-activator4">{{ category }} <v-icon icon="mdi-triangle-small-down"></v-icon></span></h1> 
        <v-menu activator="#menu-activator4">
          <v-list>
            <v-list-item @click="setCategory('Everything')" link>
              <v-list-item-title>Everything</v-list-item-title>
            </v-list-item>
            <v-list-item @click="setCategory('Women\'s Dresses')" link>
              <v-list-item-title>Women's Dresses</v-list-item-title>
            </v-list-item>
            <v-list-item @click="setCategory('Men\'s Shirts')" link>
              <v-list-item-title>Men's Shirts</v-list-item-title>
            </v-list-item>
            <v-list-item @click="setCategory('Kids Apparel')" link>
              <v-list-item-title>Kids Apparel</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-chip-group class="mt-2">
          <v-chip
          link
          >
            Top Sales
          </v-chip>
          <v-chip
          link
          >
            Top Ratings
          </v-chip>
          <v-chip
          link
          >
            Discounts
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <ProductCardSm :products="products"/>
    <Pagination />
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import ProductCardSm from './ProductCardSm.vue';
import Pagination from './Pagination.vue';

const props = defineProps({
    products: Array,
})

var category = ref('Everything')

const setCategory = ((selectedCategory) => {
  category.value = selectedCategory.replace('-', ' ');
})

</script>
