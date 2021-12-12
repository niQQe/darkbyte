import { doc, deleteDoc } from "firebase/firestore";
import { db } from '@/firebase/config'
import { user } from '@/global/user'

export const setUnFollow = async (id: string,) => {

    try {
        await deleteDoc(doc(db, "lists", id, 'following', user.value.uid));
    } catch (e) {
        console.log(e);
    }

}