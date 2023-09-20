// Utilities
import { defineStore } from 'pinia'
import { loadPaginatedProducts, loadProductPage, filterProducts, searchProducts, storeToFavourites, showProduct } from "../http/products-api"

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    selectedProduct: [],
    cartItemCount: 0,
    isLoadingProducts: false,
    currentProductCategory: '',
    productPageCount:0,
    productCurrentPage:1,
    productLimit:12,
    productSearchItems:[],
    isLoadingSearchItems: false,
    isLoadingSelectedProduct: false,
  }),
  actions: {
    setCartItemCount(){
      this.cartItemCount++
    },
    async handleFetchSelectedProduct(productId){
      this.isLoadingSelectedProduct=true
      const {data} = await showProduct(productId)
      if (data.products!=null){
        this.selectedProduct = data.products
        this.isLoadingSelectedProduct=false
      }
      else {
        console.log('Error fetching product')
      }
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
      this.products = []
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
    async handleSearchProductsAC(searchText){
      this.isLoadingSearchItems = true
      if (searchText != null && searchText != ''){
        this.searchProducts = []
        const searchSlug = searchText.replace(' ', '-')
        const {data} = await searchProducts(searchSlug)
        if (data.products != null){
          const products = data.products.data
          Object.keys(products).map((index)=> {
            this.productSearchItems.push(products[index].product_name)
          })
          this.isLoadingSearchItems = false
        }
        else {
          console.log('Error searching products')
        }
      }
    },
    async handleSearchProducts(searchText){
      if (searchText != null && searchText != ''){
        this.searchProducts = []
        this.productSearchItems = []
        this.isLoadingProducts = true
        this.isLoadingSearchItems = false
        const searchSlug = searchText.replace(' ', '-')
        const {data} = await searchProducts(searchSlug)
        if (data.products != null){
          this.products = data.products.data
          this.productPageCount = data.products.last_page
          this.productCurrentPage = data.products.current_page
          this.isLoadingProducts = false
        }
        else {
          console.log('Error fetching searched products')
        }
      }
    },
    async handleStoreToFavourites(favData){
      this.isLoadingProducts = false
      const {data} = await storeToFavourites(favData)
      if (data.products != null){
        this.products = data.products.data
        this.productPageCount = data.products.last_page
        this.productCurrentPage = data.products.current_page
        this.isLoadingProducts = false
      }
      else {
        console.log('Error fetching favourite products')
      }
    }
  }
})
