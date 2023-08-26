<template>
    <v-container class="my-5">

        <v-row>
            <v-col cols="12" lg="8">
                <v-row>
                    <v-col class="py-0">
                        <span class="text-h6">
                            <span v-if="cartItemCount > 0">
                                Items in Cart
                            </span>
                            <span v-else>
                                No items in cart.
                            </span>
                        </span>
                    </v-col>
                </v-row>
                <v-row v-if="cartItemCount > 0">
                    <v-col class="d-flex justify-center align-center">
                        <v-list lines="two" class="py-0 my-0 mx-2 overflow-y-auto" width="auto" max-height="1500">
                            <v-list-item class="pa-0 mb-3 elevation-2" v-for="n in cartItemCount" :key="n">
                                <v-row>
                                    <v-col class="px-0 px-sm-3" cols="6" sm="4">
                                        <v-img @loadstart="imgload = true" @load="imgload = false"
                                            lazy-src="https://picsum.photos/800/1000" aspect-ratio="4/3" width="auto"
                                            height="200" cover src="https://picsum.photos/800/1000">
                                            <div class="ml-4 mt-1 ml-sm-1">
                                                <v-btn color="error" size="small">Remove</v-btn>
                                            </div>
                                            <template v-slot:placeholder>
                                                <div class="d-flex align-center justify-center fill-height">
                                                    <v-progress-circular style="height:300px;" color="primary"
                                                        indeterminate></v-progress-circular>
                                                </div>
                                            </template>
                                        </v-img>
                                    </v-col>
                                    <v-col class="pa-0 pa-sm-3" cols="6" sm="8">
                                        <v-container>
                                            <v-row class="text-subtitle-1">
                                                <v-col class="px-0">
                                                    Product Name
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <div class="text-subtitle-2">
                                                    Product Category
                                                </div>
                                            </v-row>
                                            <v-row>
                                                <div class="text-subtitle-2">
                                                    Size: L
                                                </div>
                                            </v-row>
                                            <v-row class="justify-center align-center">
                                                <v-col cols="6" sm="6" class="px-0 text-subtitle-2">
                                                    <v-select label="Quantity" :items="['1', '2', '3', '4', '5']"
                                                        variant="outlined" density="compact"></v-select>
                                                </v-col>
                                                <v-col cols="6" sm="6" class="pb-10 text-subtitle-2">Product Price</v-col>
                                            </v-row>
                                        </v-container>
                                    </v-col>

                                </v-row>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <v-row>
                    <v-col class="px-5 px-md-0" cols="12">
                        <v-card class="mx-0" link>
                            <template v-slot:prepend>
                               <v-icon icon="mdi-map-marker-outline"></v-icon>
                            </template>
                            <template v-slot:title>
                                <span class="text-subtitle-1">
                                    Delivery Address
                                </span>
                                <div class="text-subtitle-2 text-truncate">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                </div>
                            </template>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="px-5 px-md-0">
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
                                    <v-dialog v-model="voucherDialog" persistent max-width="500">
                                        <template v-slot:activator="{ props }">
                                            <v-card width="100%" variant="outlined" v-bind="props" link>
                                                <v-container>
                                                    <v-row>
                                                        <v-col class="text-subtitle-2" cols="8">
                                                            Total Discount
                                                            <div class="text-uppercase text-body-2 mt-2">
                                                                See Vouchers
                                                            </div>
                                                        </v-col>
                                                        <v-col class="d-flex justify-center align-center text-subtitle-1"
                                                            cols="4">Saved 30%</v-col>
                                                    </v-row>

                                                </v-container>
                                            </v-card>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                Select or Enter Voucher
                                            </v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-col class="my-0 py-0" cols="12">
                                                            <div class="text-subtitle-2 pb-2">Voucher Code</div>
                                                            <v-text-field density="compact" variant="outlined"></v-text-field>
                                                        </v-col>
                                                        <v-col class="my-0 py-0" cols="12">
                                                            <div class="text-subtitle-2 pb-2">Vouchers</div>
                                                            <v-select
                                                            :items="['Voucher 1', 'Voucher 2', 'Voucher 3', 'Voucher 4']"
                                                            variant="outlined"
                                                            density="compact">
                                                            </v-select>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue-darken-1" variant="text" @click="voucherDialog = false">
                                                    Close
                                                </v-btn>
                                                <v-btn color="blue-darken-1" variant="text" @click="voucherDialog = false">
                                                    Save
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </div>
                                <div class="pa-2">
                                    <v-dialog v-model="shippingDialog" persistent max-width="500">
                                        <template v-slot:activator="{ props }">
                                            <v-card width="100%" variant="outlined" v-bind="props" link>
                                                <v-container>
                                                    <v-row>
                                                        <v-col class="text-subtitle-2" cols="8">
                                                            Shipping: J&T Express
                                                            <div class="text-uppercase text-body-2 mt-2">
                                                                Change Shipping Details
                                                            </div>
                                                        </v-col>
                                                        <v-col class="d-flex justify-center align-center text-subtitle-1"
                                                            cols="4">₱50</v-col>
                                                    </v-row>

                                                </v-container>
                                            </v-card>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                Shipping Details
                                            </v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <v-radio-group v-model="courier" column>
                                                                <v-radio label="J&T - ₱50" :value="0"></v-radio>
                                                                <v-radio label="LBC - ₱65" :value="1"></v-radio>
                                                            </v-radio-group>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue-darken-1" variant="text" @click="shippingDialog = false">
                                                    Close
                                                </v-btn>
                                                <v-btn color="blue-darken-1" variant="text" @click="shippingDialog = false">
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
                    <v-col class="px-5 px-md-0" cols="12">
                        <v-btn color="black" width="100%">Proceed to Checkout</v-btn>
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

const imgload = ref(false)
const shippingDialog = ref(false)
const voucherDialog = ref(false)
const courier = ref(0)

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
