<template>
     <div class="pb-3" v-if="showAuthErrors">
          <v-alert class="py-1 my-1" closable color="error">
            <template v-slot:prepend>
                <div class="pt-1">
                    <v-icon icon="mdi-alert-circle"></v-icon>
                </div>
            </template>
            <template v-slot:title>
                <ul class="py-1 my-1">
                    <li class="text-body-2" v-for="(error, key) in errors" :key="key">{{ error }}</li>
                </ul>
            </template>
          </v-alert>
      </div>
</template>

<script setup>
    const props = defineProps({
        showAuthErrors: Boolean,
        errors: Object
    })
</script>
