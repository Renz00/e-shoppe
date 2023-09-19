<template>
        <v-list lines="two" class="py-0 my-0 mx-5 mx-md-0 overflow-y-auto" width="auto" height="800">
        <v-list-item class="pa-0 mb-3 elevation-1" v-for="(product, key) in products" :key="key">
            <v-row>
                <v-col class="px-0 px-sm-3" cols="4" sm="3">
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
                <v-col class="pa-0 pa-sm-3" cols="6" sm="7">
                    <v-container>
                        <v-row class="text-subtitle-1">
                            <v-col class="px-0">
                                {{ product.product_name }}
                            </v-col>
                        </v-row>
                        <v-row class="my-0">
                            <div class="text-subtitle-2">
                                {{ category(product.product_category) }} | <v-icon icon="mdi-star" color="yellow"></v-icon> {{ product.product_rating }}
                            </div>
                        </v-row>

                        <v-row>
                            <v-col cols="6" sm="8" class="px-0 text-subtitle-2">{{ '₱'+product.product_price.toLocaleString() }}</v-col>
                        </v-row>
                    </v-container>
                </v-col>
                <v-col class="d-flex justify-center align-center pr-5" cols="2" sm="2">
                    <v-btn class="rounded-0" @click.stop="emits('emitSetCartItemCount')" width="100%" color="success" block>
                    <span style="color: white;">
                        Add to Cart
                    </span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-list-item>
    </v-list>
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
