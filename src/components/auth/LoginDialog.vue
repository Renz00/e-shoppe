<template>
<v-row>
<v-col>
    <div class="text-subtitle-1 pb-3">
        Login to your account
        {{ userData }}
    </div>
    <form @submit.prevent="submit">
        <v-text-field class="pb-2" v-model="email" :rules="emailRules" density='compact' placeholder="E-mail" variant="outlined" required></v-text-field>
        <v-text-field v-model="password" :rules="passwordRules" density='compact' variant="outlined" placeholder="Password" required></v-text-field>
        <v-checkbox v-model="remember" value="1" label="Remember me"
            type="checkbox"></v-checkbox>
        <div class="">
            <v-btn class="me-4" color="success" @click="login(email, password)" type="submit" :loading="authLoading">
                submit
            </v-btn>
            <v-btn class="me-4" variant="text" color="primary" @click="emits('emitShowRegister')" :disabled="disableRegister">
                Create Account
            </v-btn>
        </div>
    </form>
</v-col>
</v-row>
</template>
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth-store'
const { handleLogin } = useAuthStore()

const email = ref('')
const password = ref('')
const remember = ref(null)
const disableRegister = ref(false)

const emits = defineEmits(['emitShowRegister'])

const emailRules = ref([
    value =>  !!value || 'Email is required.',
    value => (value && /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) || 'Please use a valid email.',
])
const passwordRules = ref([
    value =>  !!value || 'Password is required.',
    value => (value && value.length >= 8) || 'Password must be at least 8 characters.',
])

const login = (email, password) => {
    disableRegister.value=true
    if (email.length>0 && password.length>0){
        const creds = {
        "email": email,
        "password": password
        } 
        handleLogin(creds)
    }
}

</script>