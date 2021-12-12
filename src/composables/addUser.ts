import { setDoc, doc, Timestamp } from "firebase/firestore";
import { db } from '@/firebase/config'

export const addUser = async (user: any, displayname: string) => {
    try {
        await setDoc(doc(db, 'users', user.uid), {
            user: user.uid, email: user.email, displayname, created: new Date(), collection: 'users', private: false
        })
    } catch (e) {
        console.log(e);
    }
}

