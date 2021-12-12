import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/firebase/config'
import { ref } from 'vue'

export const getDisplayName = async (displayName: string) => {
    try {
        const q = query(collection(db, "users"), where("displayname", "==", displayName));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) return true
        const { displayName: userDisplayName } = querySnapshot.docs[0].data();
        return userDisplayName
    } catch (e) {
        console.log(e);
    }
}
export const getDisplayNameById = async (uid: string) => {
    try {
        const q = query(collection(db, "users"), where("user", "==", uid));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        const { displayname } = querySnapshot.docs[0].data();
        console.log(displayname);
        return displayname
    } catch (e) {
        console.log(e);
    }
}

