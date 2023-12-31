// Utilities
import { defineStore } from 'pinia'
import { ref } from "vue";
import { login, register, logout } from "../http/auth-api"
import { useCryptStore } from '@/store/crypt-store'

export const useAuthStore = defineStore("authStore", () => {
  const { encryption, getUserData } = useCryptStore()
  const showLogin=ref(false)
  const showRegister=ref(false)
  const showAuthDialog = ref(false)
  const showAuthErrors = ref(false)
  const authLoading = ref(false)
  const isLoggedIn = ref(false)
  const errors = ref([])

  const setAuthDialog = (type) =>{
    //instantiate values
    errors.value = []
    showAuthErrors.value = false
    showLogin.value = false
    showRegister.value = false
    //Check if a user is already logged in
    if (localStorage.getItem('data') != null){
      showAuthDialog.value = false
    }
    else {
      //if localStorage keys do not exist/user not logged in, show auth dialog
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

  // const handleRevokeToken = async() => {
  //   const userData = getUserData()
  //   const {data} = await revokeToken(userData.token)
  //   if (data.result==true){
  //     console.log('token is revoked')
  //   }
  //   else {
  //     console.log('failed to revoke token')
  //   }
  // }
  
  const handleLogin = async(creds) => {
    errors.value = []
    authLoading.value=true
    const {data} = await login(creds)
    if (data.errors!=null) {
      const authErrors = data.errors
      //Checks if authErrors is an object then maps it
      Object.keys(authErrors).map(function(key, index) {
        errors.value.push(authErrors[key][index])
      })
      showAuthErrors.value = true
      authLoading.value=false
    }
    //If user is logged in, encrypt data and store in localStorage
    if (data.user!=null && data.token != null){
      const dataObject = data.user
      console.log(dataObject)
      //Add token to data object
      dataObject['token'] = data.token
      const encryptedData = encryption(JSON.stringify(dataObject))

      if (creds.remember == true){
        localStorage.setItem('data', encryptedData)
      }
      else {
        sessionStorage.setItem('data', encryptedData)
      }
      
      authLoading.value = false
      showAuthDialog.value = false
      location.reload();
      console.log('user is logged in')
    }
    else {
      console.log('Failed login')
    }
  }

  const handleRegister = async(newUser) => {
      const {data} = await register(newUser)
      if (data.errors != null){
        const authErrors = data.errors
        //Checks if authErrors is an object then maps it
        Object.keys(authErrors).map(function(key, index) {
          errors.value.push(authErrors[key][index])
        })
        showAuthErrors.value = true
        authLoading.value=false
      }
      if (data.result == 1){
        //If user has been successfully registered, call handleLogin method
        const creds = {
          'id': data.user_id,
          'email': newUser.email,
          'password': newUser.password,
          'remember': false
        }
        await handleLogin(creds)
      }
      else {
        console.log(data)
      }
  }

  const handleLogout = async() => {
    authLoading.value = true
    if (localStorage.getItem('data')!=null || sessionStorage.getItem('data')!=null){
      const userData = getUserData()
      const {data} = await logout(userData.token)
      if (data.result == 1){
        if (localStorage.getItem('data')!=null){
          //if user is remembered
          localStorage.removeItem('data')
        }
        else {
          //if user is not
          sessionStorage.removeItem('data')
        }
        isLoggedIn.value = false
        console.log('user is logged out')
      }
      else {
        console.log('Failed logout')
      }
      authLoading.value = false
    }
    else {
      console.log('Failed to get data, logout escaped.')
      authLoading.value = false
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

