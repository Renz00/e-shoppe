<template>
  <v-container>
  <v-row class="align-center">
    <v-col class="px-0" cols="12" lg="8" md="8">
        <span class="text-h4 mr-3">Our Products</span>
      </v-col>
    <v-col cols="12" lg="4" md="4" sm="6" width="auto">
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
              <span class="text-subtitle-2">Select Category</span>
              <v-select
                    chips
                    :items="['Men\'s Apparel','Women\'s Apparel', 'Gadgets']"
                    density="compact"
                    variant="outlined"
                  >
                </v-select>
            </v-list-item>
            <v-list-item>
              <span class="text-subtitle-2">Select Filter</span>
              <v-select
                    chips
                    :items="['Discounts','Top Sales', 'Top Ratings']"
                    multiple
                    density="compact"
                    variant="outlined"
                    clearable
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
            <v-list-item class="mt-3 mb-5">
              <v-btn color="success" width="100%">Apply</v-btn>
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
