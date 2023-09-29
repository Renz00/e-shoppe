// Utilities
import { ref } from 'vue'
import { defineStore } from 'pinia'
// import {  } from "@/http/order-api"
import { storeToRefs } from 'pinia'
import { useCryptStore } from '@/store/crypt-store'
import { useAuthStore } from '@/store/auth-store'

export const useOrderStore = defineStore("orderStore", () => {
    const { encryption, getUserData } = useCryptStore()
    const orders = ref([])
    const deliveryAddress = ref({})
    const vouchers = ref({})
    const courier = ref(null)
    const payment = ref(null)
    const isLoadingOrders = ref(false)

    const handleCheckout = async(cartItems) =>{
        isLoadingOrders.value = true
        const userData = getUserData()
        //Check if user is logged in
        if (userData!=false){
            const order = {
                "order": {
                    "user_id": userData.id,
                    "item_count": 10,
                    "status": 1,
                    "discount": 10,
                    "courier": courier.value,
                    "payment_method": payment.value,
                    "delivery_address": deliveryAddress.value
                },
                "order_products": cartItems
            }
            console.log(order)
        }
        else {
            const { setAuthDialog } = useAuthStore()
            setAuthDialog('login')
        }
    }

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
        isLoadingOrders,
        courier,
        payment,
        handleCheckout
    }
  })
