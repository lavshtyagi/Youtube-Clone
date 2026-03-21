import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appslice'

export default configureStore({
  reducer: {
    app: appReducer,
  },
})