import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from '@/firebase/config'

export const getUser = async ({ uid, endLocation }: { uid: string, endLocation: any }) => {
    console.log('get user');
    console.log(uid);
    try {
        const q = query(collection(db, "users"), where("user", "==", uid));
        const querySnapshot = await getDocs(q);
        console.log('get user snapshot', querySnapshot);
        endLocation.value = querySnapshot.docs[0].data()

    } catch (e) {
        console.log(e);
    }
}

