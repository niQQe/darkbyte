import { doc, setDoc } from "firebase/firestore";
import { db } from '@/firebase/config'
import { user } from '@/global/user'
import { currentList } from "@/global/currents";

export const setFollow = async (id: string,) => {

    try {
        const listRef = doc(db, 'lists', id, 'following', user.value.uid);
        await setDoc(listRef, {
            displayname: user.value.displayname,
            date: new Date(),
            uid: user.value.uid,
            listId: currentList.value.id

        });
    } catch (e) {
        console.log(e);
    }
    try {
        const listRef = doc(db, 'users', user.value.uid, 'following', currentList.value.id);
        await setDoc(listRef, {
            name: currentList.value.name,
            date: new Date(),
            owner: currentList.value.owner
        });
    } catch (e) {
        console.log(e);
    }
}