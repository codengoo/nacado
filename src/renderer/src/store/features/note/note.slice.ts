import { ENoteState, INote } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { createNote, fetchNotes, updateNoteState } from './thunks';

export interface NoteState {
  notes: INote[];
  loading: boolean;
  errors: string[];
}

const initialState: NoteState = {
  notes: [],
  loading: false,
  errors: [],
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    // increment: state => {
    //   state.value += 1
    // },
    // decrement: state => {
    //   state.value -= 1
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
  },
  selectors: {
    selectNotes: (state) => {
      return state.notes.filter((t) => t.state === ENoteState.ON_GOING);
    },
    selectFetchingNoteStatus: (state) => ({
      loading: state.loading,
      errors: state.errors,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    });
    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.loading = false;
      // state.errors = action.payload
    });

    builder.addCase(updateNoteState.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateNoteState.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = state.notes.map((note) =>
        note.id === action.payload?.id ? action.payload : note,
      );
    });

    builder.addCase(createNote.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = [...state.notes, action.payload!];
    });
  },
});

export const {} = noteSlice.actions;
export const { selectFetchingNoteStatus, selectNotes } = noteSlice.selectors;

export default noteSlice.reducer;