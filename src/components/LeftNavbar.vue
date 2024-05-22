<template>
  <!-- The left navbar side -->
  <div @mouseenter="show_menu = true" @mouseleave="show_menu = false" class="bg-[#F6F8FC] transition-all duration-300"
    :class="(show_menu || LeftNavbar_open) ? 'w-72' : 'w-[4.7rem]'">
    <div class=" flex flex-col items-start py-2 pr-4">
      <div @click="Compose_open = true"
        class="flex items-center justify-start px-4 py-4 gap-4 bg-sky-200 rounded-2xl mb-4 ml-2  hover:shadow-md hover:cursor-pointer">
        <Icon icon="mdi:pencil" style="color: black; font-size: 1.5rem;" />
        <p v-if="show_menu || LeftNavbar_open" class="font-medium text-sm pr-3">Compose</p>
      </div>


      <!-- Menu list -->
      <div v-for="item in menuItems" :key="item.text" @click="clicked = item.text"
        class="flex items-center justify-start gap-5 px-4 pl-6 hover:cursor-pointer hover:bg-gray-200 w-full py-1.5 rounded-r-full hover:cursor-pointer"
        :class="clicked === item.text ? 'bg-[#D3E3FD]' : ''">
        <Icon :icon="clicked === item.text ? item.icon2 : item.icon1" style="color: black; font-size: 1.25rem;" />
        <p v-if="show_menu || LeftNavbar_open" class="text-sm">{{ item.text }}</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
const show_menu = ref(false)
const clicked = ref(false)

import { useGmailStore } from '@/stores/gmail'
import { storeToRefs } from 'pinia'
const store = useGmailStore()
const { LeftNavbar_open, Compose_open } = storeToRefs(store)

const menuItems = [
  { icon1: 'mdi:inbox', icon2: 'mdi:inbox-arrow-down', text: 'Inbox' },
  { icon1: 'mdi:star-outline', icon2: 'mdi:star', text: 'Starred' },
  { icon1: 'mdi:clock-outline', icon2: 'mdi:clock', text: 'Snoozed' },
  { icon1: 'mdi:send-variant-outline', icon2: 'mdi:send-variant', text: 'Sent' },
  { icon1: 'mdi:file-document-outline', icon2: 'mdi:file-document', text: 'Drafts' },
  { icon1: 'mdi:chevron-down', icon2: 'mdi:chevron-up', text: 'More' }
];
</script>