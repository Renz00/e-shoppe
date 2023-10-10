<template>
    <v-btn variant="text" icon="mdi-minus" density="compact" @click.prevent="decQuantity(productId)" aria-label="add button"></v-btn>
        <div style="width: 40px;" class="d-flex justify-center align-center text-subtitle-2">{{ count }}</div>
    <v-btn variant="text" icon="mdi-plus" density="compact" @click.prevent="incQuantity(productId)" aria-label="subtract button"></v-btn>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { useOrderStore } from '@/store/order-store'
import { useProductStore } from '@/store/product-store'

const { cartItems, cartItemCount } = storeToRefs(useProductStore())
const { setRunningTotal } = useOrderStore()

const props = defineProps({
    itemCount: Number,
    productId: Number
})

const count = ref(1)

const incQuantity = () =>{
    if (count.value<100){
      count.value++
      cartItemCount.value++
      updateItemCount()
    }
}

const decQuantity = () =>{
    if (count.value>1){
      count.value--
      cartItemCount.value--
      updateItemCount()
    }
}

const updateItemCount = () =>{
  cartItems.value.map((val, i)=>{
    if (val.id == props.productId){
      //Compute the discounted price and subtract it from the original, 
      //then multiply it by the item count to get total price
      const discPrice = Math.abs(((val.discount/100)*val.price)-val.price)
      val.count = count.value
      val.total_price = discPrice*count.value
    }
  })
  setRunningTotal(cartItems.value)
}

onMounted(()=>{
    if (props.itemCount != null){
        count.value = props.itemCount
    }
})

</script>
