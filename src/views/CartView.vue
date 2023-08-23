<template>
    <v-container class="my-10">
        <v-row>
            <v-col cols="12" lg="8">
                <v-row>
                    <v-col>
                        <v-card
                            class="mx-auto"
                            prepend-icon="mdi-map-marker-outline"
                            variant="outlined"
                            link
                        >
                            <template v-slot:title>
                                <span class="text-subtitle-1">
                                    Delivery Address
                                </span>
                                <div class="text-subtitle-2">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                </div>
                            </template>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="py-0">
                        <span class="text-h6">
                            <span v-if="cartItemCount>0">
                                Items
                            </span>
                            <span v-else>
                                No items in cart.
                            </span>
                        </span>
                    </v-col>
                </v-row>
                <v-row v-if="cartItemCount>0">
                    <v-col>
                        <v-list lines="two"
                                class="overflow-y-auto"
                                max-height="1800">
                            <v-list-item class="pa-0 mb-3"
                            variant="outlined"
                            v-for="n in cartItemCount"
                            :key="n"
                            >
                                <v-row class="justify-center align-center">
                                    <v-col cols="12" sm="4">
                                        <div class="d-flex justify-center align-center">
                                            <v-img
                                            @loadstart="imgload=true"
                                            @load="imgload=false"
                                            lazy-src="https://picsum.photos/800/1000"
                                            aspect-ratio="4/3"
                                            width="auto"
                                            height="auto"
                                            src="https://picsum.photos/800/1000"
                                            >
                                            <div class="d-flex align-center justify-center fill-height py-5" v-if="imgload">
                                                <v-progress-circular
                                                color="blue"
                                                indeterminate
                                                ></v-progress-circular>
                                            </div>
                                            </v-img>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-container class="mx-3">
                                            <v-row class="text-subtitle-1">
                                                Product Name
                                            </v-row>
                                            <v-row class="pb-5">
                                                <div class="text-body">
                                                    Product Category
                                                </div>
                                            </v-row>
                                            <v-row>
                                                <div class="text-subtitle-2">
                                                    Size: L
                                                </div>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="6" class="px-0 text-subtitle-2">
                                                    <v-select label="Quantity"
                                                        :items="['1', '2', '3', '4', '5']"
                                                        variant="outlined"
                                                        density="compact"></v-select>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="6" class="px-0 text-subtitle-1">Product Price</v-col>
                                            </v-row>
                                        </v-container>
                                    </v-col>
                                    <v-col class="d-flex justify-center align-center my-3" cols="12" sm="2">
                                        <v-btn class="mt-2" color="red" icon="mdi-cart-remove" size="large"></v-btn>
                                    </v-col>
                                </v-row>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" lg="4">
                <v-sheet border>
                    World
                </v-sheet>
            </v-col>
        </v-row>
</v-container>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useProductStore } from '@/store/product-store'

const { cartItemCount } = storeToRefs(useProductStore())

var imgload = ref(false)


</script>
