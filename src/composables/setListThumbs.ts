import { doc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase/config'
import { posts } from '@/global/posts'

export const setListThumbs = async (id: string) => {
    const orderedPosts = posts.value.sort((a: any, b: any) => a.created - b.created);
    let thumbs
    if (posts.value.length < 4) {
        thumbs = [orderedPosts[0].image]
    } else {
        thumbs = orderedPosts.slice(0, 4).reduce((imageUrls: any, post: any) => {
            imageUrls.push(post.image)
            return imageUrls
        }, [])
    }

    try {
        const listRef = doc(db, 'lists', id);

        await updateDoc(listRef, {
            listThumbs: thumbs
        });
    } catch (e) {
        console.log(e);
    }
}