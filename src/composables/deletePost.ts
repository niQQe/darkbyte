import { deleteDoc, doc } from "firebase/firestore";
import { db } from '@/firebase/config'
import { ref } from 'vue'
import { setListThumbs } from "./setListThumbs";
export const deletePost = async (listid: string, postid: string) => {
    try {
        const res = await deleteDoc(doc(db, "lists", listid, 'posts', postid));
        await setListThumbs(listid)
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}

