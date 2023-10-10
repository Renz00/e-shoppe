<template>
    <v-autocomplete
        ref="autoComp"
        class="white--text rounded-outline"
        v-model="selected"
        v-model:search="search"
        @update:search="populateAutocompleteItems"
        @update:modelValue="selectedSearch(selected)"
        @keydown.enter="selectedSearch(search)"
        :items="productSearchItems"
        :menu-props="{ maxWidth: 200, maxHeight:250 }"
        density="compact"
        hide-no-data
        hide-details
        variant="outlined"
        style="width: 300px;"
        :clearable="search!='' ? true: false"
        rounded
        center-affix
        aria-label="search bar"
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
import { useProductStore } from '@/store/product-store'
import { storeToRefs } from 'pinia';

const { handleSearchProductsAC, handleSearchProducts } = useProductStore()
const { productSearchItems, isLoadingSearchItems } = storeToRefs(useProductStore())

const emits = defineEmits(['emitCloseMenu'])

const selected = ref('')
const search = ref('')

const selectedSearch = async (value) => {
  selected.value = value
  if (selected.value != null && selected.value != ''){
    isLoadingSearchItems.value = false
    router.push({name: 'ProductSearchResultsView'})
    productSearchItems.value = []
    emits('emitCloseMenu')
    await handleSearchProducts(selected.value)
    selected.value = ''
    search.value = ''
  }
}

const populateAutocompleteItems = async () => {
  if (search.value != null && search.value != ''){
    await handleSearchProductsAC(search.value)
  }
}
</script>
