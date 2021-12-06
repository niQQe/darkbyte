import { ref, watch } from 'vue'

export const currentModal = ref()
export const showModal = ref(false)

watch(currentModal, (modal) => {
    if (modal) showModal.value = true
    else showModal.value = false
})

