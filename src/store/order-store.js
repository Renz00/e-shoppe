// Utilities
import { ref } from 'vue'
import { defineStore } from 'pinia'
// import {  } from "@/http/order-api"
import { useCryptStore } from '@/store/crypt-store'

export const useOrderStore = defineStore("orderStore", () => {
    const { encryption, getUserData } = useCryptStore()
    const orders = ref([])
    const deliveryAddress = ref({})
    const vouchers = ref({})
    const courier = ref({})
    const isLoadingOrder = ref(false)

    // const handleStoreToFavourites = async(favData, token) =>{
    //   isLoadingLike.value = true
    //   const {data} = await storeToFavourites(favData, token)

    //   if (data.favourite != null){
    //       likedMessage.value = 'You liked this!'
    //       liked.value = true
    //       showFavTooltip.value = true
    //   }
    //   else {
    //       if (data.deleted == true){
    //           likedMessage.value = 'Removed from favourites'
    //           liked.value = false
    //           showFavTooltip.value = true

    //       }
    //       else {
    //           console.log('Error storing fav')
    //       }
    //   }
    //   isLoadingLike.value = false
    // }

    return {
        orders,
        deliveryAddress,
        vouchers,
        isLoadingOrder
    }
  })
