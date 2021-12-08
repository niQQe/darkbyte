import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '@/firebase/config'
import { ref } from 'vue'
import { user } from '@/global/user'

export const lists = ref([] as any)


export const getOwnedLists = () => {
    try {
        const q = query(collection(db, 'lists'), where("owner", "==", user.value.uid));
        onSnapshot(q, async ({ docs }: any) => {
            lists.value = await docs.map((doc: any) => {
                doc = {
                    ...doc.data(),
                    id: doc.id,
                    created: new Date(doc.data().created.seconds * 1000)
                }
                return doc
            })
            console.log(lists.value);
        })
        return lists

    } catch (e) {
        console.log(e);
    }
}

