<template>
  <p v-if="loading">Loading...</p>
  <div
    v-else-if="result && result.parts_by_pk"
    class="d-flex flex-column align-center ma-md-4 w-50"
  >
    <v-img :src="result.parts_by_pk.pic" width="600" :aspect-ratio="16 / 9" cover></v-img>
    <div class="align-self-start mb-md-4">
      <div class="text-h4">{{ result.parts_by_pk.title }}</div>
      <div class="text-body-1">{{ result.parts_by_pk.description }}</div>
      <v-divider color="black" thickness="1"></v-divider>
      <p class="text-left text-body-1">Цена:</p>
      <p class="text-left text-decoration-underline">
        {{ result.parts_by_pk.price }} рублей
      </p>
    </div>
    <div class="align-self-start">
      <div class="text-h4">Продавец:</div>
      <v-img
        @click="openUserPage(result.parts_by_pk.user.id)"
        class="rounded-circle user_avatar"
        src="https://picsum.photos/100"
        width="100"
        :aspect-ratio="1"
      >
      </v-img>
      <div class="text-body-1">{{ result.parts_by_pk.user.email }}</div>
      <v-btn variant="outlined">Связаться с продавцом</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import { gql } from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import router from "@/router";

const route = useRoute();

const GET_PART_QUERY = gql`
  query GetParts($id: bigint!) {
    parts_by_pk(id: $id) {
      id
      title
      description
      price
      pic
      user {
        id
        email
        avatarUrl
      }
    }
  }
`;

const openUserPage = (id: string) => {
  router.push({ name: "user", params: { id: id } });
};

const { result, loading } = useQuery(GET_PART_QUERY, {
  id: route.params.id,
});
</script>

<style scoped>
.user_avatar:hover {
  cursor: pointer;
}
</style>
