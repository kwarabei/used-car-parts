import {
  PartsView,
  SignInView,
  SignUpView,
  PartView,
  ProfileView,
  UserView,
  PostPartView,
} from "@/views";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "parts",
      component: PartsView,
    },
    {
      path: "/signin",
      name: "signin",
      component: SignInView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
    {
      path: "/part/:id",
      name: "part",
      component: PartView,
    },
    {
      path: "/user/:id",
      name: "user",
      component: UserView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/post-part",
      name: "postpart",
      component: PostPartView,
    },
  ],
});

export default router;
