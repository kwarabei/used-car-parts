<template>
  <div>
    <v-img :src="pic" width="300" :aspect-ratio="16 / 9" cover></v-img>
    <div class="mb-md-4">
      <div class="text-h4">{{ title }}</div>
      <div class="text-body-1">{{ description }}</div>
      <v-divider color="black" thickness="1"></v-divider>
      <p class="text-left text-body-1">Цена:</p>
      <p class="text-left text-decoration-underline">{{ price }} рублей</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  pic: string;
  title: string;
  description: string;
  price: number;
}>();
</script>

<style scoped></style>
