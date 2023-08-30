<template>
     <v-dialog v-model="addressDialog" persistent max-width="500">
        <template v-slot:activator="{ props }">
            <v-card class="mx-0 elevation-2" v-bind="props" variant="outlined" :class="disableOrderSummaryButtons ? 'disabled-events' : ''" link>
            <template v-slot:prepend>
                <v-icon icon="mdi-map-marker-outline"></v-icon>
            </template>
            <template v-slot:title>
                <span class="text-subtitle-2">
                    Delivery Address
                </span>
                <div class="text-body-2 text-truncate">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </div>
                <div class="text-uppercase text-body-2 blue-font pt-2" v-if="!disableOrderSummaryButtons">
                    Change Address
                </div>
            </template>
        </v-card>
        </template>
        <v-card>
            <v-card-title>
                Set Shipping Address
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col class="my-0 py-0" cols="12">
                            <div class="text-subtitle-2 pb-2">House No./Unit/Building</div>
                            <v-text-field density="compact" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col class="my-0 py-0" cols="12">
                            <div class="text-subtitle-2 pb-2">City</div>
                            <v-text-field density="compact" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col class="my-0 py-0" cols="12">
                            <div class="text-subtitle-2 pb-2">Province</div>
                            <v-text-field density="compact" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col class="my-0 py-0" cols="12">
                            <div class="text-subtitle-2 pb-2">Zip Code</div>
                            <v-text-field density="compact" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col class="my-0 py-0" cols="12">
                            <div class="text-subtitle-2 pb-2">Additional Notes</div>
                            <v-textarea clearable variant="outlined" auto-grow></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="addressDialog = false">
                    Close
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="addressDialog = false">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    disableOrderSummaryButtons: Boolean
})

const addressDialog = ref(false)
</script>
