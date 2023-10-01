// Utilities
import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
// import {  } from "@/http/order-api"
import { useCryptStore } from '@/store/crypt-store'
import { useAuthStore } from '@/store/auth-store'
import { useProductStore } from '@/store/product-store'

export const useOrderStore = defineStore("orderStore", () => {
    const { encryption, getUserData } = useCryptStore()
    const orders = ref([])
    const orderTotalItemQuantity = ref(0)
    const orderSubTotal = ref(0)
    const orderTotalDiscount = ref(0)
    const orderGrandTotal = ref(0)
    const deliveryAddress = ref({})
    const vouchers = ref({})
    const courier = ref(null)
    const payment = ref(null)
    const isLoadingOrders = ref(false)

    const setRunningTotal = () =>{
      const { cartItemCount, cartItems } = storeToRefs(useProductStore())
      if (cartItemCount.value>0){
        let cart = cartItems.value
        let count = 0
        let total = 0
        let discount = 0
        cart.map((val, i)=>{
          total += val.price
          discount += val.discount
          count += val.count
        })
        orderTotalItemQuantity.value = count
        orderSubTotal.value = total
        orderTotalDiscount.value = (discount/100)*total
        orderGrandTotal.value = total - discount
      }
      else {
        console.log('cartItems is null')
      }
    }

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
        orderTotalItemQuantity,
        orderSubTotal,
        orderTotalDiscount,
        orderGrandTotal,
        setRunningTotal,
        handleCheckout
    }
  })
