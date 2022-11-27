<template>
  <div class="float-left mr-4" v-if="result && result.user">
    <v-img src="https://picsum.photos/200" :width="200"></v-img>
    <div>Имя:</div>
    <div>{{ result.user.displayName }}</div>
  </div>
  <v-card class="w-35 float-left" v-if="result && result.user">
    <v-tabs v-model="soldParts" bg-color="primary">
      <v-tab :value="false">Активные</v-tab>
      <v-tab :value="true">Архив</v-tab>
    </v-tabs>
    <v-window v-model="soldParts">
      <v-window-item :value="false">
        <UserPart
          class="user_part"
          @click="openPartPage(i.id)"
          v-for="i in filteredParts(result.user.parts, false)"
          :key="i.id"
          :pic="i.pic"
          :title="i.title"
          :description="i.description"
          :price="i.price"
        ></UserPart>
      </v-window-item>
      <v-window-item :value="true">
        <UserPart
          class="user_part"
          @click="openPartPage(i.id)"
          v-for="i in filteredParts(result.user.parts, true)"
          :key="i.id"
          :pic="i.pic"
          :title="i.title"
          :description="i.description"
          :price="i.price"
        ></UserPart>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import { gql } from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { UserPart } from "@/components";
import router from "@/router";

const route = useRoute();

const soldParts = ref(false);

const GET_USERINFO_QUERY = gql`
  query GetUserInfo($id: uuid!) {
    user(id: $id) {
      id
      displayName
      parts {
        id
        title
        description
        price
        pic
        isSold
      }
    }
  }
`;

const filteredParts = (parts: any, sold: boolean) => {
  return parts.filter((part: any) => part.isSold === sold);
};

const openPartPage = (id: string) => {
  router.push({ name: "part", params: { id: id } });
};

const { result, loading, onError, refetch } = useQuery(GET_USERINFO_QUERY, {
  id: route.params.id,
});
</script>

<style scoped>
.user_part:hover {
  cursor: pointer;
  background-color: lightgrey;
}
</style>
