<template>
    <v-container class="mt-5 mb-10">
        <v-row>
            <v-col cols="6">
                <div class="text-h6">My Favourites</div>
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
              <v-btn-toggle
                v-model="toggle"
                color="error"
                variant="text"
                density="compact"
                mandatory
              >
                <v-btn @click="layout='list'" icon="mdi-format-list-checkbox"></v-btn>
                <v-btn @click="layout='grid'" icon="mdi-view-grid-outline"></v-btn>
              </v-btn-toggle>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="mx-10" v-if="layout=='list'">
                <FavouriteList :cartItemCount="20"/>
            </v-col>
            <v-col class="mx-10" v-if="layout=='grid'">
                <FavouriteGrid :cartItemCount="20"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import FavouriteList from '@/components/products/FavouriteList.vue';
import FavouriteGrid from '@/components/products/FavouriteGrid.vue';

import { ref } from 'vue';
//Props from router and App.vue
const props = defineProps({
  cartItemCount: Number
})


const toggle = ref(null)
const layout = ref('list')

</script>
