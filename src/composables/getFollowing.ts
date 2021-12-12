import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/firebase/config'

export const getFollowing = async (listid: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, `lists/${listid}/following`));
        if (querySnapshot.empty) return 0
        return querySnapshot.docs.length

    } catch (e) {
        console.log(e);
    }
}

