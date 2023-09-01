<template>
    <v-row justify="center">
        <v-dialog v-model="showLoginDialog" persistent width="auto">
            <v-card>
                <v-card-title class="text-h5">
                    Use Google's location service?
                </v-card-title>
                <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google,
                    even when no apps are running.</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1" variant="text" @click="showLoginDialog = false">
                        Close
                    </v-btn>
                    <v-btn color="green-darken-1" variant="text" @click="showLoginDialog  = false">
                        Login
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from '@/store/auth-store'
const { showLoginDialog } = storeToRefs(useAuthStore())
</script>