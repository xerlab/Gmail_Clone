<template>
  <div id="navbar" class="bg-[#F6F8FC] flex px-3 ">

    <div class="flex justify-start w-full">
      <!-- Left side of nav -->
      <div class="flex items-center gap-4 w-60 ">
        <div @click="LeftNavbar_open = !LeftNavbar_open"
          class="flex items-center justify-center p-3 rounded-full hover:bg-gray-200 ">
          <Icon icon="mdi:hamburger-menu" style="color: gray; font-size: 1.5rem;" />
        </div>

        <img src="@/assets/Gmail_logo.png" alt="">
      </div>

      <!-- Search bar -->
      <div id="search_bar"
        class="bg-[#EAF1FC] w-2/5 p-1 px-2 m-2 rounded-full flex justify-between gap-2 focus-within:bg-white focus-within:shadow-md">
        <div class="flex gap-2 w-full">
          <div class="flex gap-1 items-center justify-center p-2 rounded-full hover:bg-[#DDE3EC] ">
            <Icon icon="mdi:search" style="color: black; font-size: 1.5rem;" />
          </div>
          <input type="text" placeholder="Search mail"
            class="bg-transparent outline-none w-full placeholder:text-gray-600 border-transparent">
        </div>
        <div class="flex gap-1 items-center justify-center p-2 rounded-full hover:bg-[#DDE3EC] ">
          <Icon icon="mdi:tune" style="color: black; font-size: 1.5rem;" />
        </div>
      </div>
    </div>

    <!-- Right side of nav -->
    <div class="flex gap-1 items-center ">
      <div class="flex gap-1 items-center justify-center p-2 rounded-full hover:bg-gray-200">
        <Icon icon="mdi:help-circle-outline" style="color: #5F6368; font-size: 1.5rem;" />
      </div>

      <div class="flex gap-1 items-center justify-center p-2 rounded-full hover:bg-gray-200">
        <Icon icon="mdi:settings-outline" style="color: #5F6368; font-size: 1.5rem;" />
      </div>

      <div class="flex gap-1 items-center justify-center p-2 rounded-full hover:bg-gray-200">
        <Icon icon="mdi:apps" style="color: #5F6368; font-size: 1.5rem;" />
      </div>

      <div class="rounded-full overflow-hidden w-9 ml-2"><img src="https://randomuser.me/api/portraits/men/20.jpg"
          alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { useGmailStore } from '@/stores/gmail'
import { storeToRefs } from 'pinia'
const store = useGmailStore()
const { LeftNavbar_open } = storeToRefs(store)

</script>