<template>
<v-row>
  <v-col>
      <div class="text-subtitle-2 pb-3 text-uppercase">
          Please log in to your account
      </div>
      <authErrors :errors="errors" :showAuthErrors="showAuthErrors" />
      <form ref="loginForm" @submit.prevent="login">
          <v-text-field class="pb-2" v-model="email" :rules="emailRules" density='compact' placeholder="E-mail" variant="outlined" required></v-text-field>
          <v-text-field v-model="password" :rules="passwordRules" type="password" density='compact' variant="outlined" placeholder="Password" required></v-text-field>
          <!-- <v-checkbox v-model="remember" value="1" label="Remember me"
          type="checkbox" variant="compact" ></v-checkbox> -->

          <div>
              <v-btn class="me-4" color="success" type="submit" :loading="authLoading">
                  submit
              </v-btn>
              <v-btn class="me-4" color="primary" variant="text" @click="emits('emitShowRegister')" :disabled="authLoading">
                  Create Account
              </v-btn>
          </div>
      </form>
  </v-col>
</v-row>
</template>
<script setup>
import { ref } from 'vue'
import authErrors from './authErrors.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth-store'

const { handleLogin } = useAuthStore()
const { authLoading, errors, showAuthErrors } = storeToRefs(useAuthStore())

const loginForm = ref()
const email = ref('')
const password = ref('')
const remember = ref(false)

const emits = defineEmits(['emitShowRegister'])

const emailRules = ref([
    value =>  !!value || 'Email is required.',
    value => (value && /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) || 'Please use a valid email.',
])
const passwordRules = ref([
    value =>  !!value || 'Password is required.',
    value => (value && value.length >= 8) || 'Password must be at least 8 characters.',
])

// async function validate () {
//     const { valid } = await loginForm.value.validate()

//     if (valid){
//       login()
//     }
//   }

const login = async() => {
    showAuthErrors.value = false
    if (email.value.length>0 && password.value.length>0){
      const creds = {
      "email": email.value,
      "password": password.value,
      "remember": remember.value
      }
      await handleLogin(creds)
    }
}

// const resetValidationErrors = () => {
//   form.value.resetValidation
// }
</script>