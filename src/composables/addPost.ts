import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from '@/firebase/config'
import { user } from '@/global/user'
import { currentList } from "@/global/currents";
import { posts } from '@/global/posts'
import { setListThumbs } from "./setListThumbs";

export const addPost = async (post: Record<string, unknown>) => {
    try {
        await addDoc(collection(db, 'lists', currentList.value.id, 'posts'), {
            ...post, created: new Date(), owner: user.value.uid
        })
        await setListThumbs(currentList.value.id)
    } catch (e) {
        console.log(e);
    }
}

