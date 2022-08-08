//* store slices
import {
    journalSlice,
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    setPhotosToActiveNote,
    clearNoteLogout,
    renderSidebar
} from "../../../src/store/journal/journalSlice";
//* fixtures
import { initialState, demoNote, demoNoteUpdated, id } from "../../fixtures/journalFixtures";

describe('Tests in journalSlice', () => {

    test('should return initialState and it should have the name journal', () => {

        const state = journalSlice.reducer(initialState, {});

        expect(state).toBe(initialState);
        expect(journalSlice.name).toBe('journal');
    });

    test('should set isSaving true with savingNewNote', () => {

        const state = journalSlice.reducer(initialState, savingNewNote());

        expect(state).toEqual({
            ...initialState,
            isSaving: true,
        });
    });

    test('should add new note and set isSaving false with addNewEmptyNote', () => {

        const state = journalSlice.reducer(initialState, addNewEmptyNote(demoNote));

        expect(state).toEqual({
            ...initialState,
            isSaving: false,
            notes: [demoNote],
        });
    });

    test('should add set note in active with setActiveNote', () => {

        const state = journalSlice.reducer(initialState, setActiveNote(demoNote));

        expect(state).toEqual({
            ...initialState,
            messageSaved: '',
            active: demoNote,
        });
    });

    test('should add notes to state with setNotes', () => {

        const state = journalSlice.reducer(initialState, setNotes([demoNote]));

        expect(state).toEqual({
            ...initialState,
            notes: [demoNote],
        });
    });


    test('should set isSaving true with setSaving', () => {

        const state = journalSlice.reducer(initialState, setSaving());

        expect(state).toEqual({
            ...initialState,
            isSaving: true,
            messageSaved: '',
        });
    });

    test('should update a note and change messageSaved with updateNote', () => {

        const state = journalSlice.reducer(initialState, addNewEmptyNote(demoNote));

        // expect(state).toEqual({
        //     isSaving: false,
        //     messageSaved: '',
        //     notes: [demoNote],
        //     active: null,
        // });

        const stateUpdated = journalSlice.reducer(state, updateNote(demoNoteUpdated));

        expect(stateUpdated).toEqual({
            ...state,
            isSaving: false,
            messageSaved: `${demoNoteUpdated.title}, has been updated`,
            notes: [demoNoteUpdated],
        });
    });

    test('should add files to active note imagesUrls with setPhotosToActiveNote', () => {

        const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';

        const state = journalSlice.reducer(initialState, setActiveNote(demoNote));

        // expect(state).toEqual({
        //     isSaving: false,
        //     messageSaved: '',
        //     notes: [],
        //     active: demoNote,
        // });

        const stateUpdated = journalSlice.reducer(state, setPhotosToActiveNote([imageUrl]));

        expect(stateUpdated).toEqual({
            ...state,
            isSaving: false,
            active: { ...state.active, imageUrls: [...state.active.imageUrls, imageUrl] },
        });
    });

    test('should clear note when logout in clearNoteLogout', () => {

        const state = journalSlice.reducer(initialState, setActiveNote(demoNote));

        // expect(state).toEqual({
        //     isSaving: false,
        //     messageSaved: '',
        //     notes: [],
        //     active: demoNote,
        // });

        const stateUpdated = journalSlice.reducer(state, clearNoteLogout());

        expect(stateUpdated).toEqual({
            isSaving: false,
            messageSaved: '',
            notes: [],
            activeSidebar: false,
            active: null,
        });
    });

    test('should delete note with deleteNoteById', () => {

        const stateSaved = journalSlice.reducer(initialState, addNewEmptyNote(demoNote));
        const stateActive = journalSlice.reducer(stateSaved, setActiveNote(demoNote));

        // expect(stateActive).toEqual({
        //     isSaving: false,
        //     messageSaved: '',
        //     notes: [demoNote],
        //     active: demoNote,
        // });

        const stateUpdated = journalSlice.reducer(stateActive, deleteNoteById(id));

        expect(stateUpdated).toEqual({
            ...stateActive,
            notes: [],
            active: null,
        });
    });

    test('should render sidebar', () => {
        const state = journalSlice.reducer(initialState, renderSidebar());

        expect(state).toEqual({
            ...initialState,
            activeSidebar: !initialState.activeSidebar,
        });
    });
});

