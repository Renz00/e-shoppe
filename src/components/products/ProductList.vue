<template>
      <v-list lines="two" class="py-0 my-0 mt-3 mt-sm-0 mx-md-0 overflow-y-auto" width="auto" height="800" v-if="products.length>0">
        <v-list-item class="pa-0 mb-3 elevation-1" v-for="(product, key) in products" :key="key">
            <v-row>
                <v-col class="d-flex justify-center align-center px-0 px-sm-3" cols="12" md="4" sm="6">
                    <v-img @loadstart="imgload = true" @load="imgload = false"
                        lazy-src="https://picsum.photos/800/1000" width="auto"
                        height="180" src="https://picsum.photos/800/1000" cover>
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                                <v-progress-circular :size="50" color="primary"
                                    indeterminate></v-progress-circular>
                            </div>
                        </template>
                    </v-img>
                </v-col>
                <v-col class="justify-center align-center justify-lg-start align-lg-start  pa-0 pa-sm-3 pr-5 pl-5 pl-md-0 pr-md-0" cols="12" md="5" sm="6">
                    <v-container>
                        <v-row class="text-subtitle-1">
                            {{ product.product_name }}
                        </v-row>
                        <v-row>
                            <div class="text-subtitle-2">
                                {{ category(product.product_category) }} | <v-icon icon="mdi-star" color="yellow"></v-icon> {{ product.product_rating }}
                            </div>
                        </v-row>
                        <v-row class="mt-5">
                            <div class="px-0 text-subtitle-1">{{ '₱'+product.product_price.toLocaleString() }}</div>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col class="d-flex justify-center align-center ma-3 ma-md-0 pr-9" cols="12" md="3">
                    <v-btn class="rounded-0" @click.stop="emits('emitSetCartItemCount')" color="success" block>
                    <span style="color: white;">
                        Add to Cart
                    </span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-list-item>
      </v-list>
      <v-container v-else>
        <v-row class="justify-center align-center fill-height">
          <div class="text-subtitle1">Sorry, no results.</div>
        </v-row>
      </v-container>
</template>

<script setup>
const props = defineProps({
    products: Array
})

const emits = defineEmits(['emitSetCartItemCount'])

const category = (val) => {
  switch (val){
    case 1:
      return 'Gadgets'
      break
    case 2:
      return 'Cosmetics'
      break
    case 3:
      return 'Apparel'
      break
    default:
      break
  }
}

</script>
