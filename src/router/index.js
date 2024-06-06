import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import Open_message from "@/views/Open_message.vue";
import Message_Container from "@/components/Message_Container.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home", // Corrected: Provide a string value representing the name of the route
      component: () => import("../components/Message_Container.vue"),
    },
    {
      path: "/:filter?",
      name: "Messages", // Corrected: Provide a string value representing the name of the route
      component: () => import("../components/Message_Container.vue"),
    },
    {
      path: "/messageid/:messageId?",
      name: "openmessage", // Corrected: Provide a string value representing the name of the route
      component: () => import("../views/Open_message.vue"),
    },
  ],
});

export default router;
