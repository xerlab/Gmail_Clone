<script setup>
import { Icon } from '@iconify/vue';
import Topmenu from './components/Topmenu.vue'
import LeftNavbar from './components/LeftNavbar.vue'
import RightMenu from './components/RightMenu.vue'
import compose from './components/compose.vue';
import { onMounted, ref } from 'vue';
import Middle_area from './components/Middle_area.vue'


</script>

<template>
  <div class="bg-[#F6F8FC] flex flex-col font-sans ">
    <Topmenu />
    <div id="container" class=" flex flex-row justify-center relative ">
      <LeftNavbar />
      <compose />
      <Middle_area />
      <RightMenu />
    </div>
  </div>
</template>
