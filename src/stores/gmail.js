import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGmailStore = defineStore('Gmail',() => {
  const LeftNavbar_open = ref(false)
  const Compose_open = ref(false)

  return {LeftNavbar_open,Compose_open}
})
