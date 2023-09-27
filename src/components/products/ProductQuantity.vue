<template>
    <v-btn variant="text" icon="mdi-minus" @click.prevent="decQuantity(productId)"></v-btn>
        <div style="width: 40px;" class="d-flex justify-center align-center text-subtitle-2">{{ count }}</div>
    <v-btn variant="text" icon="mdi-plus" @click.prevent="incQuantity(productId)"></v-btn>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
    itemCount: Number,
    productId: Number
})

const count = ref(1)

const incQuantity = () =>{
    if (count.value<100){
      count.value++
    }
}
  
const decQuantity = () =>{
    if (count.value>1){
      count.value--
    }
}

onMounted(()=>{
    if (props.itemCount != null){
        count.value = props.itemCount
    }
})

</script>