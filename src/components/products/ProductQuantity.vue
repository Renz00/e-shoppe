<template>
    <v-btn variant="text" icon="mdi-minus" @click.prevent="decQuantity(productId)"></v-btn>
        <div style="width: 40px;" class="d-flex justify-center align-center text-subtitle-2">{{ count }}</div>
    <v-btn variant="text" icon="mdi-plus" @click.prevent="incQuantity(productId)"></v-btn>
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
    itemPrice: Number,
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
      val.count = count.value
      val.total_price = val.price * count.value
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
