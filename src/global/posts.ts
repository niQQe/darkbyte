import { ref, computed, watch } from 'vue'
import { average } from 'color.js'
import { ownedLists } from '@/global/data';
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

watch(currentList, async (list) => {
    if (!list?.listThumbs?.length || !list?.listThumbs) {
        console.log('no drops');
        dropColorCss.value = `0,0,0`
        return
    }
    const avg = await average(list.listThumbs[0])
    dropColorCss.value = `${avg[0]},${avg[1]},${avg[2]}`
}, { deep: true, immediate: true })


export const tags = computed(() => {
    return posts.value.reduce((tags: any, post: any) => {
        if (!tags.includes(post.tag)) tags.push(post.tag)
        return tags
    }, [])
})