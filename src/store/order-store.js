// Utilities
import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import router from '@/router'
import { showOrder, storeOrder, cancelOrder, userOrders } from "@/http/order-api"
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
    const fullDeliveryAddress = ref('')
    const deliveryAddress = ref({
      'address1': '',
      'address2': '',
      'zipcode': '',
      'notes': ''
    })
    const vouchers = ref({
      'shipping_discount': 0,
      'price_discount':0,
      'name': ''
    })
    const courier = ref({
      'name': '',
      'price': 0,
      'id': 0
    })
    const payment = ref({
      'name': '',
      'id': 0
    })
    const isLoadingOrders = ref(false)
    const checkoutOverlay = ref(false)

    const setFullDeliveryAddress = (address) =>{
        fullDeliveryAddress.value = `${address.address1}, ${address.address2}`
    }

    const setRunningTotal = () =>{
      const { cartItemCount, cartItems } = storeToRefs(useProductStore())
      if (cartItemCount.value>0){
        itemCategories.value = []
        let count = 0
        let subtotal_price = 0
        let courier_price = 0
        let grand_total = 0

        //If a courier exists, set value for courier_price
         if (courier.value.name!=''){
          const courierObj = courier.value
          courier_price = courierObj.price
        }

        cartItems.value.map((val, i)=>{
          //Loop through each item in cart
          subtotal_price += val.total_price
          count += val.count
        })
       
        //If a voucher exists, computed the discount price and deduct it from total price
        if (vouchers.value.name!='' && vouchers.value.name!='None'){
          const voucherObj = vouchers.value
          let voucherDiscPrice = 0
          //If Voucher type is shipping discount
          if (voucherObj.shipping_discount>0){
            //Added this if statement because 100/100 is equal to 0 in js for some dumb reason
            if (voucherObj.shipping_discount==100){
              voucherDiscPrice = courier_price
            }
            else {
              voucherDiscPrice = Math.abs(((voucherObj.shipping_discount/100)*courier_price)-courier_price)
            }
            courier_price -= voucherDiscPrice
            grand_total = subtotal_price
          }
          //Else Voucher type is price discount
          else if (vouchers.value.price_discount>0) {
            //Added this if statement because 100/100 is equal to 0 in js for some dumb reason
            if (voucherObj.shipping_discount==100){
              voucherDiscPrice = subtotal_price
            }
            else {
              voucherDiscPrice = Math.abs(((voucherObj.price_discount/100)*subtotal_price)-subtotal_price)
            }
            grand_total = subtotal_price - voucherDiscPrice
          }
          //Setting a value for order discount price
          orderTotalDiscount.value = voucherDiscPrice
        }
        else {
          //If voucher does not exist, set total discount to 0
          orderTotalDiscount.value = 0
          grand_total = subtotal_price
        }
        //Adding the courier price to the grand total. 
        //If Free shipping voucher is selected, courier price will be 0
        grand_total += courier_price
        orderShippingPrice.value = courier_price
        orderTotalItemQuantity.value = count
        //Uning Math.abs to prevent negative number values
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
                    //Convert delivery address object to a json string
                    "voucher": JSON.stringify(vouchers.value),
                    "discount": orderTotalDiscount.value,
                    "courier": JSON.stringify(courier.value),
                    "shipping_price": orderShippingPrice.value,
                    "payment_method": JSON.stringify(payment.value),
                    "delivery_address": JSON.stringify(deliveryAddress.value)
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
      orders.value = []
      const userData = getUserData()
      const { data } = await showOrder(orderId, userData.token)

      if (data.order!=null){
        orders.value = data.order[0]
        orderProducts.value = data.order_products
        console.log(orderProducts.value)
        //Converting JSON string to Object
        deliveryAddress.value = JSON.parse(orders.value.order_delivery_address)
        setFullDeliveryAddress(deliveryAddress.value)
        courier.value = JSON.parse(orders.value.order_courier)
        vouchers.value = JSON.parse(orders.value.order_voucher)
        payment.value = JSON.parse(orders.value.order_payment_method)
        //Setting values for Order Summary 
        orderTotalItemQuantity.value = orders.value.item_count
        orderSubTotal.value =  orders.value.order_sub_total
        orderTotalDiscount.value = orders.value.order_discount
        orderShippingPrice.value = orders.value.order_shipping_price
        orderGrandTotal.value = orders.value.order_grand_total
        isLoadingOrders.value = false
      }
    }

    const handleUserOrders = async(orderStatus) =>{
      isLoadingOrders.value = true
      const statusSlug = orderStatus.replace(' ', '-')
      const userData = getUserData()
      const { data } = await userOrders(statusSlug, userData.token)

      if (data.order!=null){
          console.log(data.order)
      }
      else {
        console.log('Error fetching user orders')
      }
      isLoadingOrders.value = false
    }

    const handleCancelOrder = async(orderId) =>{
      isLoadingOrders.value = true
      const userData = getUserData()
      const { data } = await cancelOrder(orderId, userData.token)

      if (data.result == true){
          console.log('order is cancelled')
      }
      else {
        console.log('Error cancel order')
      }
      isLoadingOrders.value = false
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
        fullDeliveryAddress,
        setRunningTotal,
        handleCheckout,
        handleFetchSelectedOrder,
        setFullDeliveryAddress,
        handleCancelOrder,
        handleUserOrders
    }
  })
