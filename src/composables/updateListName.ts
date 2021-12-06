import { doc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase/config'

export const updateListName = async (id: string, name: string) => {
    try {
        const listRef = doc(db, 'lists', id);

        // Set the "capital" field of the city 'DC'
        await updateDoc(listRef, {
            name
        });
    } catch (e) {
        console.log(e);
    }
}