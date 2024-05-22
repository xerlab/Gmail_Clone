<template>
  <!-- <div @scroll="scrolling = true" @mouseleave="scrolling = false"
    class="bg-white flex-grow w-[calc(100%-7rem)] rounded-2xl  overflow-hidden h-[55rem] overflow-y-scroll">



  </div> -->


  <!-- Top Filters -->
  <div class="flex items-center justify-between px-2.5 pt-3 pb-3 sticky top-0  z-10 w-full bg-white "
    :class="scrolling ? 'border-b-2 border-zinc-200 shadow-md' : ''">

    <!-- Left filter of messages area -->
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-center">
        <div class="flex p-2.5 px-2 mr-1 hover:bg-gray-100 rounded-md gap-1">
          <Icon icon="mdi:check-box-outline-blank" style="color: #5F6368; font-size: 1.25rem;" />
          <div class="flex items-center justify-center rounded-md hover:bg-gray-300 ">
            <Icon icon="mdi:chevron-down" />
          </div>
        </div>
      </div>
      <div class="flex gap-1 items-center justify-center p-3 rounded-full hover:bg-gray-100 ">
        <Icon icon="mdi:reload" />
      </div>
      <div class="flex gap-1 items-center justify-center p-3 rounded-full hover:bg-gray-100">
        <Icon icon="mdi:more-vert" />
      </div>

    </div>

    <!-- Right filter of message area -->
    <div class="">
      <p class="text-xs font-light text-zinc-700">1-50 of 200</p>
    </div>
  </div>



  <!-- Mesages list -->
  <div class="w-full mt-12 text-sm">
    <!-- message item -->
    <message v-for="x in 30" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import message from '../components/message.vue'
const scrolling = ref(false)
</script>