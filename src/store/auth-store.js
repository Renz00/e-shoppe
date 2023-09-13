// Utilities
import { defineStore } from 'pinia'
import { computed, ref } from "vue";
import CryptoJS from 'crypto-js'

import { login, register } from "../http/auth-api"

export const useAuthStore = defineStore("authStore", () => {

  const cryptPassword = "?v^CJ&03de)|Q=T"
  const user = ref(null)
  const token = ref(null)
  const showLogin=ref(false)
  const showRegister=ref(false)
  const showAuthDialog = ref(false)
  const showAuthErrors = ref(false)
  const authLoading = ref(false)
  const errors = ref(null)
  

  //computed variable to retrieve user data and token
  const userData = computed(() => {
    if (localStorage.getItem('data') != null){
      const decryptedData = decryption(localStorage.getItem('data'))
      return JSON.parse(decryptedData)
    }
    else {
      return false
    }
  })

  const encryption = (dataToEncrypt) => {
    return CryptoJS.AES.encrypt(dataToEncrypt, cryptPassword).toString();
  }

  const decryption = (dataToDecrypt) => {
    return CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(dataToDecrypt, cryptPassword));
  }

  const setAuthDialog = (type) =>{
    //instantiate values
    showAuthErrors.value = false
    errors.value = null
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
    user.value = data.user
    token.value = data.token

    //If user is logged in, encrypt data and store in localStorage
    if (user.value!=null && token.value != null){

      const data = user.value
      //Add token to data object
      data['token'] = token.value

      const encryptedData = encryption(JSON.stringify(data))

      localStorage.removeItem('data')
      localStorage.setItem('data', encryptedData)
      showAuthDialog.value = false
      authLoading.value = false
    }
    else {
      console.log('Failed login')
    }

    if (data.errors!=null) {
      errors.value = data.errors
    }
  }

  const handleRegister = async(newUser) => {
      const {data} = await register(newUser)

      if (data.errors != null){
        // for (var key in data.errors) {
        //   const errorValue = data.errors[key][0]
        //   errors[`${key}`] = errorValue
        // }
        errors.value = data.errors
        showAuthErrors.value = true
      }

      if (data.result == 1){
        //If user has been successfully registered, call handleLogin method
        await handleLogin({
          'email': newUser.email,
          'password': newUser.password
        })
      }
  }

  const handleLogout = async() => {
    const {data} = await logout()

    if (data.result == 1){
      user.value = []
      token.value = null
      localStorage.removeItem('data')
    }
    else {
      console.log('Failed logout')
    }
  }

  return {
      user,
      userData,
      showLogin,
      showRegister,
      showAuthDialog,
      authLoading,
      showAuthErrors,
      errors,
      setAuthDialog,
      handleLogin,
      handleRegister,
      handleLogout
  }
})

