import { ref } from 'vue'

export const posts = ref()
export const ownedLists = ref([] as any)
export const profileLists = ref([] as any)
export const followedLists = ref([] as any)
export const isFollowing = ref(false)
export const friendRequests = ref([])