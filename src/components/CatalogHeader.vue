<template>
  <v-container>
  <v-row>
    <v-col class="pt-0 px-0" cols="12" lg="8" md="8">
        <span class="text-h4 mr-3">I'm looking for <span id="menu-activator4">{{ category }} <v-icon icon="mdi-triangle-small-down"></v-icon></span></span>
        <v-menu activator="#menu-activator4">
          <v-list>
            <v-list-item @click="emit('emitSetCategory', 'Everything')" link>
              <v-list-item-title>Everything</v-list-item-title>
            </v-list-item>
            <v-list-item @click="emit('emitSetCategory', 'Women\'s Dresses')" link>
              <v-list-item-title>Women's Dresses</v-list-item-title>
            </v-list-item>
            <v-list-item @click="emit('emitSetCategory', 'Men\'s Shirts')" link>
              <v-list-item-title>Men's Shirts</v-list-item-title>
            </v-list-item>
            <v-list-item @click="emit('emitSetCategory', 'Kids Apparel')" link>
              <v-list-item-title>Kids Apparel</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    <v-col class="d-flex justify-center align-center px-0" cols="12" lg="4" md="4" sm="6" width="auto">
      <v-btn
          id="filter-activator"
          width="100%"
          variant="outlined"
        >
          Filters
          <v-icon icon="mdi-filter"></v-icon>
        </v-btn>
        <v-menu activator="#filter-activator" :close-on-content-click="false">
          <v-list density="compact">
            <v-list-item>
              <span class="text-subtitle-2">Select Filter</span>
              <v-select
                    chips
                    :items="['Discounts','Top Sales', 'Top Ratings']"
                    multiple
                    density="compact"
                    variant="outlined"
                  >
                </v-select>
            </v-list-item>
            <v-list-item class="py-0">
              <span class="text-subtitle-2">Price Range</span>
              <v-range-slider
                  v-model="range"
                  :max="500000"
                  :min="0"
                  :step="1000"
                  hide-details
                  class="align-center px-3"
                >
                  <template v-slot:prepend>
                    <span class="text-subtitle-2" style="width: 50px;">₱{{range[0].toLocaleString()}}</span>
                  </template>
                  <template v-slot:append>
                    <span class="text-subtitle-2" style="width: 50px;">₱{{range[1].toLocaleString()}}</span>
                  </template>
                </v-range-slider>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-col>
  </v-row>
  </v-container>
  
</template>

<script setup>
import { ref, computed } from 'vue';

const range = ref([0, 500000])

const props = defineProps({
    category: String,
})

const emit = defineEmits(['emitSetCategory'])

</script>
