<template>
    <v-autocomplete
        class="white--text rounded-outline"
        v-model="selected"
        v-model:search="search"
        @update:search="populateAutocompleteItems"
        @update:modelValue="selectedSearch"
        :items="productSearchItems"
        :menu-props="{ maxWidth: 200, maxHeight:250 }"
        density="compact"
        hide-details
        hide-no-data
        variant="outlined"
        style="width: 300px;"
        rounded
        center-affix
        v-if="mobileView"
        >
        <template v-slot:prepend-inner>
          <v-icon icon="mdi-magnify" color="black" v-if="!isLoadingSearchItems"></v-icon>
          <v-progress-circular
              indeterminate
              color="primary"
              size="small"
              v-else
            ></v-progress-circular>
        </template>
        <template v-slot:item="{ parent, item }">
            <v-list-item class="py-0 my-0" @click="selectedSearch(item.title)" link>
              <v-row class="py-0 my-0">
                <v-col cols="auto" class="text-truncate">{{ item.title }}</v-col>
              </v-row>
            </v-list-item>
        </template>
    </v-autocomplete>   
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/store/product-store';

const { handleSearchProducts, handleSearchProductsAC } = useProductStore()
const { productSearchItems, isLoadingSearchItems } = storeToRefs(useProductStore())

const props = defineProps({
    mobileView: Boolean
})

const selected = ref('')
const search = ref(null)

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
    productSearchItems.value = []
    await handleSearchProductsAC(search.value)
  }
}

</script>