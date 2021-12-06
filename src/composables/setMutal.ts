import { doc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase/config'

export const setMutual = async (id: string, val: boolean) => {

    try {
        const listRef = doc(db, 'lists', id);
        await updateDoc(listRef, {
            mutual: val,
            private: false
        });
    } catch (e) {
        console.log(e);
    }
}