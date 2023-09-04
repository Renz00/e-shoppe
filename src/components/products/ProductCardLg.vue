<template>
  <v-sheet>
    <v-overlay class="justify-center align-center" v-model="overlay">
      <v-alert
        closable
        icon="mdi-check"
        title="Info"
        text="Item added to Cart!"
        type="success"
      >
        <template v-slot:close>
          <v-btn icon="mdi-close" @click="overlay = false"></v-btn>
        </template>
      </v-alert>
    </v-overlay>
    <v-card class="mx-5 mx-lg-0 elevation-1">
      <v-row>
        <v-col cols="12" md="6" class="mx-0 py-0 py-md-2 px-0">
          <v-img
            @loadstart="imgload = true"
            @load="imgload = false"
            lazy-src="https://picsum.photos/1200/910"
            aspect-ratio="16/9"
            width="auto"
            height="451"
            cover
            src="https://picsum.photos/1200/910"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>
            </template>
          </v-img>
        </v-col>
        <v-col cols="12" md="6">
          <v-tabs v-model="tab" color="success" density="compact" align-tabs="center">
            <v-tab value="one">Info</v-tab>
            <v-tab value="two">Product Details</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item value="one">
              <v-container class="pr-md-7">
                <v-row class="px-3 px-md-0">
                  <v-col class="text-h5 pt-2">
                    <div class="text-body-1">Product Name</div>
                    <div class="text-subtitle-1">
                      Product Category |
                      <v-icon
                        class="pb-1"
                        color="yellow"
                        icon="mdi-star"
                        size="small"
                      ></v-icon>
                      4.05
                    </div>
                    <div class="text-subtitle-2 pt-3">Product Price</div>
                  </v-col>
                </v-row>
                <v-row class="px-3 px-md-0">
                  <v-col>
                    <div class="text-subtitle-2 pb-5">Quantity</div>
                    <v-row class="mx-5 mx-sm-1">
                      <ProductQuantity @emitDecQuantity="decQuantity" @emitIncQuantity="incQuantity" :productQuantity="productQuantity"/>
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
                      @click="addToCart"
                    >
                      Add to Cart
                    </v-btn>
                  </v-col>
                  <v-col class="pl-sm-0" cols="12" xl="3" lg="3" md="4" sm="6">
                    <v-tooltip
                      v-model="liked"
                      text="You liked this item!"
                      location="top"
                      open-on-click
                      :open-on-hover="false"
                    >
                      <template v-slot:activator="{ props }">
                        <v-btn
                          v-bind="props"
                          @click="liked = true"
                          size="large"
                          color="error"
                          style="color: white"
                          width="100%"
                        >
                          <v-icon icon="mdi-heart"></v-icon
                        ></v-btn>
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      In blanditiis dolorum necessitatibus vero earum, eius
                      quisquam ipsa culpa. Nesciunt illum ipsum facilis,
                      recusandae exercitationem dolorum aspernatur veritatis
                      provident optio animi.
                    </span>
                    <div class="px-5 py-2 text-subtitle-1">
                      <ul>
                        <li>X Small - 10cm</li>
                        <li>Small - 10cm</li>
                        <li>Medium - 10cm</li>
                        <li>Large - 10cm</li>
                        <li>X Large - 10cm</li>
                      </ul>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-card>
  </v-sheet>
</template>

<script setup>
import ProductQuantity from "./ProductQuantity.vue";
import { ref, watchEffect } from "vue";
import { useProductStore } from '@/store/product-store'

const { setCartItemCount } = useProductStore()

const tab = ref(null);
const overlay = ref(false);
const liked = ref(false);
const imgload = ref(false);
const productQuantity = ref(1);

const addToCart = () => {
  overlay.value = true;
  setCartItemCount()
};

const incQuantity = () =>{
  if (productQuantity.value<10){
    productQuantity.value++
  }
};

const decQuantity = () =>{
  if (productQuantity.value>1){
    productQuantity.value--
  }
};

//Closes overlay alert after 2 secs if value is true
//watchEffect will watch the value of whatever veriable is referrence within the callback function
watchEffect(() => {
  if (overlay.value) {
    setTimeout(() => {
      overlay.value = false;
    }, 1000);
  }
  if (liked.value) {
    setTimeout(() => {
      liked.value = false;
    }, 1000);
  }
});
</script>
