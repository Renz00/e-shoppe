<template>
    <v-sheet class="pa-3">
        <v-form ref="filterForm">
        <v-select v-model="category" :rules="[v => !!v || 'Category is required']" placeholder="Select Category" multiple chips
            :items="categoryItems" density="compact" variant="outlined" clearable>
        </v-select>
        <v-select class="pt-1" v-model="rating"  placeholder="Select Rating" chips :rules="[v => !!v || 'Rating is required']" :items="ratingItems" multiple
            density="compact" variant="outlined" clearable>
        </v-select>
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
        <v-btn color="success" @click="filterProducts" block>Apply</v-btn>
        </v-form>
    </v-sheet>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useProductStore } from '@/store/product-store'

const { handleFilterProducts } = useProductStore()
const range = ref([0, 50000])
const category = ref([])
const rating = ref([])
const categoryItems = ref(['Apparel', 'Cosmetics', 'Gadgets'])
const ratingItems = ref(['5 stars', '4 stars', '3 stars', '2 stars', '1 star'])

const filterForm = ref()

const filterProducts = async() => {
  const filters = {
    'category': setCategory.value, // 1 is cosmetics
    'rating' : setRating.value,
    'min_price': range.value[0], 
    'max_price': range.value[1]
  }
  await handleFilterProducts(filters)
}

const setCategory = computed(() => {
    const cat = []
    category.value.map((val)=>{
        switch (val){
            case 'Apparel':
                cat.push(3)
                break
            case 'Gadgets':
                cat.push(1)
                break
            case 'Cosmetics':
                cat.push(2)
                break
            default:
                break
        }
    })
    return cat
})

const setRating = computed(() => {
    const rat = []
    rating.value.map((val)=>{
        switch (val){
            case '5 stars':
            rat.push(5)
                break
            case '4 stars':
            rat.push(4)
                break
            case '3 stars':
            rat.push(3)
                break
            case '2 stars':
            rat.push(2)
                break
            case '1 star':
            rat.push(1)
                break
            default:
                break
        }
    })
    return rat
})

// const setCategory = (selectedCategory) => {
//     emits('emitSetCategory', selectedCategory)
// }

</script>
