import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import withImgSlice from "./withImgSlice";

export const store = configureStore({
  reducer: {
    app: todoSlice,
    Img: withImgSlice,
  },
});
