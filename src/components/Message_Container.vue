<template>
  <!-- <div @scroll="scrolling = true" @mouseleave="scrolling = false"
    class="bg-white flex-grow w-[calc(100%-7rem)] rounded-2xl  overflow-hidden h-[55rem] overflow-y-scroll">



  </div> -->


  <!-- Top Filters -->
  <div class="flex items-center justify-between px-2.5 pt-3 pb-3 sticky top-0  z-10 w-full bg-white "
    :class="scrolling ? 'border-b-2 border-zinc-200 shadow-md' : ''">

    <!-- Left filter of messages area -->
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-center relative">
        <div class="flex p-2.5 px-2 mr-1  rounded-md gap-1"
          :class="selectAll || showSelectMenu ? 'bg-gray-200' : 'hover:bg-gray-100'">
          <div @click="toggleAllselected" class="">
            <Icon :icon="selectAll ? 'mdi:checkbox-blank-badge-outline' : 'mdi:check-box-outline-blank'"
              style="color: #5F6368; font-size: 1.25rem;" />
          </div>
          <div class="flex items-center justify-center rounded-md "
            :class="showSelectMenu ? 'bg-gray-300' : 'hover:bg-gray-300'">
            <Icon @click="showSelectMenu = !showSelectMenu" icon="mdi:chevron-down" />
            <div v-if="showSelectMenu"
              class="bg-white rounded-xl border border-slate-300 absolute left-8 top-7 flex flex-col items-center text-sm overflow-hidden py-2">
              <div v-for="x in ['All', 'Read', 'UnRead', 'Starred', 'Snoozed', 'Archived', 'None']"
                @click="toggleSelections(x)"
                class="hover:bg-gray-200 text-gray-600 hover:text-gray-800 cursor-pointer w-full pl-4 pr-12 py-2">{{ x
                }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-1 items-center justify-center p-3 rounded-full hover:bg-gray-100 ">
        <Icon icon="mdi:reload" />
      </div>
      <div @click="gmailStore.toggleAllRead"
        class="flex gap-1 items-center justify-center p-3 rounded-full hover:bg-gray-100">
        <Icon icon="mdi:more-vert" />
      </div>
      <div v-show="gmailStore.SelectedMessages.length" @click="gmailStore.deleteSelectedMessages"
        class="flex gap-1 items-center justify-center p-3 rounded-full hover:bg-gray-100 ">
        <Icon icon="mdi:trash-can-outline" style="color:#5F6368; font-size: 1.12rem;" />
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
    <message v-if="loaded" v-for="xmessage in MessageList" :key="xmessage.id" :mprop="xmessage"
      :xselected="gmailStore.SelectedMessages.includes(xmessage.id)" />
    <div v-else class="bg-red-400 p-4">loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Icon } from '@iconify/vue';
import message from '../components/message.vue'
import { useGmailStore } from '@/stores/gmail'
import { storeToRefs } from 'pinia';
const isloaded = ref(false)
const selectAll = ref(false)
const showSelectMenu = ref(false)
// const loaded = ref(false)

const gmailStore = useGmailStore()
const { MessageList, loaded } = storeToRefs(gmailStore)
const { getMailsByRecipient } = gmailStore

const scrolling = ref(false)

onMounted(() => {
  getMailsByRecipient()
  console.log("mounted")
})


const toggleAllselected = () => {
  if (!selectAll.value) gmailStore.selectAllMessages()
  else gmailStore.unselectAllMessages()
  selectAll.value = !selectAll.value
}


const toggleSelections = (x) => {
  gmailStore.customSelection(x)
  showSelectMenu.value = !showSelectMenu.value

}
</script>