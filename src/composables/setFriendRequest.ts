import { doc, setDoc } from "firebase/firestore";
import { db } from '@/firebase/config'
import { user } from '@/global/user'

export const setFriendRequest = async (userId: string) => {
    console.log(userId);

    try {
        const listRef = doc(db, 'users', userId, 'friendRequests', user.value.uid);
        await setDoc(listRef, {
            uid: user.value.uid,
            displayname: user.value.displayname,
            created: new Date(),
        });
    } catch (e) {
        console.log(e);
    }
}