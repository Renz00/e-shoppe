// Utilities
import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import router from '@/router'
import { showOrder, storeOrder } from "@/http/order-api"
import { useCryptStore } from '@/store/crypt-store'
import { useAuthStore } from '@/store/auth-store'
import { useProductStore } from '@/store/product-store'

export const useOrderStore = defineStore("orderStore", () => {
    const { encryption, getUserData } = useCryptStore()
    const orders = ref([])
    const orderProducts = ref([])
    const itemCategories = ref([])
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
    const checkoutOverlay = ref(false)

    const setRunningTotal = () =>{
      const { cartItemCount, cartItems } = storeToRefs(useProductStore())
      if (cartItemCount.value>0){
        itemCategories.value = []
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

          // //Pushing categories to a new array
          // itemCategories.value.push(val.category)
        })

        // //Removing duplicate categories in the array
        // itemCategories.value = itemCategories.value.filter((item, 
        //   index) => itemCategories.value.indexOf(item) === index); 
       
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
            courier_price -= voucherDiscPrice
            grand_total = subtotal_price
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
            grand_total = subtotal_price - voucherDiscPrice
          }
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
          if (cartItems.length>0 && Object.keys(deliveryAddress.value).length>0){
              const order = {
                "order": {
                    "user_id": userData.id,
                    "item_count": orderTotalItemQuantity.value,
                    "status": 1, // 1 for 'Packing' order status
                    "sub_total": orderSubTotal.value,
                    "grand_total": orderGrandTotal.value,
                    "discount": orderTotalDiscount.value,
                    "courier": courier.value,
                    "payment_method": payment.value,
                    "delivery_address": deliveryAddress.value
                },
                "order_products": cartItems
              }
              const {data} = await storeOrder(order, userData.token)
              if (data.order!=null){
                const id = data.order.id
                router.push({name: 'OrderView', params:{orderId: id}})
              }
            }
            else {
              checkoutOverlay.value = true
              console.log('order data is not complete')
            }
        }
        else {
            const { setAuthDialog } = useAuthStore()
            setAuthDialog('login')
        }
        isLoadingOrders.value = false
    }

    const handleFetchSelectedOrder = async(orderId)=>{
      isLoadingOrders.value = true
      const userData = getUserData()
      const { data } = await showOrder(orderId, userData.token)

      if (data.order!=null){
        orders.value = data.order[0]
        orderProducts.value = data.order_products
        orderTotalItemQuantity.value = orders.value.item_count
        orderSubTotal.value =  orders.value.order_sub_total
        orderTotalDiscount.value = orders.value.order_discount
        orderShippingPrice.value = orders.value.order_courier_price
        orderGrandTotal.value = orders.value.order_grand_total
        isLoadingOrders.value = false
        console.log(orderSubTotal.value)
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
        orderProducts,
        checkoutOverlay,
        itemCategories,
        setRunningTotal,
        handleCheckout,
        handleFetchSelectedOrder
    }
  })
