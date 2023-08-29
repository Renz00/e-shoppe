<template>
    <v-autocomplete
        class="white--text rounded-outline"
        v-model="selected"
        v-model:search="search"
        :loading="loading"
        :items="items"
        density="compact"
        hide-no-data
        hide-details
        variant="outlined"
        style="width: 300px;"
        rounded
        center-affix
        v-if="!showLinks"
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

const props = defineProps({
    showLinks: Boolean
})

const selected = ref('')
const loading = ref(false)
const items = ref([])
const search = ref(null)
const searchText = ref(null)
const searchItems = [
    'Shoes',
    'Dresses',
    'Gadgets'
]

watchEffect(() => {
  //Watch changes in the value of search
  if (search.value){
    search.value && search.value !== searchText.value && querySelections(search.value)
  }
})

function querySelections (newVal) {
  loading.value = true
  setTimeout(() => {
    items.value = searchItems.filter(e => {
      return (e || '').toLowerCase().indexOf((newVal || '').toLowerCase()) > -1
    })
    loading.value = false 
  }, 500)
}

</script>