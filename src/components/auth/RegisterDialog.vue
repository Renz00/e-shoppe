<template>
  <v-row justify="center">
    <v-dialog v-model="showRegisterDialog" width="500" height="600">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <div class="text-subtitle-1 pb-3">
                  Login to your account
                </div>
                <form @submit.prevent="submit">
                  <v-text-field class="pb-2" v-model="name" :rules="nameRules" label="Name" variant="outlined" density='compact' required></v-text-field>
                  <v-text-field class="pb-2" v-model="phone" :rules="phoneRules" placeholder="Phone Number" variant="outlined" density='compact' required></v-text-field>
                  <v-text-field class="pb-2" v-model="email" :rules="emailRules" placeholder="E-mail" variant="outlined" density='compact' required></v-text-field>
                  <v-text-field class="pb-2" v-model="password" :counter="8" :rules="passwordRules" placeholder="Password" variant="outlined" density='compact' required></v-text-field>
                    <v-text-field v-model="confirm_password" :counter="8" :rules="confirmPasswordRules" variant="outlined" density='compact' placeholder="Confirm Password" required></v-text-field>
                  <div class="pt-5">
                    <v-btn class="me-4" type="submit">
                      submit
                    </v-btn>
                    <v-btn @click="">
                      clear
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
var { showRegisterDialog } = storeToRefs(useAuthStore())

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

</script>