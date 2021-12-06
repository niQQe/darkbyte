import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '@/firebase/config'
import { ref } from 'vue'
import { user } from '@/global/user'

export const getFollowedLists = () => {
    console.log(user.value);
    const isPending = ref(false)
    const lists = ref([] as any)
    try {
        const q = query(collection(db, 'lists'), where("owner", "==", user.value.uid));
        onSnapshot(q, ({ docs }: any) => {
            lists.value = docs.map((doc: any) => {
                doc = {
                    ...doc.data(),
                    id: doc.id
                }
                return doc
            })
        })
        return lists

    } catch (e) {
        console.log(e);
    }
}

