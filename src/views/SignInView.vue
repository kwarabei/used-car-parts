<template>
  <form class="w-50 ma-md-4">
    <v-text-field
      type="email"
      required
      :error-messages="emailErrorMsg"
      v-model="email"
      label="Электронная почта"
    >
    </v-text-field>
    <v-text-field
      type="password"
      required
      :error-messages="passwordErrorMsg"
      v-model="password"
      label="Пароль"
    >
    </v-text-field>
    <v-btn class="mt-md-2" @click="handleSignIn">Войти в профиль</v-btn>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useSignInEmailPassword } from "@nhost/vue";
import router from "@/router";

const email = ref("");
const password = ref("");

const emailErrorMsg = ref("");
const passwordErrorMsg = ref("");

const rules = computed(() => ({
  password: {
    required,
  },
  email: {
    required,
  },
}));

const v$ = useVuelidate(rules, { password, email });

const { signInEmailPassword } = useSignInEmailPassword();

const handleSignIn = async (e: MouseEvent) => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    if (v$.value.email.$error) {
      emailErrorMsg.value = "Некорректный электронный адрес";
    }
    if (v$.value.password.$error) {
      passwordErrorMsg.value = "Некорректный пароль";
    }

    return;
  }

  const { isSuccess, isError, error } = await signInEmailPassword(email, password);

  if (isError) {
    console.log(error);
  }

  if (isSuccess) {
    router.replace("/");
  }
};
</script>

<style scoped></style>
