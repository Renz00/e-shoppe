// Utilities
import { defineStore } from 'pinia'
import { loadPaginatedProducts, loadProductPage, filterProducts, searchProducts, storeToFavourites, showProduct, loadProductFilterPage, fetchOrderProducts } from "../http/products-api"
import { useCryptStore } from '@/store/crypt-store'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    selectedProduct: [],
    cartItemCount: 0,
    cartItems: [],
    isLoadingProducts: false,
    currentProductCategory: '',
    productPageCount:0,
    productCurrentPage:1,
    productLimit:12,
    productSearchItems:[],
    isLoadingSearchItems: false,
    isLoadingSelectedProduct: false,
    isFiltered: false,
    productPageLinks:[],
    currentProductFilter:{},
    overlay: false,
    currentSearchText: '',
    isLoadingMore: false
  }),
  actions: {
    getCartItemCount() {
      if (sessionStorage.getItem('cart')!=null){
        this.cartItems = []
        this.cartItemCount = 0
        const { getCartData } = useCryptStore()
        const cart = getCartData()
        this.cartItems = cart
        cart.map((val, index)=>{
          this.cartItemCount += val.count
        })
      }
      else {
        this.cartItemCount = 0
        this.cartItems = []
      }
    },
    setCartItemCount(productData){
      const { encryption, getCartData } = useCryptStore()
      this.overlay = true
      this.cartItems = []
      this.cartItemCount = 0
      if (sessionStorage.getItem('cart')!=null){
        const cart = getCartData()
        cart.map((val, index)=>{
          //If product already exists in array, increment count and total_price instead of pushing to array
          if (val.id == productData.id){
            productData.count += val.count
            productData.total_price += val.total_price
          }
          else {
            this.cartItems.push(val)
          }
        })
      }
      //insert new item in cart
      this.cartItems.push(productData)
      //compute no. of items in cart
      this.cartItems.map((val)=>{
        this.cartItemCount += val.count
      })
      sessionStorage.setItem('cart', encryption(JSON.stringify(this.cartItems)))
    },
    async handleFetchSelectedProduct(productId){
      this.products = []
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
      this.isLoadingMore = true
      const link = this.productPageLinks[this.productCurrentPage]
      if (this.products != null && this.productLimit<120){
        const {data} = await loadProductPage(link.url)
        //Concatenate the new product data to the previous array
        this.products = this.products.concat(data.products.data)
        this.productLimit += 12
        this.isLoadingMore = false
      }
      else {
        console.log('Error loading more products')
      }
    },
    async handleLoadPage(){
      this.isLoadingProducts = true
      const pageLink = this.productPageLinks[this.productCurrentPage]
      const {data} = await loadProductPage(pageLink.url)
      if (data.products != null){
        this.products = data.products.data
        this.productPageCount = data.products.last_page
        this.productPageLinks = data.products.links
        this.isLoadingProducts = false
      }
      else {
        console.log('Error loading page of products')
      }
    },
    async handleLoadFilterPage(){
      this.isLoadingProducts = true
      const pageLink = this.productPageLinks[this.productCurrentPage]
      const {data} = await loadProductFilterPage(this.currentProductFilter, pageLink.url)
      if (data.products != null){
        this.products = data.products.data
        this.productPageCount = data.products.last_page
        this.productPageLinks = data.products.links
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
        this.productPageLinks= data.products.links
        this.isLoadingProducts = false
        this.isFiltered = false
      }
      else {
        console.log('Error loading page of products')
      }
    },
    async handleFilterProducts(filters){
      this.isLoadingProducts = true
      this.products = []
      this.currentProductFilter = filters
      const {data} = await filterProducts(this.currentProductFilter)
      if (data.products != null){
        this.products = data.products.data
        this.productPageCount = data.products.last_page
        this.productPageLinks= data.products.links
        this.isLoadingProducts = false
        this.isFiltered = true
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
        this.isLoadingSearchItems = false
        this.searchProducts = []
        this.productSearchItems = []
        this.isLoadingProducts = true
        this.currentSearchText = searchText
        sessionStorage.setItem('search', searchText)
        //create slug for api call
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
    async handleFetchOrderProducts(orderProducts){
      this.isLoadingProducts = false
      const {data} = await fetchOrderProducts(orderProducts)
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
