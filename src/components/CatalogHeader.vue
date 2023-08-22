<template>
  <div>
    <span class="text-h4 mr-3">I'm looking for <span id="menu-activator4">{{ category }} <v-icon icon="mdi-triangle-small-down"></v-icon></span></span>
        <v-menu activator="#menu-activator4">
          <v-list>
            <v-list-item @click="emit('emitSetCategory', 'Everything')" link>
              <v-list-item-title>Everything</v-list-item-title>
            </v-list-item>
            <v-list-item @click="emit('emitSetCategory', 'Women\'s Dresses')" link>
              <v-list-item-title>Women's Dresses</v-list-item-title>
            </v-list-item>
            <v-list-item @click="emit('emitSetCategory', 'Men\'s Shirts')" link>
              <v-list-item-title>Men's Shirts</v-list-item-title>
            </v-list-item>
            <v-list-item @click="emit('emitSetCategory', 'Kids Apparel')" link>
              <v-list-item-title>Kids Apparel</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-chip-group class="mt-2">
          <v-chip
          link
          >
            Top Sales
          </v-chip>
          <v-chip
          link
          >
            Top Ratings
          </v-chip>
          <v-chip
          link
          >
            Discounts
          </v-chip>
        </v-chip-group>
  </div>
</template>

<script setup>

const props = defineProps({
    category: String,
})

const emit = defineEmits(['emitSetCategory'])

</script>
