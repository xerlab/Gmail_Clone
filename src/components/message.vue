<!-- :class="[Read ? 'bg-[#F2F6FC]' : '', selected ? 'bg-blue-100' : '']" -->
<template>
  <div @mouseenter="hovered = true" @mouseleave="hovered = false"
    class="hover:shadow-md flex items-center gap-3 px-2 border-b "
    :class="(selected) ? 'bg-blue-100' : (Read ? 'bg-gray-50' : '')">
    <div class=" flex items-center justify-center">
      <div @click="toggleSelected" class="flex items-center justify-center p-2.5 rounded-full "
        :class="selected ? 'hover:bg-blue-200' : 'hover:bg-gray-100'">
        <Icon :icon="(selected) ? 'mdi:checkbox-outline' : 'mdi:check-box-outline-blank'" style="font-size: 1.25rem;"
          :style="hovered || selected ? 'color: #5F6368;' : 'color:#BFBFBF;'" />
      </div>
      <div @click="toggleState('Star', Star)" class="flex items-center justify-center p-2.5 rounded-full -ml-2.5"
        :class="selected ? 'hover:bg-blue-200' : 'hover:bg-gray-100'">
        <Icon :icon="Star ? 'mdi:star' : 'mdi:star-outline'" style="font-size: 1.25rem;"
          :style="Star ? 'color:#f3b400;' : (hovered ? 'color: #5F6368;' : 'color:#BFBFBF;')" />
      </div>

    </div>
    <p class="truncate  w-32 pr-4 flex-shrink-0" :class="Read ? 'font-thin text-gray-600' : 'font-medium'">{{
      Sender }}
    </p>
    <p class="truncate font-light flex-grow text-gray-500 ">
      <span class="text-black pr-2" :class="Read ? 'font-thin text-gray-600' : 'font-medium '">{{ Subject }}</span>
      <span>- </span>
      {{ Body }}
    </p>
    <div class="justify-end mr-1 ml-3" :class="hovered ? 'w-48' : 'min-w-14'">
      <div v-if="hovered" class="flex items-center justify-end gap-1 ">
        <div @click="toggleState('Archive', Archive)" class="flex  items-center justify-center p-2.5 rounded-full"
          :class="selected ? 'hover:bg-blue-200' : 'hover:bg-gray-100'">
          <Icon :icon="Archive ? 'mdi:archive-arrow-down' : 'mdi:archive-arrow-down-outline'"
            style="color: #5F6368; font-size: 1.25rem;" />
        </div>
        <div @click="gmailStore.deleteMessage(message_id)" class="flex  items-center justify-center p-2.5 rounded-full "
          :class="selected ? 'hover:bg-blue-200' : 'hover:bg-gray-100'">
          <Icon icon="mdi:trash-can-outline" style="color: #5F6368; font-size: 1.25rem;" />
        </div>
        <div @click="toggleState('Read', Read)" class="flex  items-center justify-center p-2.5 rounded-full "
          :class="selected ? 'hover:bg-blue-200' : 'hover:bg-gray-100'">
          <Icon :icon="Read ? 'mdi:email-check' : 'mdi:email-open-outline'"
            style="color: #5F6368; font-size: 1.25rem;" />
        </div>
        <div @click="toggleState('Snooze', Snooze)" class="flex  items-center justify-center p-2.5 rounded-full  "
          :class="selected ? 'hover:bg-blue-200' : 'hover:bg-gray-100'">
          <Icon :icon="Snooze ? 'mdi:clock-check' : 'mdi:clock-outline'" style="color: #5F6368; font-size: 1.25rem;" />
        </div>
      </div>
      <p v-else class=" text-xs text-end" :class="Read ? 'font-thin text-gray-600' : 'font-medium '">{{ RecieveDate }}
      </p>
    </div>
  </div>

</template>

<script setup>
import { Icon } from '@iconify/vue';
import { ref, toRef, onMounted, toRefs, computed, watchEffect, watch } from 'vue';
import { useGmailStore } from '@/stores/gmail'
import { storeToRefs } from 'pinia';
import { addDoc, deleteDoc, updateDoc, doc, collection, onSnapshot, where } from 'firebase/firestore';
import { db } from '../Backend/Firebase'
const gmailStore = useGmailStore()

const scrolling = ref(false)
const hovered = ref(false)
const selected = ref(false)
const props = defineProps(['mprop', 'xselected']);
const message_id = ref(props.mprop.id)
// const xselection = ref(props.xselected)

watch(() => gmailStore.SelectedMessages, () => {
  selected.value = props.xselected
  console.log("The selected.value :", selected.value)
  console.log("props.xselected.value :", props.xselected)
})

watch(() => gmailStore.selectAllRead, (Old, New) => {
  // Update the reactive properties based on the new value of selectAllRead
  Read.value = (New) ? New : Old
})

const { Body, Subject } = toRefs(props.mprop.message.Content);
const { Date, Read, Recipient, Sender, Status } = toRefs(props.mprop.message);
const { Archive, Snooze, Star } = toRefs(props.mprop.message.Status);

// console.log("props.mprop.message", props.mprop.message)


// Optimistic Update state ( General Solution ) :
const toggleState = async (property, value) => {
  // console.log("Star :", Star.value)
  const propertyUpdate = ref(value)
  const propertyName = (property === "Read") ? property : `Status.${property}`

  if (property === 'Read') Read.value = !Read.value
  else {
    Status.value[property] = !Status.value[property]
  }

  try {
    await updateDoc(doc(collection(db, "messages"), message_id.value), {
      [propertyName]: !propertyUpdate.value
    })
    console.log("Document updated successfully", Star.value);
  } catch (error) {
    console.log("props.mprop.message.Star :", Star.value)
    console.error("Error updating document:", error);

    if (property === 'Read') Read.value = !Read.value
    else {
      Status.value[property] = !Status.value[property]
    }
  }
}

const RecieveDate = gmailStore.DateFormatter(Date.value.seconds)

const toggleSelected = () => {
  if (!selected.value) gmailStore.addtoSelected(message_id)
  else gmailStore.removefromSelected(message_id)
  selected.value = !selected.value
  // console.log("Current value of selected :", selected.value)
}


</script>
