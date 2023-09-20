<template>
    <v-container class="mt-5 mb-10">
        <v-row>
            <v-col cols="9">
                <div class="text-h6">My Favourites</div>
            </v-col>
            <v-col cols="3" class="d-flex justify-end">
              <ProductLayout @emitSetLayout="setLayout"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="mx-10" v-if="layout=='list'">
                <ProductList :cartItemCount="20"/>
            </v-col>
            <v-col class="mx-10" v-if="layout=='grid'">
                <ProductCardSm :cartItemCount="20"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductList from '@/components/products/ProductList.vue';
import ProductCardSm from '@/components/products/ProductCardSm.vue';
import ProductLayout from '@/components/layout/ProductLayout.vue';


//Props from router and App.vue
const props = defineProps({
  cartItemCount: Number
})

const layout = ref('list')

const setLayout = (selectedLayout) => {
  layout.value = selectedLayout
}

onMounted(()=>{

})
</script>
