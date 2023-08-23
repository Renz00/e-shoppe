<template>
    <v-container class="my-10">
        <v-row>
            <v-col cols="12" lg="8">
                <v-row>
                    <v-col>
                        <v-sheet>
                            <v-card
                                class="mx-auto elevation-2"
                                prepend-icon="mdi-map-marker-outline"
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
                        </v-sheet>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="py-0">
                        <span class="text-h6">Items</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-list lines="two">
                            <v-list-item class="pl-0 elevation-2"
                            v-for="n in 3"
                            :key="n"
                            >
                                <v-card width="100%" height="100%" variant="flat">
                                    <v-card-text>
                                        <v-row>
                                            <v-col class="my-0 py-0" cols="4">
                                                <v-img
                                                @loadstart="imgload=true"
                                                @load="imgload=false"
                                                lazy-src="https://picsum.photos/800/1000"
                                                aspect-ratio="4/3"
                                                width="auto"
                                                height="auto"
                                                src="https://picsum.photos/800/1000"
                                                >
                                                    <div class="d-flex align-center justify-center fill-height" v-if="imgload">
                                                        <v-progress-circular
                                                            color="blue"
                                                            indeterminate
                                                        ></v-progress-circular>
                                                    </div>
                                                </v-img>
                                            </v-col>
                                            <v-col cols="8">
                                                <span class="text-subtitle-1">Product {{ n }}</span>
                                               
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
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

var imgload = ref(false)


</script>
