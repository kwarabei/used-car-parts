import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

import { NhostClient } from "@nhost/vue";

import { createApolloClient } from "@nhost/apollo";
import { DefaultApolloClient } from "@vue/apollo-composable";

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION,
});

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const apolloClient = createApolloClient({ nhost });

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(nhost);
app.provide(DefaultApolloClient, apolloClient);

app.mount("#app");
