<template>
    <v-list density="compact">
        <v-list-item class="my-0 py-0">
            <v-select @update:modelValue="setCategory" placeholder="Select Category" v-model="category" multiple chips
                :items="categoryItems" density="compact" variant="outlined" clearable>
            </v-select>
        </v-list-item>
        <v-list-item class="my-0 py-0">
            <v-select placeholder="Select Tags" chips :items="['Discounts', 'Top Sales', 'Top Ratings']" multiple
                density="compact" variant="outlined" clearable>
            </v-select>
        </v-list-item>
        <v-list-item class="my-0 py-0">
            <v-select placeholder="Select Rating" chips :items="['5 stars', '4 stars', '3 stars', '2 stars', '1 star']" multiple
                density="compact" variant="outlined" clearable>
            </v-select>
        </v-list-item>
        <v-list-item class="my-0 py-0">
            <span class="text-subtitle-2">Price Range</span>
            <v-row class="mt-2">
                <v-col cols="12" class="d-flex justify-center align-center mt-0 pt-0">
                    <div class="text-body-2">
                        ₱{{ range[0].toLocaleString() }} - ₱{{ range[1].toLocaleString() }}
                    </div>
                </v-col>
            </v-row>
            <v-row class="my-0 py-0">
                <v-col cols="12" class="d-flex justify-center align-center">
                    <v-range-slider v-model="range" :max="50000" :min="0" :step="1000" hide-details class="align-center px-3">
                    </v-range-slider>
                </v-col>
            </v-row>
        </v-list-item>
        <v-list-item class="mt-3">
            <v-btn color="success" width="100%">Apply</v-btn>
        </v-list-item>
    </v-list>
</template>

<script setup>
import { ref } from 'vue';

const range = ref([0, 50000])
const category = ref(null)
const categoryItems = ref(['Apparel', 'Cosmetics', 'Gadgets'])
const emits = defineEmits(['emitSetCategory'])

const setCategory = (selectedCategory) => {
    emits('emitSetCategory', selectedCategory)
}

</script>
