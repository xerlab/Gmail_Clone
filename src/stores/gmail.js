import { ref,onMounted ,computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { addDoc, deleteDoc, updateDoc, doc, collection, onSnapshot, where } from 'firebase/firestore';
import { db } from '../Backend/Firebase'


export const useGmailStore = defineStore('Gmail',() => {
  const MessageList = ref([])
  const LeftNavbar_open = ref(false)
  const Compose_open = ref(false)
  const loaded = ref(false)

  // // Getting all messages from firestore database ( Fetch all )
  async function getMailsByRecipient(){
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


    return {LeftNavbar_open,Compose_open,MessageList,loaded,getMailsByRecipient}
          
  })
          
          