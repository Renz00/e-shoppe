// Utilities
import { defineStore } from 'pinia'
import { allProducts, similarProducts, loadMore, loadPaginatedProducts, loadPage } from "../http/products-api"

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    simProducts: [],
    selectedProduct: {},
    cartItemCount: 0,
    isLoadingProducts: false,
    currentProductCategory: '',
    productLimit:0,
    productPageCount:0,
    productCurrentPage:1
  }),
  actions: {
    async fetchAllProducts(){
      this.isLoadingProducts = true
      const {data} = await allProducts()
      if (data.products != null){
        this.products = data.products
        this.isLoadingProducts = false
        this.productLimit = 12
      }
      else {
        console.log('Error loading products')
      }
      
    },
    async fetchSelectedProduct(){
      // const {data} = await allProducts()
      // this.selectedProduct = data.products
    },
    async fetchSimilarProducts(category){
      const {data} = await similarProducts(category)
      this.simProducts = data.products
    },
    async handleLoadMore(){
      this.isLoadingProducts = true
      if (this.productLimit <= 120){
        this.productLimit += 12
        const {data} = await loadMore(this.productLimit)
        if (data.products != null){
          this.products = data.products
          this.isLoadingProducts = false
        }
        else {
          console.log('Error loading more products')
        }
      }
    },
    async handleLoadPage(){
      this.isLoadingProducts = true
      const {data} = await loadPage(this.productCurrentPage)
      if (data.products != null){
        this.products = data.products.data
        this.productPageCount = data.products.last_page
        this.isLoadingProducts = false
      }
      else {
        console.log('Error loading page of products')
      }
    },
    async handlePaginatedProducts(){
      this.isLoadingProducts = true
      const {data} = await loadPaginatedProducts()
      if (data.products != null){
        this.products = data.products.data
        this.productPageCount = data.products.last_page
        this.isLoadingProducts = false
      }
      else {
        console.log('Error loading page of products')
      }
    },
    setCartItemCount(){
      this.cartItemCount++
    }
  }
})
