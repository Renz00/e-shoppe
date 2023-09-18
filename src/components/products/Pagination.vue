<template>
     <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="productCurrentPage"
              :length="productPageCount"
              @update:modelValue="loadPage"
              @first="productCurrentPage = 1, loadPage"
              @last="productCurrentPage = productPageCount, loadPage"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useProductStore } from '@/store/product-store'

const { productCurrentPage, productPageCount, isLoadingProducts } = storeToRefs(useProductStore())
const { handleLoadPage } = useProductStore()

const emits = defineEmits(['emitLoadPage'])

const loadPage = async (page) => {
  isLoadingProducts.value = true
  const title = document.getElementById('title');
  title.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start"
  });

  await handleLoadPage()
}

</script>
