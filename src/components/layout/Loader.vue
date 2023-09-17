<template>
   <v-sheet height="700" v-if="isLoadingProducts">
            <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                color="primary"
                size="large"
                indeterminate
                ></v-progress-circular>
            </div>
        </v-sheet>
</template>

<script setup>

const props = defineProps({
  isLoadingProducts: Boolean
})
</script>
