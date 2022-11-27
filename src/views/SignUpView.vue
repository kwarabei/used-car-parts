<template>
  <form class="w-50 ma-md-4">
    <v-text-field
      type="text"
      required
      :error-messages="usernameErrorMsg"
      v-model="username"
      label="Название профиля"
    >
    </v-text-field>
    <v-text-field
      type="email"
      required
      :error-messages="emailErrorMsg"
      v-model="email"
      label="Электронная почта"
    >
    </v-text-field>
    <v-text-field
      :type="showPasswd ? 'text' : 'password'"
      required
      :error-messages="passwordErrorMsg"
      v-model="password"
      label="Пароль"
      :append-icon="showPasswd ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPasswd = !showPasswd"
    >
    </v-text-field>
    <v-checkbox label="Я согласен с тем, что БМВ - говно" required></v-checkbox>
    <v-btn class="mt-md-2" @click="handleSignUp">Отправить данные для регистрации</v-btn>
  </form>
  <v-snackbar v-model="errNotification" :timeout="3000">
    Ошибка: {{ requestErrMsg }}
    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="errNotification = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useSignUpEmailPassword } from "@nhost/vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import router from "@/router";

const username = ref("");
const email = ref("");
const password = ref("");

const usernameErrorMsg = ref("");
const emailErrorMsg = ref("");
const passwordErrorMsg = ref("");

const showPasswd = ref(false);

const errNotification = ref(false);
const requestErrMsg = ref("");

const rules = computed(() => ({
  username: {
    required,
  },
  password: {
    required,
  },
  email: {
    required,
  },
}));

const { signUpEmailPassword } = useSignUpEmailPassword();

const v$ = useVuelidate(rules, { username, password, email });

const handleSignUp = async (e: MouseEvent) => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    if (v$.value.username.$error) {
      usernameErrorMsg.value = "Некорректное название профиля";
    }
    if (v$.value.email.$error) {
      emailErrorMsg.value = "Некорректный электронный адрес";
    }
    if (v$.value.password.$error) {
      passwordErrorMsg.value = "Некорректный пароль";
    }

    return;
  }

  const { isSuccess, isError, error } = await signUpEmailPassword(
    email.value,
    password.value,
    {
      metadata: { username: username.value },
    }
  );

  if (isError) {
    console.log(error);
    requestErrMsg.value = error?.message as string;
    errNotification.value = true;
  }

  if (isSuccess) {
    router.replace("/");
  }
};
</script>

<style scoped></style>
