import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '@/firebase/config'
import { ref, watch } from 'vue'
import { user } from '@/global/user'
import { profileLists } from "@/global/data";


export const getOwnedLists = async (uid: string) => {
    let q: any
    if (user.value.uid === uid) {
        q = query(collection(db, 'lists'), where("owner", "==", uid),)
    } else {
        q = query(collection(db, 'lists'), where("owner", "==", uid), where("private", "==", false))
    }
    try {
        onSnapshot(q, ({ docs }: any) => {
            profileLists.value = docs.map((doc: any) => {
                doc = {
                    ...doc.data(),
                    id: doc.id,
                    created: new Date(doc.data().created.seconds * 1000)
                }
                return doc
            })
        })


    } catch (e) {
        console.log(e);
    }
}

