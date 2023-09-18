<template>
      <v-btn
          id="filter-activator"
          width="100%"
          variant="outlined"
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