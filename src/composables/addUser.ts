import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from '@/firebase/config'

export const addUser = async (user: any, displayname: string) => {
    try {
        await addDoc(collection(db, 'users'), {
            user: user.uid, email: user.email, displayname, created: new Date(), collection: 'users'
        })
    } catch (e) {
        console.log(e);
    }
}

