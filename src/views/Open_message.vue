<template>
  <!-- Top Filters -->
  <div class="flex items-center justify-between px-2 pt-2 pb-3 sticky top-0  z-10 w-full bg-white "
    :class="scrolling ? 'border-b-2 border-zinc-200 shadow-md' : ''">

    <!-- Left filter of messages area -->
    <div class="flex items-center justify-between w-fit ">
      <div class="flex gap-1 items-center justify-center p-3 rounded-full hover:bg-gray-100 mr-4">
        <Icon icon="mdi:arrow-left" style="color: #5F6368; font-size: 1.1rem;" />
      </div>
      <div class="flex gap-1 items-center justify-center p-3 rounded-full hover:bg-gray-100">
        <Icon icon="mdi:star-outline" style="color: #5F6368; font-size: 1.1rem;" />
      </div>
      <div class="flex gap-1 items-center justify-center p-3 rounded-full hover:bg-gray-100">
        <Icon icon="mdi:box-download" style="color: #5F6368; font-size: 1.1rem;" />
      </div>
      <div class="flex gap-1 items-center justify-center p-3 rounded-full hover:bg-gray-100">
        <Icon icon="mdi:delete-outline" style="color: #5F6368; font-size: 1.1rem;" />
      </div>
    </div>

    <!-- Right filter of message area -->
    <div class="px-4">
      <p class="text-xs font-light text-zinc-700">1-50 of 200</p>
    </div>
  </div>



  <!-- Mesages Area -->
  <div class="w-full mt-12 text-sm mx-8 h-1/2">
    <!-- Text block -->
    <div class="flex h-full">
      <div class="w-1/12 ">
        <div class="w-14 h-14 bg-red-700 m-auto mt-6 rounded-full"></div>
      </div>
      <div class="px-6 py-6">
        <p class="font-medium text-xl pb-1">This is the message header</p>
        <p class="font-thin text-xs text-gray-500 mb-4">sent at 23 May, 2024 ( 08:23 AM )</p>
        <p class="font-normal text-sm text-gray-800 w-4/5 h-full">Lorem ipsum dolor sit, amet consectetur adipisicing
          elit.
          Dolores similique temporibus doloremque placeat? Numquam consectetur tempora sit modi, dignissimos aut
          placeat hic earum aliquid explicabo eaque dolor quae ex corrupti ab eum laboriosam tenetur adipisci veniam
          nesciunt molestiae. Cupiditate ipsam voluptates obcaecati, maxime ipsum voluptatum dignissimos illum
          expedita vitae sapiente.</p>
        <br>
        <hr>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import message from '../components/message.vue'
const scrolling = ref(false)
</script>