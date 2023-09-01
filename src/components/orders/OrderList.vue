<template>
    <v-list lines="two" class="py-0 my-0 mx-5 overflow-y-auto" width="auto" max-height="600">
       <v-list-item class="pa-0 mb-3 elevation-1" v-for="n in orderCount" :key="n" variant="outlined" link>
           <v-row class="">
               <v-col class="pa-3 pa-sm-5" cols="12" sm="9">
                   <v-container class="">
                       <v-row class="text-subtitle-1">
                           <v-col>
                            <div class="text-body-1">
                                Order #912739 | 5 items
                            </div>
                           </v-col>
                       </v-row>
                       <v-row class="my-0">
                            <v-col>
                                <div class="text-subtitle-2">
                                    <v-icon icon="mdi-package-variant"></v-icon>
                                    Packaging
                                </div>
                            </v-col>
                       </v-row>
                       <v-row class="my-0">
                           <v-col cols="12" class="py-0"><span class="text-subtitle-2">Courier: </span><span class="text-body-2">J&T Express</span></v-col>
                       </v-row>
                       <v-row class="my-0">
                           <v-col cols="12" class="text-body-2 py-0"><span class="text-subtitle-2">Estimated Arrival: </span><span class="text-body-2">Sep 9 - Sep 10 2023</span></v-col>
                       </v-row>
                   </v-container>
               </v-col>
               <v-col cols="12" sm="3" class="d-flex justify-center align-center py-10 py-md-2 px-10">
                <v-btn color="secondary" width="100%">Cancel</v-btn>
               </v-col>
           </v-row>
       </v-list-item>
   </v-list>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
   orderCount: Number
})

const imgload = ref(false)
</script>
