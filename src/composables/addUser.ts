import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from '@/firebase/config'

export const addUser = async (user: any, nickname: string) => {
    try {
        await addDoc(collection(db, 'users'), {
            user: user.uid, email: user.email, nickname, created: new Date()
        })
    } catch (e) {
        console.log(e);
    }
}

