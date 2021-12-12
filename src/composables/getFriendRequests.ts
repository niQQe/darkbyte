import { db } from '@/firebase/config'
import { ref } from 'vue'
import { query, collection, onSnapshot } from "firebase/firestore";
import { friendRequests } from '@/global/data';
import { user } from '@/global/user'
export const getFriendRequests = () => {
    console.log(user);
    const following = ref()
    onSnapshot(query(collection(db, `users/${user.value.uid}/friendRequests`)), ({ docs }: any) => {
        friendRequests.value = docs.map((doc: any) => {
            doc = {
                ...doc.data(),
                id: doc.id,
                created: new Date(doc.data().created.seconds * 1000)
            }
            return doc
        })

    });
    return {
        following
    }

}

