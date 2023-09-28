<template>
    <v-container class="py-10">
      <v-row justify="center">
        <v-col cols="8">
            <v-pagination
              density="comfortable"
              v-model="productCurrentPage"
              :length="productPageCount"
              @update:modelValue="loadPage"
              rounded="circle"
            ></v-pagination>
        </v-col>
      </v-row>
  </v-container>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useProductStore } from '@/store/product-store'

const { productCurrentPage, productPageCount, isLoadingProducts, currentProductFilter } = storeToRefs(useProductStore())
const { handleLoadPage, handleLoadFilterPage } = useProductStore()

const props = defineProps({
  productCategory: [Number, String]
})

const loadPage = async (page) => {
  isLoadingProducts.value = true
  const title = document.getElementById('title');
  title.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start"
  });
  if (props.productCategory!=null || currentProductFilter.value!=null){
    await handleLoadFilterPage()
  }
  else {
    await handleLoadPage()
  }
  
}

</script>
