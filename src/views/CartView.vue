<template>
    <v-container class="my-5">
        <v-row>
            <v-col cols="12" lg="8">
                <v-row>
                    <v-col>
                        <v-card class="mx-auto" prepend-icon="mdi-map-marker-outline" link>
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
                            <span v-if="cartItemCount > 0">
                                Items
                            </span>
                            <span v-else>
                                No items in cart.
                            </span>
                        </span>
                    </v-col>
                </v-row>
                <v-row v-if="cartItemCount > 0">
                    <v-col>
                        <v-list lines="two" class="left-scroll-container overflow-y-auto py-0" max-height="1800">
                            <v-list-item class="left-scroll-content pa-0 mb-3 elevation-2" v-for="n in cartItemCount"
                                :key="n">
                                <v-row class="justify-center align-center">
                                    <v-col cols="12" sm="4">
                                        <div class="d-flex justify-center align-center">
                                            <v-img @loadstart="imgload = true" @load="imgload = false"
                                                lazy-src="https://picsum.photos/800/1000" aspect-ratio="4/3" width="auto"
                                                height="auto" src="https://picsum.photos/800/1000">
                                                <template v-slot:placeholder>
                                                    <div class="d-flex align-center justify-center fill-height">
                                                        <v-progress-circular
                                                        style="height:300px;"
                                                        color="primary"
                                                        indeterminate
                                                        ></v-progress-circular>
                                                    </div>
                                                </template>    
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
                                                    <v-select label="Quantity" :items="['1', '2', '3', '4', '5']"
                                                        variant="outlined" density="compact"></v-select>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="6" class="px-0 text-subtitle-1">Product Price</v-col>
                                            </v-row>
                                        </v-container>
                                    </v-col>
                                    <v-col class="d-flex justify-center align-center my-3" cols="12" sm="2">
                                        <v-btn class="mt-2" color="error" icon="mdi-cart-remove" size="large"></v-btn>
                                    </v-col>
                                </v-row>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" lg="4">
                <v-row>
                    <v-col>
                        <v-card>
                            <v-container>
                                <v-row>
                                    <v-col class="text-subtitle-1 px-2 pt-2 pb-5">
                                        Order Summary
                                    </v-col>
                                </v-row>
                                <div class="px-2 text-subtitle-2">
                                    <v-row>
                                        <v-col>
                                            Sub-total (2 Items)
                                        </v-col>
                                        <v-col>
                                            Price
                                        </v-col>
                                    </v-row>
                                    <v-row class="my-0">
                                        <v-col>
                                            Total Discount
                                        </v-col>
                                        <v-col>
                                            DiscountPrice
                                        </v-col>
                                    </v-row>
                                    <v-divider class="my-2"></v-divider>
                                    <v-row class="py-2">
                                        <v-col>
                                            Total
                                        </v-col>
                                        <v-col>
                                            TotalPrice
                                        </v-col>
                                    </v-row>
                                </div>
                                <div class="pa-2">
                                    <v-dialog v-model="dialog" persistent max-width="500">
                                        <template v-slot:activator="{ props }">
                                            <v-btn color="primary" width="100%" variant="outlined" v-bind="props">
                                                See Vouchers
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                Select or Enter Voucher
                                            </v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-col>

                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                                    Close
                                                </v-btn>
                                                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                                    Save
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </div>
                                <div class="pa-2">
                                    <v-dialog v-model="dialog" persistent max-width="500">
                                        <template v-slot:activator="{ props }">
                                            <v-btn color="secondary" width="100%" variant="outlined" v-bind="props">
                                                Shipping
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                Select or Enter Voucher
                                            </v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-col>

                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                                    Close
                                                </v-btn>
                                                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                                    Save
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </div>
                            </v-container>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                <v-col>
                    <v-btn color="black" width="100%">Proceed</v-btn>
                </v-col>
        </v-row>
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
const dialog = ref(false)


</script>

<style scoped>
/* Handle */
::-webkit-scrollbar-thumb {
    background: #FF6E40;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #FF3D00;
}
</style>
