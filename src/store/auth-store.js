// Utilities
import { defineStore } from 'pinia'
// import { allProducts, similarProducts } from "../http/products-api"

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    showLoginDialog: false,
    showRegisterDialog: false
  }),
  actions: {
  }
})
