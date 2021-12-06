import { deleteDoc, doc } from "firebase/firestore";
import { db } from '@/firebase/config'

export const deleteList = async (id: string) => {
    console.log('körs');
    console.log(id);
    try {
        await deleteDoc(doc(db, "lists", id));
    } catch (e) {
        console.log(e);
    }
}

