// Utilities
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { storeToFavourites } from "@/http/favourites-api"
import { useCryptStore } from '@/store/crypt-store'

export const useFavouriteStore = defineStore("favouriteStore", () => {
    const { encryption, getUserData } = useCryptStore()
    const favProducts = ref([])
    const favPageCount = ref(0)
    const favCurrentPage = ref(1)
    const isLoadingFav = ref(false)
    const isLoadingLike = ref(false)
    const liked = ref(false)
    const showFavTooltip = ref(false)
    const likedMessage = ref('')
  
    const handleStoreToFavourites = async(favData, token) =>{
        isLoadingLike.value = true
        const {data} = await storeToFavourites(favData, token)
    
        if (data.favourite != null){
            likedMessage.value = 'You liked this!'
            liked.value = true
            showFavTooltip.value = true
        }
        else {
            if (data.deleted == true){
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
  
    return {
        favProducts,
        favPageCount,
        favCurrentPage,
        isLoadingFav,
        showFavTooltip,
        liked,
        likedMessage,
        isLoadingLike,
        handleStoreToFavourites
    }
  })
