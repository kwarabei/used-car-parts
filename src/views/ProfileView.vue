<template>
  <v-img
    class="rounded-circle"
    src="https://picsum.photos/100"
    width="100"
    :aspect-ratio="1"
  >
  </v-img>
  <div class="text-body-1">{{ userData?.displayName }}</div>
</template>

<script setup lang="ts">
import { useUserData } from "@nhost/vue";

const userData = useUserData();
console.log(userData);
</script>

<style scoped></style>
