import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/firebase/config'

export const getSearch = async (search: string) => {
    try {
        const q = query(collection(db, "lists"), where("name", "==", search));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs)
        if (querySnapshot.empty) return true

    } catch (e) {
        console.log(e);
    }
}

