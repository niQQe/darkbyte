import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '@/firebase/config'
import { ref } from 'vue'
import { posts } from "@/global/posts"

export const getPosts = (listid: string) => {
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
    } catch (e) {
        console.log(e);
    }
}

