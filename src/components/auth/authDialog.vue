<template>
    <v-row justify="center">
        <v-dialog v-model="showAuthDialog" width="500" height="500">
            <v-card>
                <v-card-text>
                    <v-container>
                       <LoginDialog @emitShowRegister="showLogin=false, showRegister=true" v-if="showLogin"/>
                       <RegisterDialog v-if="showRegister"/>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import LoginDialog from './LoginDialog.vue';
import RegisterDialog from './RegisterDialog.vue';
import { useAuthStore } from '@/store/auth-store'
var { showAuthDialog,showLogin,showRegister  } = storeToRefs(useAuthStore())

</script>