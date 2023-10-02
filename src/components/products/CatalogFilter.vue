<template>
      <v-btn
          id="filter-activator"
          variant="outlined"
          block
        >
          Filters
          <v-icon icon="mdi-filter"></v-icon>
        </v-btn>
        <v-menu activator="#filter-activator" width="300" :close-on-content-click="false">
            <div>
                <FilterMenu/>
            </div>
            
        </v-menu>
</template>

<script setup>
import FilterMenu from './FilterMenu.vue'
</script>