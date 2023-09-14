// Utilities
import { defineStore } from 'pinia'
import { computed, ref } from "vue";
import { login, register, logout } from "../http/auth-api"
import { useCryptStore } from '@/store/crypt-store'

export const useAuthStore = defineStore("authStore", () => {
  const { decryption, encryption } = useCryptStore()
  const showLogin=ref(false)
  const showRegister=ref(false)
  const showAuthDialog = ref(false)
  const showAuthErrors = ref(false)
  const authLoading = ref(false)
  const isLoggedIn = ref(false)
  const errors = ref(null)

  const setAuthDialog = (type) =>{
    //instantiate values
    errors.value = null
    showAuthErrors.value = false
    showLogin.value = false
    showRegister.value = false
    //Check if a user is already logged in
    if (localStorage.getItem('data') != null){
      showAuthDialog.value = false
    }
    else {
      //if localstorage keys do not exist/user not logged in, show auth dialog
      showAuthDialog.value = true
      //Show content of auth dialog
      if (type == 'login'){
        showLogin.value = true
      }
      if (type == 'register') {
        showRegister.value = true
      }
    }
  }

  const handleLogin = async(creds) => {
    authLoading.value=true
    const {data} = await login(creds)
    if (data.errors!=null) {
      errors.value = data.errors
      showAuthErrors.value = true
      authLoading.value=false
    }
    //If user is logged in, encrypt data and store in localStorage
    if (data.user!=null && data.token != null){
      const dataObject = data.user
      //Add token to data object
      dataObject['token'] = data.token
      const encryptedData = encryption(JSON.stringify(dataObject))
      localStorage.setItem('data', encryptedData)
      authLoading.value = false
      showAuthDialog.value = false
      isLoggedIn.value = true
      console.log('user is logged in')
    }
    else {
      console.log('Failed login')
    }
  }

  const handleRegister = async(newUser) => {
      authLoading.value=true
      const {data} = await register(newUser)
      if (data.errors != null){
        errors.value = data.errors
        showAuthErrors.value = true
        authLoading.value=false
      }
      if (data.result == 1){
        //If user has been successfully registered, call handleLogin method
        const creds = {
          'email': newUser.email,
          'password': newUser.password
        }
        await handleLogin(creds)
      }
      else {
        console.log(data)
      }
  }

  const handleLogout = async() => {
    if (localStorage.getItem('data') != null){
      const decryptedData = decryption(localStorage.getItem('data'))
      const parsedData = JSON.parse(decryptedData)
      const {data} = await logout(parsedData.token)
      if (data.result == 1){
        localStorage.removeItem('data')
        isLoggedIn.value = false
        console.log('user is logged out')
      }
      else {
        console.log('Failed logout')
      }
    }
    else {
      console.log('Failed to get data, logout escaped.')
    }
  }

  return {
      showLogin,
      showRegister,
      showAuthDialog,
      authLoading,
      showAuthErrors,
      errors,
      isLoggedIn,
      setAuthDialog,
      handleLogin,
      handleRegister,
      handleLogout
  }
})

