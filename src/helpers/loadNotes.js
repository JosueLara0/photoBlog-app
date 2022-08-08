//*  libraries
import { collection, getDocs } from "firebase/firestore/lite";
//* firebase
import { FirebaseDB } from "../firebase";

export const loadNotes = async (uid = '') => {
    if (!uid) throw new Error("The UID of the user don't exists");

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const notes = [];
    docs.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() });
    });

    return notes;
};