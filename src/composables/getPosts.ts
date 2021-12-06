import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '@/firebase/config'
import { ref } from 'vue'

export const getPosts = (listid: string) => {
    const posts = ref([] as any)
    try {
        const q = query(collection(db, 'lists', listid, 'posts'));
        onSnapshot(q, ({ docs }: any) => {
            posts.value = docs.map((doc: any) => {
                doc = {
                    ...doc.data(),
                    id: doc.id,
                    created: doc.data().created.seconds
                }
                return doc
            })
        })
        return posts


    } catch (e) {
        console.log(e);
    }
}

