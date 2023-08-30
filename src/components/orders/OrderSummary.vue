<template>
   <v-card class="elevation-1" variant="outlined" width="100%" height="auto">
    <v-container>
        <v-row>
            <v-col class="text-subtitle-2 px-2 pt-2 pb-5">
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
                    <v-card width="100%" :class="disableOrderSummaryButtons ? 'disabled-events' : ''" variant="outlined" v-bind="props" link>
                        <v-container>
                            <v-row>
                                <v-col class="text-subtitle-2" cols="6" sm="8">
                                    Total Discount
                                    <div class="text-uppercase text-body-2 mt-2 blue-font" v-if="!disableOrderSummaryButtons">
                                        See Vouchers
                                    </div>
                                </v-col>
                                <v-col class="d-flex justify-center align-center text-subtitle-2"
                                    cols="6" sm="4">Saved 30%</v-col>
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
                    <v-card-actions v-if="!disableOrderSummaryButtons">
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
                    <v-card width="100%" :class="disableOrderSummaryButtons ? 'disabled-events' : ''" variant="outlined" v-bind="props" link>
                        <v-container>
                            <v-row>
                                <v-col class="text-subtitle-2" cols="6" sm="8">
                                    J&T Express
                                    <div class="text-uppercase text-body-2 mt-2 blue-font" v-if="!disableOrderSummaryButtons">
                                        Change Shipping
                                    </div>
                                </v-col>
                                <v-col class="d-flex justify-center align-center text-subtitle-2"
                                cols="6" sm="4">₱50</v-col>
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
                    <v-card-actions v-if="!disableOrderSummaryButtons">
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
        <div class="pa-2">
            <v-dialog v-model="paymentDialog" persistent max-width="500">
                <template v-slot:activator="{ props }">
                    <v-card :class="disableOrderSummaryButtons ? 'disabled-events' : ''" width="100%" variant="outlined" v-bind="props" link>
                        <v-container>
                          <v-row>
                                <v-col class="text-subtitle-2" cols="6" sm="8">
                                    Payment Method
                                    <div class="text-uppercase text-body-2 mt-2 blue-font" v-if="!disableOrderSummaryButtons">
                                        Change Payment
                                    </div>
                                </v-col>
                                <v-col class="d-flex justify-center align-center text-center text-subtitle-2"
                                cols="6" sm="4">Cash On Delivery</v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </template>
                <v-card>
                    <v-card-title>
                        Select Payment Method
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                          <v-row>
                                <v-col cols="12">
                                    <v-radio-group v-model="paymethod" column>
                                        <v-radio label="Cash On Delivery (COD)" :value="0"></v-radio>
                                        <v-radio label="Paypal" :value="1"></v-radio>
                                        <v-radio label="Mastercard" :value="2"></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions v-if="!disableOrderSummaryButtons">
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="paymentDialog = false">
                            Close
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="paymentDialog = false">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </v-container>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  disableOrderSummaryButtons: Boolean,
  cardHeight: Number
})

const shippingDialog = ref(false)
const voucherDialog = ref(false)
const paymentDialog = ref(false)
const paymethod = ref(0)
const courier = ref(0)

</script>
