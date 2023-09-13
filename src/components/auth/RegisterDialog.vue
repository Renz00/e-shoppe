<template>
  <v-row>
    <v-col>
      <div class="text-subtitle-1 pb-3">
        Create your account
      </div>
      <div class="pb-3" v-if="showAuthErrors">
          <v-alert closable icon="mdi-alert-circle" type="error">
            <ul>
              <li class="text-body-2" v-for="error in errors">{{ error[0] }}</li>
            </ul>
          </v-alert>
      </div>
      <form @submit.prevent="submit">
        <v-text-field class="pb-2" v-model="name" :rules="nameRules" placeholder="Name" variant="outlined" density='compact' required></v-text-field>
        <v-text-field class="pb-2" v-model="phone" :rules="phoneRules" placeholder="Phone Number" type="number" variant="outlined" density='compact' required>
          <template v-slot:prepend-inner>
              +63
          </template>
        </v-text-field>
        <v-text-field class="pb-2" v-model="email" :rules="emailRules" placeholder="E-mail" variant="outlined" density='compact' required></v-text-field>
        <v-text-field class="pb-2" v-model="password" :counter="8" :rules="passwordRules" type="password" placeholder="Password" variant="outlined" density='compact' required></v-text-field>
        <v-text-field v-model="confirm_password" :counter="8" :rules="confirmPasswordRules" type="password" variant="outlined" density='compact' placeholder="Confirm Password" required></v-text-field>
        
        <div class="pt-5">
          <v-btn class="me-4" @click="register" color="success" type="submit">
            submit
          </v-btn>
          <v-btn class="me-4" variant="text" color="primary" @click="emits('emitShowLogin')" :disabled="authLoading">
                Back
            </v-btn>
        </div>
      </form>
    </v-col>
  </v-row>

</template>
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth-store'
const { authLoading, errors, showAuthErrors } = storeToRefs(useAuthStore())

const { handleRegister } = useAuthStore()

const emits = defineEmits(['emitShowLogin'])

const email = ref('')
const name = ref('')
const phone = ref('')
const password = ref('')
const confirm_password = ref('')

const emailRules = ref([
    value =>  !!value || 'Email is required.',
    value => (value && /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) || 'Please use a valid email.',
])
const nameRules = ref([
    value =>  !!value || 'Name is required.',
    value => (value && value.length>=5) || 'Name should be at least 5 characters.',
])
const phoneRules = ref([
    value =>  !!value || 'Phone number is required.',
    value => (value && /[0-9-]+/.test(value) && value.length > 9) || 'Please use a valid phone number.',
])
const passwordRules = ref([
    value =>  !!value || 'Password is required.',
    value => (value && value.length>=8) || 'Password should be at least 8 characters.',
])
const confirmPasswordRules = ref([
    value =>  !!value || 'Password should be confirmed.',
    value => (value && value === password.value) || 'Password does not match.',
])


const register = async () => {
    const newUser = {
      "name": name.value,
      "email": email.value,
      "phone": phone.value,
      "password": password.value,
      "password_confirmation": confirm_password.value
    }
    await handleRegister(newUser)
}

</script>