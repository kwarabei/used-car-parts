<template>
  <p v-if="loading">Loading...</p>
  <ul v-else-if="result && result.parts">
    <v-card
      class="mx-auto my-md-4 pa-md-2 part_card"
      v-for="part in result.parts"
      :key="part.id"
      max-width="500"
      variant="outlined"
      @click="openPartPage(part.id)"
    >
      <v-img :src="part.pic" height="200px" cover></v-img>
      <v-card-title>{{ part.title }}</v-card-title>
      <v-card-subtitle>{{ part.description }}</v-card-subtitle>
      <v-btn @click.stop="handleBuy" variant="outlined" class="mt-md-4 part_btn"
        >Купить</v-btn
      >
    </v-card>
  </ul>
</template>

<script setup lang="ts">
import { gql } from "@apollo/client/core";
import { useQuery } from "@vue/apollo-composable";
import { watch, computed } from "vue";
import router from "@/router";

const GET_PARTS_QUERY = gql`
  query GetParts {
    parts(where: { isSold: { _eq: false } }) {
      id
      title
      description
      price
      pic
    }
  }
`;

const { result, loading, error, onError, refetch } = useQuery(GET_PARTS_QUERY);

const handleBuy = () => {
  // TODO
};

const openPartPage = (partID: string) => {
  router.push({ name: "part", params: { id: partID } });
};
</script>

<style scoped>
.part_card:hover {
  cursor: pointer;
  box-shadow: 3px 3px 2px rgb(64, 64, 64);
}

.part_btn:hover {
  background-color: crimson;
  color: white;
}
</style>
