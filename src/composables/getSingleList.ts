import { collection, query, where, onSnapshot, getDoc, doc } from "firebase/firestore";
import { db } from '@/firebase/config'
import { ref } from 'vue'

export const getSingleList = async (id: string) => {
    try {
        const docRef = doc(db, "lists", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    } catch (e) {
        console.log(e);
    }
}

