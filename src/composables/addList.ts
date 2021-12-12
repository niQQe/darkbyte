import { addDoc, collection } from "firebase/firestore";
import { db } from '@/firebase/config'
import { user } from '@/global/user'

export const addList = async (name: string) => {
    try {
        await addDoc(collection(db, 'lists'), {
            name, created: new Date(),
            owner: user.value.uid,
            followers: 0,
            displayname: user.value.displayname,
            listThumbs: [],
            mutual: false,
            private: false,
            collection: 'lists'
        })
    } catch (e) {
        console.log(e);
    }
}

