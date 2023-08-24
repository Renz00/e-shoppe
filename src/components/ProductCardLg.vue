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
                    <v-btn icon="mdi-close" @click="overlay=false"></v-btn>
                </template>
            </v-alert>
        </v-overlay>
        <v-row>
            <v-col cols="12" sm="6">
                <v-img
                @loadstart="imgload=true"   
                @load="imgload=false"
                lazy-src="https://picsum.photos/1200/910"
                aspect-ratio="16/9"
                width="auto"
                :height="imgload ? 450 : auto"
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
            <v-col cols="12" sm="6">
                <v-tabs v-model="tab" color="#0091EA" density="compact">
                    <v-tab value="one">Info</v-tab>
                    <v-tab value="two">Product Details</v-tab>
                </v-tabs>
                <v-window v-model="tab">
                    <v-window-item value="one">
                        <v-container>
                            <v-row class="text-h5 pt-2">
                                Product Name
                            </v-row>
                            <v-row class="pb-5">
                                <span class="text-subtitle-1">
                                    Product Category |
                                    <v-icon v-for="n in 5" color="yellow" icon="mdi-star"
                                    size="small"></v-icon>
                                </span>
                            </v-row>
                            <v-row class="text-subtitle-2">
                                Product Price
                            </v-row>
                            <v-row class="justify-center align-center text-center">
                                <v-col class="px-sm-0">
                                    <v-select label="Vouchers"
                                        :items="['Voucher 1', 'Voucher 2', 'Voucher 3', 'Voucher 4']"
                                        variant="outlined"
                                        density="compact"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <span class="text-subtitle-2">Variant</span>
                            </v-row>
                            <v-row class="justify-center align-center text-center">
                                <v-col class="px-sm-0">
                                    <v-select label="Color"
                                        :items="['Red', 'Blue', 'Green', 'White']"
                                        variant="outlined"
                                        density="compact"></v-select>
                                </v-col>
                                <v-col  class="pr-sm-0">
                                    <v-sheet>
                                        <v-select label="Size"
                                            :items="['X Small', 'Small', 'Medium', 'Large', 'X Large']"
                                            variant="outlined"
                                            density="compact"></v-select>
                                    </v-sheet>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="pl-sm-0" cols="12" xl="9" lg="9" md="8" sm="6">
                                    <v-btn size="large" color="secondary" style="color: white;" width="100%" @click="addToCart()">
                                        Add to Cart
                                    </v-btn>
                                </v-col>
                                <v-col class="pr-sm-0" cols="12" xl="3" lg="3" md="4" sm="6">
                                    <v-tooltip
                                        v-model="liked"
                                        text="You liked this item!"
                                        location="top"
                                        open-on-click
                                        :open-on-hover="false"
                                    >
                                        <template v-slot:activator="{ props }">
                                            <v-btn v-bind="props" @click="liked=true" size="large" color="primary" style="color: white;" width="100%">
                                            <v-icon icon="mdi-heart"></v-icon></v-btn>
                                        </template>
                                        </v-tooltip>

                                </v-col>
                            </v-row>
                        </v-container>
                    </v-window-item>
                    <v-window-item value="two">
                        <v-container class="mb-3">
                            <v-row>
                                <v-col>
                                    <span class="text-subtitle-1">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. In blanditiis dolorum necessitatibus vero earum, eius quisquam ipsa culpa. Nesciunt illum ipsum facilis, recusandae exercitationem dolorum aspernatur veritatis provident optio animi.
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
    </v-sheet>
</template>

<script setup>
import { ref, watchEffect } from "vue"

const tab = ref(null)
var overlay = ref(false)
var liked = ref(false)
var imgload = ref(false)

const emit = defineEmits(['emitCartItemCount'])

const addToCart = (()=>{
    overlay.value=true
    emit('emitCartItemCount')
})

//Closes overlay alert after 2 secs if value is true
//watchEffect will watch the value of whatever veriable is referrence within the callback function
watchEffect(() => {
    if (overlay.value){
        setTimeout(() => {
        overlay.value = false
        }, 1000)
    }
    if (liked.value){
        setTimeout(() => {
        liked.value = false
        }, 1000)
    }
})

</script>

<style>

</style>
