import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/firebase/config'
import { ref } from 'vue'

export const getNickname = async (nickname: string) => {
    try {
        const q = query(collection(db, "users"), where("nickname", "==", nickname));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) return true
        const { nickname: userNickname } = querySnapshot.docs[0].data();
        return userNickname
    } catch (e) {
        console.log(e);
    }
}
export const getNicknameById = async (uid: string) => {
    console.log(uid);
    try {
        const q = query(collection(db, "users"), where("user", "==", uid));
        const querySnapshot = await getDocs(q);
        const { nickname } = querySnapshot.docs[0].data();
        return nickname
    } catch (e) {
        console.log(e);
    }
}

