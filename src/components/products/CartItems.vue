<template>
     <v-list lines="two" class="py-0 my-0 mx-2 overflow-y-auto" width="800" max-height="1000">
        <v-list-item class="pa-0 mb-3 elevation-1" v-for="n in cartItemCount" :key="n" variant="outlined">
            <v-row>
                <v-col class="px-0 px-sm-3" cols="5" sm="4">
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
                <v-col class="pa-0 pa-sm-3" cols="7" sm="8">
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
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    imgload: Boolean,
    cartItemCount: Number
})

const imgload = ref(false)

</script>