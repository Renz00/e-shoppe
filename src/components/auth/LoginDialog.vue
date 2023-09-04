<template>
    <v-row justify="center">
        <v-dialog v-model="showLoginDialog" width="500" height="500">
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col>
                                <div class="text-subtitle-1 pb-3">
                                    Login to your account
                                </div>
                                <form @submit.prevent="submit">
                                    <v-text-field class="pb-2" v-model="email" :rules="emailRules" density='compact' placeholder="E-mail" variant="outlined" required></v-text-field>
                                    <v-text-field v-model="password" :rules="passwordRules" density='compact' variant="outlined" placeholder="Password" required></v-text-field>
                                    <v-checkbox v-model="remember" value="1" label="Remember me"
                                        type="checkbox"></v-checkbox>
                                    <div class="">
                                        <v-btn class="me-4" color="success" type="submit">
                                            submit
                                        </v-btn>
                                        <v-btn class="me-4" variant="text" color="primary" @click="showLoginDialog=false, showRegisterDialog = true">
                                            Create Account
                                        </v-btn>
                                    </div>
                                </form>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from "pinia";
import { useAuthStore } from '@/store/auth-store'
var { showLoginDialog, showRegisterDialog } = storeToRefs(useAuthStore())

const email = ref('')
const password = ref('')
const remember = ref(null)

const emailRules = ref([
    value =>  !!value || 'Email is required.',
    value => (value && /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) || 'Please use a valid email.',
])
const passwordRules = ref([
    value =>  !!value || 'Password is required.',
    value => (value && value.length >= 8) || 'Password must be at least 8 characters.',
])

</script>