<template>
    <v-autocomplete
        class="white--text rounded-outline"
        v-model="selected"
        v-model:search="search"
        @update:search="populateAutocompleteItems"
        @update:modelValue="selectedSearch"
        :loading="loading"
        :items="productSearchItems"
        density="compact"
        hide-no-data
        hide-details
        variant="outlined"
        style="width: 300px;"
        :clearable="search!='' ? true: false"
        rounded
        center-affix
        v-if="!mobileView"
        >
        <template v-slot:prepend-inner>
            <v-icon icon="mdi-magnify" color="black"></v-icon>
        </template>
        <template v-slot:no-data-text>
            <span class="px-5">No results</span>
        </template>
    </v-autocomplete>   
</template>

<script setup>
import { ref, watchEffect, watch } from 'vue';
import router from '@/router';
import { useProductStore } from '@/store/product-store'
import { storeToRefs } from 'pinia';

const { handleSearchProductsAC, handleSearchProducts } = useProductStore()
const { productSearchItems } = storeToRefs(useProductStore())

const props = defineProps({
    mobileView: Boolean
})

const selected = ref('')
const loading = ref(false)
const items = ref([])
const search = ref('')
const searchText = ref('')

watchEffect(() => {
  //Watch changes in the value of search
  if (search.value){
    search.value && search.value !== searchText.value && querySelections(search.value)
  }
})

const querySelections = (newVal) => {
  loading.value = true
  setTimeout(() => {
    items.value = productSearchItems.value.filter(e => {
      return (e || '').toLowerCase().indexOf((newVal || '').toLowerCase()) > -1
    })
    loading.value = false 
  }, 500)
}

const selectedSearch = async () => {
  if (selected.value != null && selected.value != ''){
    sessionStorage.setItem('search', selected.value)
    router.push({name: 'ProductSearchResultsView'})
    await handleSearchProducts(sessionStorage.getItem('search'))
    selected.value = ''
    search.value = ''
  }
}

const populateAutocompleteItems = async () => {
  // console.log('updated search')
  if (search.value != null && search.value != ''){
    await handleSearchProductsAC(search.value)
  }
    
}
</script>