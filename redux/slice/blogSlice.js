import { createSlice } from "@reduxjs/toolkit";

// initial state
export const initialState = {
  dataBlogs: {
    items: [],
    error: false,
    msg: "null",
  },
  dataBlog: {
    items: [],
    error: false,
    msg: "null",
  },
  formBlog: {},
};

// our slice
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setDataBlogs: (state, { payload }) => {
      state.dataBlogs.error = payload.msg ?? false;
      state.dataBlogs.items = payload.items;
      state.dataBlogs.msg = payload.msg;
    },
    setDataBlog: (state, { payload }) => {
      state.dataBlog.error = payload.msg ?? false;
      state.dataBlog.items = payload.items;
      state.dataBlog.msg = payload.msg;
    },
    setFormBlog: (state, { payload }) => {
      state.formBlog = {
        ...state.formBlog,
        formBlog: {
          ...state.formBlog,
          [payload.formType]: payload.formValue,
        },
      };
    },
  },
});

export const { setDataBlogs, setDataBlog, setFormBlog } = blogSlice.actions;
export default blogSlice.reducer;
