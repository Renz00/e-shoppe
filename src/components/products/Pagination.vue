<template>
     <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="productCurrentPage"
              :length="productPageCount"
              @update:modelValue="handleLoadPage()"
              @first="productCurrentPage = 1, handleLoadPage()"
              @last="productCurrentPage = productPageCount, handleLoadPage()"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from "pinia";
import { useProductStore } from '@/store/product-store'

const { productCurrentPage } = storeToRefs(useProductStore())

const props = defineProps({
  productPageCount: Number
})

const emits = defineEmits(['emitLoadPage'])

const handleLoadPage = () => {

  emits('emitLoadPage')
}

</script>
