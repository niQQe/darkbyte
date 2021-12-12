import { doc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase/config'
import { posts } from '@/global/posts'
import { currentList } from "@/global/currents";

export const setListThumbs = async (id: string) => {
    console.log(posts.value.length);
    const orderedPosts = posts.value.sort((a: any, b: any) => a.created - b.created);
    let thumbs
    if (posts.value.length < 4 && posts.value.length != 0) {
        thumbs = [orderedPosts[0].image]
    } else if (posts.value.length === 0) {
        thumbs = []
    } else {
        thumbs = orderedPosts.slice(0, 4).reduce((imageUrls: any, post: any) => {
            imageUrls.push(post.image)
            return imageUrls
        }, [])
    }
    currentList.value.listThumbs = thumbs

    try {
        const listRef = doc(db, 'lists', id);

        await updateDoc(listRef, {
            listThumbs: thumbs
        });
    } catch (e) {
        console.log(e);
    }
}