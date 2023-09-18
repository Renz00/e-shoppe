<template>
    <v-autocomplete
        class="white--text rounded-outline"
        v-model="selected"
        v-model:search="search"
        @update:search="populateAutocompleteItems"
        :loading="loading"
        :items="productSearchItems"
        density="compact"
        hide-no-data
        hide-details
        variant="outlined"
        style="width: 300px;"
        rounded
        center-affix
        v-if="mobileView"
        >
        <template v-slot:prepend-inner>
            <v-icon icon="mdi-magnify" color="black"></v-icon>
        </template>
        <template v-slot:no-data>
            <span class="px-5">No results</span>
        </template>
    </v-autocomplete>   
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';

const { handleSearchProducts } = useProductStore()
const { productSearchItems } = storeToRefs(useProductStore())

const props = defineProps({
    mobileView: Boolean
})

const selected = ref('')
const loading = ref(false)
const items = ref([])
const search = ref(null)
const searchText = ref(null)

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

const populateAutocompleteItems = async () => {
  if (search.value != null && search.value != ''){
    await handleSearchProducts(search.value)
  }  
}

</script>