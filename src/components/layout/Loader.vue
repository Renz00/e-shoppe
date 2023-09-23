<template>
  <v-row class="justify-center fill-height mt-10">
    <v-sheet height="700">
    <v-card class="elevation-2" width="150">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-row class="justify-center align-center">
                <v-progress-circular
                color="primary"
                :size="70"
                :width="8"
                indeterminate
                >
                </v-progress-circular>
              </v-row>
              <v-row class="justify-center align-center pt-5">
                <div class="text-subtitle-2">Please wait...</div>
              </v-row>
            </v-col>
          </v-row>
      </v-container>
      </v-card-text>
    </v-card>

  </v-sheet>
  </v-row>

</template>

<script setup>

</script>
