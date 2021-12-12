import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/firebase/config'
import { user } from '@/global/user'
import { ref } from 'vue'
import { isFollowing } from "@/global/data";

import { doc, onSnapshot } from "firebase/firestore";
export const getIfFollow = (listId: string) => {
    const following = ref()
    onSnapshot(doc(db, `lists/${listId}/following/${user.value.uid}`), (doc) => {
        if (!doc.data()) isFollowing.value = false
        else isFollowing.value = true

    });
    return {
        following
    }

}

