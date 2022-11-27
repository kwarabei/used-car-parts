<script setup lang="ts">
import { RouterView } from "vue-router";
import router from "@/router";
import { useAuthenticated, useSignOut, useUserData } from "@nhost/vue";

const userData = useUserData();
console.log(userData);

const isAuthenticated = useAuthenticated();

const { signOut } = useSignOut();

const logout = async () => {
  await signOut();
  isAuthenticated.value = false;
};

const goHome = () => {
  router.push({ name: "parts" });
};
</script>

<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title class="main_logo" @click="goHome">Запчасти.рф </v-app-bar-title>
      <template v-slot:append>
        <div v-if="!isAuthenticated">
          <v-btn class="mr-md-2" variant="outlined" tag="router-link" to="/signin"
            >Вход</v-btn
          >
          <v-btn variant="outlined" tag="router-link" to="/signup">Регистрация</v-btn>
        </div>
        <div v-else>
          <v-btn
            tag="router-link"
            to="/post-part"
            variant="flat"
            color="secondary"
            class="mr-md-2"
            >Разместить объявление</v-btn
          >
          <v-btn tag="router-link" to="/profile" class="mr-md-2" variant="outlined"
            >Личный кабинет</v-btn
          >
          <v-btn @click="logout" variant="outlined">Выйти</v-btn>
        </div>
      </template>
    </v-app-bar>

    <v-navigation-drawer></v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
.main_logo:hover {
  cursor: pointer;
}
</style>
