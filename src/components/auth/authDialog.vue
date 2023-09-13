<template>
    <v-row justify="center">
        <v-dialog v-model="showAuthDialog" width="500" height="600">
            <v-card>
                <v-card-text>
                    <v-container>
                       <LoginDialog :authLoading="authLoading" @emitShowRegister="showDialogs" v-if="showLogin"/>
                       <RegisterDialog  @emitShowLogin="showDialogs" v-if="showRegister"/>
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
var { showAuthDialog,showLogin,showRegister,authLoading  } = storeToRefs(useAuthStore())

const showDialogs = () =>{
    showLogin.value = showLogin.value ? false : true
    showRegister.value = showRegister.value ? false : true
}

</script>
