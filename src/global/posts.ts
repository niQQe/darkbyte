import { ref, computed, watch } from 'vue'
import { average } from 'color.js'
import { lists } from '@/composables/getOwnedLists';
import { currentList } from './currents';
export const posts = ref([] as any)
export const selectedTag = ref('');
export const search = ref('')
export const currentPostIndex = ref()
export const dropColorCss = ref('')

export const filteredPosts = computed(() => {
    return posts.value
        .filter((post: any) => selectedTag.value ? post.tag === selectedTag.value : true)
        .filter((post: any) => search.value ? post.title.toLowerCase().includes(search.value.toLowerCase()) : true)
        .sort((a: any, b: any) => a.created - b.created)
})


export const listThumbs = computed(() => {
    if (!lists.value.length || !currentList.value?.id) return []
    return lists.value.find((list: any) => list.id === currentList.value.id).listThumbs
})


watch(listThumbs, async (thumbs) => {
    if (!thumbs.length || !thumbs) {
        dropColorCss.value = `0,0,0`
        return
    }
    const avg = await average(thumbs[0])
    dropColorCss.value = `${avg[0]},${avg[1]},${avg[2]}`
}, { deep: true, immediate: true })


export const tags = computed(() => {
    return posts.value.reduce((tags: any, post: any) => {
        if (!tags.includes(post.tag)) tags.push(post.tag)
        return tags
    }, [])
})