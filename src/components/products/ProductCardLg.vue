<template>
  <v-sheet>
    <AddToCart />
    <v-card class="mx-5 mx-lg-0 elevation-1">
      <v-row>
        <v-col cols="12" md="6" class="mx-0 py-0 py-md-2 px-0">
          <v-img
            @loadstart="imgload = true"
            @load="imgload = false"
            lazy-src="https://picsum.photos/1200/910"
            alt="Product Image"
            aspect-ratio="16/9"
            width="auto"
            height="451"
            cover
            src="https://picsum.photos/1200/910"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  :size="50"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>
            </template>
          </v-img>
        </v-col>
        <v-col cols="12" md="6">
          <v-sheet height="451" v-if="isLoadingSelectedProduct">
            <v-row class="justify-center align-center fill-height">
              <v-progress-circular indeterminate :size="50" color="primary">
              </v-progress-circular>
            </v-row>
          </v-sheet>
          <div v-else>
            <v-tabs v-model="tab" color="success" density="compact" align-tabs="center">
            <v-tab value="one">Info</v-tab>
            <v-tab value="two">Product Details</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item value="one">
              <v-container class="pr-md-7">
                <v-row class="px-3 px-md-0">
                  <v-col class="text-h5 pt-2">
                    <div class="text-subtitle-1 pb-2">{{ selectedProduct.product_name }}</div>
                    <div class="text-subtitle-2">
                      {{ category(selectedProduct.product_category) }} |
                      <v-icon
                        class="pb-1"
                        color="yellow"
                        icon="mdi-star"
                        size="small"
                      ></v-icon>
                      {{ selectedProduct.product_rating }}
                    </div>
                    <div class="text-h6 pt-3">
                      <span class="text-subtitle-1 font-italic" style="text-decoration: line-through; color: gray;">{{ '₱'+selectedProduct.product_price.toFixed(2).toLocaleString() }}</span><span class="text-subtitle-1 font-bold">{{ ' ₱'+getDiscountPrice(selectedProduct.product_price, selectedProduct.product_discount) }}</span>
                    </div>
                  </v-col>
                </v-row>
                <v-row class="px-3 px-md-0">
                  <v-col>
                    <div class="text-subtitle-2 pb-3">Quantity</div>
                    <v-row class="mx-5 mx-sm-1">
                      <ProductQuantity :productId="selectedProduct.id"/>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row class="px-3 px-md-0">
                     <v-col>
                      <v-row>
                        <v-col class="pb-5">
                          <div class="text-subtitle-2">Variant</div>
                        </v-col>
                      </v-row>
                      <v-row class="my-0 px-5 px-sm-0">
                        <v-col class="py-0" cols="6">
                          <v-select
                            label="Color"
                            :items="['Red', 'Blue', 'Green', 'White']"
                            variant="outlined"
                            density="compact"
                          ></v-select>
                        </v-col>
                        <v-col class="py-0 pl-sm-0" cols="6">
                          <v-select
                            label="Size"
                            :items="[
                              'X Small',
                              'Small',
                              'Medium',
                              'Large',
                              'X Large',
                            ]"
                            variant="outlined"
                            density="compact"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                </v-row>
                <v-row class="px-2 py-md-0 px-3 px-md-0">
                  <v-col cols="12" xl="9" lg="9" md="8" sm="6">
                    <v-btn
                      size="large"
                      color="success"
                      style="color: white"
                      width="100%"
                      aria-label="cart button"
                      @click="addToCart(selectedProduct)"
                    >
                      Add to Cart
                    </v-btn>
                  </v-col>
                  <v-col class="pl-sm-0" cols="12" xl="3" lg="3" md="4" sm="6">
                    <v-tooltip
                      v-model="showFavTooltip"
                      :text="likedMessage"
                      location="top"
                      :open-on-hover="false"
                    >
                      <template v-slot:activator="{ props }">
                        <v-btn
                          v-bind="props"
                          @click="storeToFavourites(selectedProduct.id)"
                          size="large"
                          color="error"
                          style="color: white"
                          width="100%"
                          :loading="isLoadingLike"
                          aria-label="fav button"
                        >
                          <v-icon icon="mdi-heart" v-if="selectedProduct.isFavourite"></v-icon>
                          <v-icon icon="mdi-heart-outline" v-else></v-icon>
                        </v-btn>
                      </template>
                    </v-tooltip>
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>
            <v-window-item value="two">
              <v-container class="mb-3 pr-md-7">
                <v-row class="px-5 px-md-2">
                  <v-col>
                    <span class="text-subtitle-1">
                      {{ selectedProduct.product_description }}
                    </span>
                    <!-- <div class="px-5 py-2 text-subtitle-1">
                      <ul>
                        <li>X Small - 10cm</li>
                        <li>Small - 10cm</li>
                        <li>Medium - 10cm</li>
                        <li>Large - 10cm</li>
                        <li>X Large - 10cm</li>
                      </ul>
                    </div> -->
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>
          </v-window>
          </div>

        </v-col>
      </v-row>
    </v-card>
  </v-sheet>
</template>

<script setup>
import ProductQuantity from "./ProductQuantity.vue";
import AddToCart from "./AddToCart.vue";
import { ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from '@/store/product-store'
import { useAuthStore } from '@/store/auth-store'
import { useFavouriteStore } from '@/store/favourites-store'

const { isLoadingSelectedProduct, selectedProduct } = storeToRefs(useProductStore())
const { setCartItemCount } = useProductStore()
const { setAuthDialog } = useAuthStore()
const { isLoggedIn } = storeToRefs(useAuthStore())
const { handleStoreToFavourites } = useFavouriteStore()
const { showFavTooltip, likedMessage, isLoadingLike } = storeToRefs(useFavouriteStore())

const tab = ref(null);
const imgload = ref(false);
const productQuantity = ref(1);

watchEffect(() => {
  if (showFavTooltip.value) {
    setTimeout(() => {
      showFavTooltip.value = false;
    }, 700);
  }
})

const addToCart = (selectedProduct) => {
  //If there is a discount, total price will be computed with the discount
  let discPrice = 0
  if (selectedProduct.product_discount>0){
    discPrice = (selectedProduct.product_discount/100)*selectedProduct.product_price
  }
 
  const productData = {
    'id': selectedProduct.id,
    'name': selectedProduct.product_name,
    'category': selectedProduct.product_category,
    'rating': selectedProduct.product_rating,
    'discount': selectedProduct.product_discount,
    'count': 1,
    'price': selectedProduct.product_price,
    'total_price': discPrice,
  }
  setCartItemCount(productData)
}

const incQuantity = () =>{
  if (productQuantity.value<10){
    productQuantity.value++
  }
}

const decQuantity = () =>{
  if (productQuantity.value>1){
    productQuantity.value--
  }
}

const getDiscountPrice = (price, discount) =>{
    const discPrice = (discount/100)*price
    price = price-discPrice
    return price.toFixed(2).toLocaleString()
}

const storeToFavourites = async (product_id) =>{
  if (product_id!=null && isLoggedIn.value == true){
    await handleStoreToFavourites(product_id)
  }
  else {
    setAuthDialog('login')
    isLoadingLike.value = false
  }
}

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
