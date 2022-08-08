//* libraries
import { doc, setDoc, collection, deleteDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase';
//* slices
import { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, setPhotosToActiveNote } from './journalSlice';
//* helpers
import { loadNotes, fileUpload } from '../../helpers';

export const startNewNote = () => {

    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    };
};

export const startLoadingNotes = () => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    };
};

export const startSaveNote = () => {

    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');

        const { active: note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, { merge: true });

        dispatch(updateNote(note));
    };
};

export const startUploadingFiles = (files = []) => {

    return async (dispatch, getState) => {

        dispatch(setSaving());

        const fileUploadPromises = [];
        // Save all files Promises in an array
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        // Execute all the promises
        const photosUrl = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photosUrl));
    };
};

export const startDeletingNote = () => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    };
};