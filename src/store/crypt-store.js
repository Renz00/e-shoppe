// Utilities
import { defineStore } from 'pinia'
import CryptoJS from 'crypto-js'

export const useCryptStore = defineStore("cryptStore", () => {
    const cryptPassword = "?v^CJ&03de)|Q=T"
    
  const encryption = (dataToEncrypt) => {
    return CryptoJS.AES.encrypt(dataToEncrypt, cryptPassword).toString();
  }

  const decryption = (dataToDecrypt) => {
    return CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(dataToDecrypt, cryptPassword));
  }

  return {
    encryption,
    decryption
  }
})

