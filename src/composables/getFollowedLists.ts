import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from '@/firebase/config'
export const getFollowedLists = async ({ uid, endLocation }: { uid: string, endLocation: any }) => {
    console.log('uid');
    try {
        onSnapshot(query(collection(db, `users/${uid}/following`)), ({ docs }: any) => {
            console.log('following');
            console.log(docs);
            endLocation.value = docs.map((doc: any) => {
                doc = {
                    ...doc.data(),
                    id: doc.id,
                    created: new Date(doc.data().date.seconds * 1000)
                }
                return doc
            })
        })


    } catch (e) {
        console.log(e);
    }
}

