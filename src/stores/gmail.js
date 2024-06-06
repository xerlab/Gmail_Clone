import { ref, onMounted, computed, reactive } from "vue";
import { defineStore } from "pinia";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  collection,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../Backend/Firebase";

export const useGmailStore = defineStore("Gmail", () => {
  const MessageList = ref([]);
  const DraftList = ref([]);
  const SelectedMessages = ref([]);
  const LeftNavbar_open = ref(false);
  const Compose_open = ref(false);
  const loaded = ref(false);
  const selectAllRead = ref([]);
  const currentFilter = ref("Inbox");

  // // Getting all messages from firestore database ( Fetch all )
  async function getMailsByRecipient() {
    loaded.value = false;
    // const q = query(collection(db,"messages"),where("Recipient","==","Mohammad Adel"))
    onSnapshot(collection(db, "messages"), (querySnapshot) => {
      MessageList.value = [];
      querySnapshot.forEach((doc) => {
        MessageList.value.push({ id: doc.id, message: doc.data() });
      });
      console.log("Messages List are :", MessageList.value);

      loaded.value = true;
    });
  }

  async function getDraftsBySender() {
    loaded.value = false;
    onSnapshot(collection(db, "drafts"), (querySnapshot) => {
      DraftList.value = [];
      querySnapshot.forEach((doc) => {
        DraftList.value.push({ id: doc.id, message: doc.data() });
      });
      console.log("Draft List are :", DraftList.value);

      loaded.value = true;
    });
  }

  function DateFormatter(OldDate) {
    const Seconds = ref(OldDate);
    // console.log("Current Date format is ", Seconds.value)

    // Create a Date object from the seconds
    const date = new Date(Seconds.value * 1000);

    // Get the month name and day
    const options = { month: "long", day: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    // console.log("date :",date,"formattedDate :",formattedDate,"options :",options);
    return formattedDate;
  }

  async function deleteMessage(message_id) {
    await deleteDoc(doc(db, "messages", message_id));
  }

  function addtoSelected(message_id) {
    SelectedMessages.value.push(message_id.value);
    console.log(" addtoSelected SelectedMessages :", SelectedMessages.value);
  }

  function removefromSelected(message_id) {
    SelectedMessages.value = SelectedMessages.value.filter(
      (current_id) => current_id !== message_id.value
    );
    console.log("SelectedMessages :", SelectedMessages.value);
  }

  function selectAllMessages() {
    // empty the seleced list before any ops
    SelectedMessages.value = [];

    MessageList.value.forEach((message) => {
      SelectedMessages.value.push(message.id);
    });
    console.log(SelectedMessages.value);
  }

  function unselectAllMessages() {
    // empty the seleced list before any ops
    SelectedMessages.value = [];
    console.log(SelectedMessages.value);
  }

  function customSelection(selection) {
    SelectedMessages.value = [];
    console.log("Custom selection :", SelectedMessages.value.length);
    const selectionName = {
      Starred: "Star",
      Archived: "Archive",
      Snoozed: "Snooze",
    };

    console.log(
      "selection",
      selection,
      "Selection Name is :",
      selectionName[selection]
    );
    if (selection === "Read" || selection === "UnRead") {
      if (selection === "Read")
        SelectedMessages.value = MessageList.value
          .filter((message) => message.message.Read === true)
          .map((message) => message.id);
      else
        SelectedMessages.value = MessageList.value
          .filter((message) => message.message.Read !== true)
          .map((message) => message.id);
    } else if (selection === "All" || selection === "None") {
      if (selection === "All") selectAllMessages();
      else unselectAllMessages();
    } else {
      SelectedMessages.value = MessageList.value
        .filter(
          (message) => message.message.Status[selectionName[selection]] === true
        )
        .map((message) => message.id);
    }

    console.log(selection, SelectedMessages.value);
  }

  function deleteSelectedMessages() {
    SelectedMessages.value.forEach((message) => deleteMessage(message));
    SelectedMessages.value = [];
  }

  function toggleAllRead() {
    if (selectAllRead.value !== "") {
      selectAllMessages();
      selectAllRead.value = SelectedMessages.value;
      SelectedMessages.value = [];
      selectAllRead.value.forEach(async (message_id) => {
        try {
          await updateDoc(doc(collection(db, "messages"), message_id), {
            Read: true,
          });
        } catch (error) {
          console.error("Error updating document:", error);
        }
      });
    }
  }

  return {
    LeftNavbar_open,
    Compose_open,
    MessageList,
    loaded,
    DraftList,
    SelectedMessages,
    selectAllRead,
    currentFilter,
    getMailsByRecipient,
    getDraftsBySender,
    DateFormatter,
    deleteMessage,
    addtoSelected,
    removefromSelected,
    selectAllMessages,
    unselectAllMessages,
    customSelection,
    deleteSelectedMessages,
    toggleAllRead,
  };
});
