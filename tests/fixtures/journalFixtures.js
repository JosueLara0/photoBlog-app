export const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    activeSidebar: false,
    active: null,
};

export const id = '546445';
const date = new Date().getTime();
const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';

export const demoNote = {
    id,
    imageUrls: [imageUrl],
    title: 'Note 1',
    body: 'Body of first note',
    date
};

export const demoNoteUpdated = {
    id,
    imageUrls: [],
    title: 'Note 2',
    body: 'Body of first note updated',
    date
};
