import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "features/register/registerSlice";
import authSlice from "features/auth/authSlice";
import blogsSlice from "features/blogs/blogsSlice";
import searchSlice from "features/search/searchSlice";
import filterSlice from "features/filter/filterSlice";
import paginationSlice from "features/pagination/paginationSlice";

const store = configureStore({
  reducer: {
    register: registerSlice,
    auth: authSlice,
    blogs: blogsSlice,
    search: searchSlice,
    filter: filterSlice,
    pagination: paginationSlice,
  },
});

export default store;
