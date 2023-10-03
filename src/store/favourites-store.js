// Utilities
import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { storeToFavourites, fetchFavourites } from "@/http/favourites-api"
import { useCryptStore } from '@/store/crypt-store'
import { useProductStore } from '@/store/product-store'

export const useFavouriteStore = defineStore("favouritesStore", () => {
    const { encryption, getUserData } = useCryptStore()
    const { selectedProduct } = storeToRefs(useProductStore())
    const favProducts = ref([])
    const favPageCount = ref(0)
    const favCurrentPage = ref(1)
    const isLoadingFav = ref(false)
    const isLoadingLike = ref(false)
    const liked = ref(false)
    const showFavTooltip = ref(false)
    const likedMessage = ref('')

    const handleStoreToFavourites = async (product_id) =>{
      isLoadingLike.value = true
      const userData = getUserData()
      const favData = {
        'user_id': userData.id,
        'product_id': product_id
      }
      const {data} = await storeToFavourites(favData, userData.token)
      if (data.favourite != null){
        //Set isFavourite to true if stored
        if (selectedProduct.value!=null){
          selectedProduct.value.isFavourite = true
        }
          likedMessage.value = 'You liked this!'
          liked.value = true
          showFavTooltip.value = true
      }
      else {
          if (data.deleted == true){
            //Set isFavourite to false if removed
              if (selectedProduct.value!=null){
                selectedProduct.value.isFavourite = false
              }
              likedMessage.value = 'Removed from favourites'
              liked.value = false
              showFavTooltip.value = true
          }
          else {
              console.log('Error storing fav')
          }
      }
      isLoadingLike.value = false
    }

    const handleFetchFavourites = async() =>{
      isLoadingFav.value = true
      const userData = getUserData()
      const userObj = {
        id: userData.id
      }
      const {data} = await fetchFavourites(userObj, userData.token)
      if (data.favourites!=null){
        favProducts.value = data.favourites.data
        if (favProducts.value.isFavourite){
          liked.value = true
        }
        isLoadingFav.value=false
      }
      else {
        console.log('Error fetching fav')
      }
    }

    return {
        favProducts,
        favPageCount,
        favCurrentPage,
        isLoadingFav,
        showFavTooltip,
        liked,
        likedMessage,
        isLoadingLike,
        handleStoreToFavourites,
        handleFetchFavourites
    }
  })
