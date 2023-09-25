// Utilities
import { defineStore } from 'pinia'
import { loadPaginatedProducts, loadProductPage, filterProducts, searchProducts, storeToFavourites, showProduct, loadProductFilterPage } from "../http/products-api"
import { useCryptStore } from '@/store/crypt-store'

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
    isFiltered: false,
    productPageLinks:[],
    currentProductFilter:{},
    overlay: false
  }),
  actions: {
    setCartItemCount(productData){
      const { encryption, decryption } = useCryptStore()
      this.overlay = true
      let orderProducts = []
      if (sessionStorage.getItem('cart')!=null){
        const decryptSess = decryption(sessionStorage.getItem('cart'))
        const parsedSess = JSON.parse(decryptSess)
        parsedSess.map((val, index)=>{
          //If product ID already exists in array, incrememnt count and total_price instead of pushing to array
          if (val.id == productData.id){
            productData.count += val.count
            productData.total_price += val.total_price
            parsedSess.slice(index)
          }
          else {
            orderProducts.push(val)
          }
        })
      }
      orderProducts.push(productData)
      sessionStorage.setItem('cart', encryption(JSON.stringify(orderProducts)))
      this.overlay = false
      console.log(orderProducts)
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
      this.isLoadingProducts = true
      const link = this.productPageLinks[this.productCurrentPage]
      if (this.products != null && this.productLimit<120){
        const {data} = await loadProductPage(link.url)
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
    async handleStoreToFavourites(favData, token){
      this.isLoadingProducts = false
      const { getUserData } = useCryptStore()
      const {data} = await storeToFavourites(favData, token)
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
