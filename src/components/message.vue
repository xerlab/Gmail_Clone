<template>
  <div @mouseenter="hovered = true" @mouseleave="hovered = false"
    class="hover:shadow-md flex items-center gap-3 px-2 border-b">
    <div class="flex items-center gap-2 justify-center">
      <div class="flex items-center justify-center p-2.5 rounded-full hover:bg-gray-100 ">
        <Icon icon="mdi:check-box-outline-blank" style="font-size: 1.25rem;"
          :style="hovered ? 'color: #5F6368;' : 'color:#BFBFBF;'" />
      </div>
      <div class="flex items-center justify-center p-2.5 rounded-full hover:bg-gray-100 ">
        <Icon icon="mdi:star-outline" style=" font-size: 1.25rem;"
          :style="hovered ? 'color: #5F6368;' : 'color:#BFBFBF;'" />
      </div>

    </div>
    <p class="truncate font-medium w-32 pr-4 flex-shrink-0">Kevin powell</p>
    <p class="truncate font-light flex-grow text-gray-500 ">
      <span class="font-medium text-black pr-2">this is the message title</span>
      <span>- </span>
      Lorem, ipsum dolor sit
      amet consectetur adipisicing elit. Ea optio porro inventore temporibus, eos,
      sequi vitae doloremque quibusdam impedit eligendi corrupti possimus quasi. Cupiditate ratione dolorum
      magnam quaerat repellat dignissimos.
    </p>
    <div class="justify-end mr-1 ml-3" :class="hovered ? 'w-48' : 'min-w-14'">
      <div v-if="hovered" class="flex items-center justify-end gap-1 ">
        <div class="flex  items-center justify-center p-2.5 rounded-full hover:bg-gray-100 ">
          <Icon icon="mdi:archive-arrow-down-outline" style="color: #5F6368; font-size: 1.25rem;" />
        </div>
        <div class="flex  items-center justify-center p-2.5 rounded-full hover:bg-gray-100 ">
          <Icon icon="mdi:trash-can-outline" style="color: #5F6368; font-size: 1.25rem;" />
        </div>
        <div class="flex  items-center justify-center p-2.5 rounded-full hover:bg-gray-100 ">
          <Icon icon="mdi:email-open-outline" style="color: #5F6368; font-size: 1.25rem;" />
        </div>
        <div class="flex  items-center justify-center p-2.5 rounded-full hover:bg-gray-100 ">
          <Icon icon="mdi:clock-outline" style="color: #5F6368; font-size: 1.25rem;" />
        </div>
      </div>
      <p v-else class="font-medium text-xs text-end">May 19</p>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
const hovered = ref(false)
</script>


<!-- Note: I used padding of icons to set the height of the cell of message in list , when padding of icons is removed the cell height will shrink -->
<!-- <div class="flex gap-1 items-center justify-center p-2.5 rounded-full hover:bg-gray-100 "></div> -->