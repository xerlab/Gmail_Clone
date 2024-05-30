<template>
  <div v-if="Compose_open" class="fixed bottom-0 right-20 flex justify-end z-20 ">

    <div class=" bg-gray-50 shadow-2xl mx-1 rounded-t-xl overflow-hidden border border-gray-300"
      :class="Compose_minimize ? 'w-80' : 'w-[33rem]'">
      <!-- Header of the message -->
      <div class="px-3 py-2 flex justify-between "
        :class="Compose_minimize ? 'bg-blue-600 text-white' : 'bg-zinc-200 text-black'">
        <p class="text-sm">New Message</p>
        <div class="flex items-end justify-around w-16">
          <Icon @click="Compose_minimize = !Compose_minimize" icon="mdi:window-minimize"
            style="color: black; font-size: .7rem;" class="hover:opacity-40" />
          <Icon icon="mdi:arrow-expand" style="color: black; " class="hover:opacity-40" />
          <Icon @click="saveDraft" icon="mdi:close" style="color: black;" class="hover:opacity-40" />
        </div>
      </div>

      <!-- content of the message -->
      <div v-if="!Compose_minimize" class="flex flex-col m-2 text-sm text-gray-800 ">
        <div class="flex border-b-2 py-1">
          <p v-show="show_guide" class="pr-2">To <span> </span></p> <input v-model="Recipient"
            @focus="show_guide = true" @blur="show_guide = false" type="text"
            :placeholder="show_guide ? '' : 'Recipients'" class="outline-none bg-transparent">
        </div>
        <div class="border-b-2 py-1"> <input v-model="message_subject" type="text" placeholder="Subject"
            class="outline-none w-full bg-transparent">
        </div>
        <div class="py-3 px-1 h-full ">
          <textarea v-model="message_content"
            class="outline-none w-full max-h-[30rem] min-h-[20rem] text- bg-transparent pr-16 h-full"
            rows="20"> </textarea>
        </div>
        <hr>
        <div class="flex items-center justify-between px-2 py-3">

          <div class="flex ">
            <button @click="sendMessage"
              class="bg-[#075ccc] text-white pl-4 pr-3 py-2 w-fit rounded-l-3xl border-r hover:bg-sky-600">Send</button>
            <button class="bg-[#075ccc] text-white pr-2 pl-1 py-2 w-fit rounded-r-3xl hover:bg-sky-600">
              <Icon icon="mdi:chevron-down" style="color: white; font-size: 1.25rem;" />
            </button>
          </div>
          <Icon icon="mdi:trash-can-outline" style="color: gray; font-size: 1.25rem;" />
        </div>
      </div>

    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
const show_guide = ref(false)
const Recipient = ref('')
const message_content = ref('')
const message_subject = ref('')
const Compose_minimize = ref(false)

import { useGmailStore } from '@/stores/gmail'
import { storeToRefs } from 'pinia'
import { addDoc, deleteDoc, updateDoc, doc, collection, onSnapshot, where } from 'firebase/firestore';
import { db } from '../Backend/Firebase'

const store = useGmailStore()
const { LeftNavbar_open, Compose_open } = storeToRefs(store)



function getCurrentTimestamp() {
  const now = new Date();
  const seconds = Math.floor(now.getTime() / 1000);
  const nanoseconds = (now.getTime() % 1000) * 1e6;

  return {
    seconds: seconds,
    nanoseconds: nanoseconds,
  };
}

const currentTimestamp = getCurrentTimestamp();
console.log(currentTimestamp);


const sendMessage = async () => {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "messages"), {
    Sender: Recipient.value,
    Recipient: "xer",
    Content: {
      Subject: message_subject.value,
      Body: message_content.value
    },
    Read: false,
    Status: {
      Archive: false,
      Snooze: false,
      Star: false
    },
    Date: currentTimestamp
  });
  console.log("Document written with ID: ", docRef.id);
  console.log(Recipient.value, message_subject.value, message_content.value)
}


const saveDraft = async () => {
  Compose_open.value = false
  // Add a new document with a generated id.
  if (Recipient.value !== '' || message_content.value !== '' || message_subject.value !== '') {
    const docRef = await addDoc(collection(db, "drafts"), {
      Sender: Recipient.value,
      Recipient: "xer",
      Content: {
        Subject: message_subject.value,
        Body: message_content.value
      },
      Read: false,
      Status: {
        Archive: false,
        Snooze: false,
        Star: false
      },
      Date: currentTimestamp
    });
    console.log("Document written with ID: ", docRef.id);
  }
  console.log(Recipient.value, message_subject.value, message_content.value)
}

</script>