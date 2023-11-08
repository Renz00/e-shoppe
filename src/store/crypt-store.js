// Utilities
import { defineStore } from 'pinia'
import CryptoJS, { enc } from 'crypto-js'

export const useCryptStore = defineStore("cryptStore", () => {
    const cryptPassword = "?v^CJ&03de)|Q=T"
    
  const encryption = (dataToEncrypt) => {
    return CryptoJS.AES.encrypt(dataToEncrypt, cryptPassword).toString();
  }

  const decryption = (dataToDecrypt) => {
    return CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(dataToDecrypt, cryptPassword));
  }

  const getUserData = () =>{
    
    if (localStorage.getItem('data')!=null){
      //if user is remembered
      const decryptedData = decryption(localStorage.getItem('data'))
      const parsedData = JSON.parse(decryptedData)
      console.log('local')
      return parsedData
    }
    else if (sessionStorage.getItem('data')!=null){
      //if user is not remembered
      const decryptedData = decryption(sessionStorage.getItem('data'))
      const parsedData = JSON.parse(decryptedData)
      console.log('session')
      return parsedData
    }
    else {
      console.log('user data is null')
      return false
    }
  }

  const getCartData = () =>{
    if (sessionStorage.getItem('cart')!=null){
      const decryptedData = decryption(sessionStorage.getItem('cart'))
      const parsedData = JSON.parse(decryptedData)
      return parsedData
    }
    else {
      console.log('cart data is null')
      return false
    }
  }

  return {
    encryption,
    decryption,
    getUserData,
    getCartData
  }
})

