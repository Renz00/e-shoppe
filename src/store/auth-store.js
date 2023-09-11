// Utilities
import { defineStore } from 'pinia'
import { computed, ref } from "vue";
import CryptoJS from 'crypto-js'

import { login } from "../http/auth-api"

export const useAuthStore = defineStore("authStore", () => {

  const cryptPassword = "?v^CJ&03de)|Q=T"
  const user = ref(null)
  const token = ref(null)
  const showLogin=ref(false)
  const showRegister=ref(false)
  const showAuthDialog = ref(false)
  const authLoading = ref(false)

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
  }

  const handleRegister = async(newUser) => {
    const {data} = await register(newUser)

    if (data.result == 1){
      //If user has been successfully registered, call handleLogin method
      await handleLogin({
        'email': newUser.email,
        'password': newUser.password
      })
    }
    else {
      console.log('Failed register')
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
      setAuthDialog,
      handleLogin,
      handleRegister,
      handleLogout
  }
})

