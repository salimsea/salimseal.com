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
  formBlog: {
    formBlog: {
      search: "",
    },
  },
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
    appendDataBlogs: (state, { payload }) => {
      state.dataBlogs.error = payload.msg ?? false;
      state.dataBlogs.msg = payload.msg;
      if (payload.items) {
        if (!state.dataBlogs.items || Array.isArray(state.dataBlogs.items)) {
          state.dataBlogs.items = { contents: [], category: [] };
        }
        state.dataBlogs.items.contents = [
          ...(state.dataBlogs.items.contents || []),
          ...(payload.items.contents || []),
        ];
        if (payload.items.category) {
          const newCategories = new Set([
            ...(state.dataBlogs.items.category || []),
            ...payload.items.category,
          ]);
          state.dataBlogs.items.category = Array.from(newCategories);
        }
      }
    },
    setDataBlog: (state, { payload }) => {
      state.dataBlog.error = payload.msg ?? false;
      state.dataBlog.items = payload.items;
      state.dataBlog.msg = payload.msg;
    },
    setFormBlog: (state, { payload }) => {
      state.formBlog = {
        formBlog: {
          ...state.formBlog,
          [payload.name]: payload.value,
        },
      };
    },
  },
});

export const { setDataBlogs, setDataBlog, setFormBlog, appendDataBlogs } = blogSlice.actions;
export default blogSlice.reducer;
