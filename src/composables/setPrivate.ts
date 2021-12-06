import { doc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase/config'

export const setPrivate = async (id: string, val: boolean) => {

    try {
        const listRef = doc(db, 'lists', id);
        await updateDoc(listRef, {
            mutual: false,
            private: val
        });
    } catch (e) {
        console.log(e);
    }
}