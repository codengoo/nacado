import { ENoteState, INote, IResponseData } from '@/types';
import axios from '@/utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchNotes = createAsyncThunk('note/fetchAll', async () => {
  const response = await axios.get(`/note?status=${ENoteState.ON_GOING}`);
  // if (response.status != 200) {
  // }

  const res = response.data as IResponseData<INote[]>;
  if (res.data) return res.data;
  else return [];
});

export default fetchNotes;
