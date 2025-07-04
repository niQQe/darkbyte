import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '@/firebase/config'
import { user } from '@/global/user'
export const getOwnedLists = async ({ uid, endLocation }: { uid: string, endLocation: any }) => {
    console.log('GET OWNED LISTS');
    let q: any
    if (user.value.uid === uid) {
        q = query(collection(db, 'lists'), where("owner", "==", uid),)
    } else {
        q = query(collection(db, 'lists'), where("owner", "==", uid), where("private", "==", false))
    }
    try {
        onSnapshot(q, ({ docs }: any) => {
            endLocation.value = docs.map((doc: any) => {
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

