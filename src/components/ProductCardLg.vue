<template>
<v-sheet>
  
    <v-row>
        <v-col cols="12" lg="6">
            <v-card>
                <v-card-item>
                    <div class="text-overline mb-1">
                        <v-img
                        lazy-src="https://picsum.photos/1200/900"
                        width="auto"
                        height="auto"
                        src="https://picsum.photos/1200/900"
                        >
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular
                                color="grey-4"
                                indeterminate
                            ></v-progress-circular>
                            </div>
                        </template>
                        </v-img>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
        <v-col>
            <v-row>
                    <v-col>
                        <v-tabs
                        v-model="tab"
                        density="compact"
                        >
                        <v-tab value="one">Details</v-tab>
                        <v-tab value="two">Other</v-tab>
                        </v-tabs>
                        <v-window v-model="tab">
                            <v-window-item value="one">
                            One
                            </v-window-item>

                            <v-window-item value="two">
                            Two
                            </v-window-item>

                            <v-window-item value="three">
                            Three
                            </v-window-item>
                        </v-window>
                    </v-col>
                </v-row>
            <v-container class="mx-3">
            
                <v-row class="text-h5">
                    Product Name
                </v-row>
                <v-row class="text-subtitle-2">
                    <div class="pb-5">
                        Product Category | 
                        <v-icon v-for="n in 5" class="material-icons" color="yellow" icon="mdi-star" size="small"></v-icon>
                    </div>
                </v-row>
                <v-row class="text-h6">
                    Product Price
                </v-row>
                <v-row class="justify-center align-center text-center">
                        <v-sheet
                            max-width="540"
                        >
                            <v-slide-group
                            show-arrows
                            >
                            <v-slide-group-item
                                v-for="n in 10"
                                :key="n"
                                v-slot="{ isSelected, toggle }"
                            >
                                <v-card
                                class="ma-2"
                                :color="isSelected ? 'success' : undefined"
                                @click="toggle"
                                density="compact"
                                >
                                <v-card-text><v-icon class="mr-2" size="small" icon="mdi-currency-usd-off" />Voucher {{ n }}</v-card-text>  
                                </v-card>
                            </v-slide-group-item>
                            </v-slide-group>
                        </v-sheet>
                </v-row>
                <v-row>
                    <span class="text-h6">Variant</span>
                </v-row>
                <v-row class="py-2 justify-center align-center text-center">
                        <v-sheet
                            max-width="540"
                        >
                            <v-slide-group
                            show-arrows
                            >
                                <v-slide-group-item
                                    v-for="n in 5"
                                    :key="n"
                                    v-slot="{ isSelected, toggle }"
                                >
                                    <v-card
                                    class="ma-1"
                                    :color="isSelected ? 'primary' : undefined"
                                    @click="toggle"
                                    density="compact"
                                    >
                                        <v-card-text><v-icon class="mr-2" size="small" icon="mdi-tshirt-crew-outline" />Color {{ n }}</v-card-text>  
                                    </v-card>
                                </v-slide-group-item>
                            </v-slide-group>
                        </v-sheet>
                    </v-row>
                    <v-row class="mt-3 justify-center align-center text-center">
                        <v-sheet
                            max-width="540"
                        >
                            <v-slide-group
                            show-arrows
                            >
                                <v-slide-group-item
                                    v-for="n in 4"
                                    :key="n"
                                    v-slot="{ isSelected, toggle }"
                                >
                                    <v-card
                                    class="ma-1"
                                    :color="isSelected ? 'primary' : undefined"
                                    @click="toggle"
                                    density="compact"
                                    >
                                        <v-card-text>Size {{ n }}</v-card-text>  
                                    </v-card>
                                </v-slide-group-item>
                            </v-slide-group>
                        </v-sheet>
                </v-row>
            </v-container>    
        </v-col>
    </v-row>
</v-sheet>

</template>

<script setup>

</script>

<style>

</style>