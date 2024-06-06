<template>
  <div
    class="bg-white flex-grow w-[calc(100%-7rem)] rounded-2xl overflow-hidden h-[55rem] overflow-y-scroll"
  >
    <!-- <Message_Container /> -->
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Message_Container from "./Message_Container.vue";
</script>
