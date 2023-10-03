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
    const orderShippingPrice = ref(0)
    const orderGrandTotal = ref(0)
    const deliveryAddress = ref({})
    const vouchers = ref({})
    const courier = ref({})
    const payment = ref({})
    const isLoadingOrders = ref(false)

    const setRunningTotal = () =>{
      const { cartItemCount, cartItems } = storeToRefs(useProductStore())
      if (cartItemCount.value>0){
        let count = 0
        let subtotal_price = 0
        let courier_price = 0
        let grand_total = 0

        //If a courier exists, set value for courier_price
         if (courier.value.name!=null){
          const cour = courier.value
          courier_price = cour.price
        }

        cartItems.value.map((val, i)=>{
          //Loop through each item in cart
          subtotal_price += val.total_price
          count += val.count
        })
       
        //If a voucher exists, deduct the discount price from total price
        if (vouchers.value.name!=null){
          const vouc = vouchers.value
          let voucherDiscPrice = 0
          if (vouc.shipping_discount>0){
            console.log('shipping discount')
            //Added this if statement because 100/100 is equal to 0 in js for some dumb reason
            if (vouc.shipping_discount==100){
              voucherDiscPrice = courier_price
            }
            else {
              voucherDiscPrice = Math.abs(((vouc.shipping_discount/100)*courier_price)-courier_price)
            }
            courier_price = courier_price - voucherDiscPrice
          }
          else {
            console.log('price discount')
            //Added this if statement because 100/100 is equal to 0 in js for some dumb reason
            if (vouc.shipping_discount==100){
              voucherDiscPrice = subtotal_price
            }
            else {
              voucherDiscPrice = Math.abs(((vouc.price_discount/100)*subtotal_price)-subtotal_price)
            }
          }
          grand_total = subtotal_price - voucherDiscPrice
          orderTotalDiscount.value = voucherDiscPrice
        }
        else {
          orderTotalDiscount.value = 0
          grand_total = subtotal_price
        }
        grand_total += courier_price
        orderShippingPrice.value = courier_price
        orderTotalItemQuantity.value = count
        orderSubTotal.value = Math.abs(subtotal_price)
        orderGrandTotal.value = Math.abs(grand_total)
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
        orderShippingPrice,
        orderGrandTotal,
        setRunningTotal,
        handleCheckout
    }
  })
