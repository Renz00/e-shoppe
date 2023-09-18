// Utilities
import { defineStore } from 'pinia'
import { loadPaginatedProducts, loadProductPage, filterProducts, searchProducts } from "../http/products-api"

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    selectedProduct: {},
    cartItemCount: 0,
    isLoadingProducts: false,
    currentProductCategory: '',
    productPageCount:0,
    productCurrentPage:1,
    productLimit:12,
    productSearchItems:[]
  }),
  actions: {
    setCartItemCount(){
      this.cartItemCount++
    },
    async fetchSelectedProduct(){
      // const {data} = await allProducts()
      // this.selectedProduct = data.products
    },
    async handleLoadMore(){
      this.isLoadingProducts = true
      if (this.products != null && this.productLimit<120){
        const {data} = await loadProductPage(this.productCurrentPage)
        //Concatenate the new product data to the previous array
        this.products = this.products.concat(data.products.data)
        this.productLimit += 12
        this.isLoadingProducts = false
      }
      else {
        console.log('Error loading more products')
      }
    },
    async handleLoadPage(){
      this.isLoadingProducts = true
      const {data} = await loadProductPage(this.productCurrentPage)
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
        this.productCurrentPage = data.products.current_page
        this.isLoadingProducts = false
      }
      else {
        console.log('Error loading page of products')
      }
    },
    async handleFilterProducts(filters){
      this.isLoadingProducts = true
      const {data} = await filterProducts(filters)
      if (data.products != null){
        this.products = data.products.data
        this.productPageCount = data.products.last_page
        this.isLoadingProducts = false
      }
      else {
        console.log('Error filtering products')
      }
    },
    async handleSearchProducts(searchText){
      this.searchProducts = []
      // this.isLoadingProducts = true
      const searchSlug = searchText.replace(' ', '-')
      const {data} = await searchProducts(searchSlug)
      if (data.products != null){
        const products = data.products.data
        Object.keys(products).map((index, key)=> {
          this.productSearchItems.push(products[index].product_name)
        })
        
        // this.productSearchItems = data.products.data
        // this.isLoadingProducts = false
      }
      else {
        console.log('Error filtering products')
      }
    }
  }
})
