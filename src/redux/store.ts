import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import blockReducer from './reducers/blockReducer';
import selectBlockReducer from "./reducers/selectBlockReducer";

const rootReducer = combineReducers({
  block: blockReducer,
  selectBlock: selectBlockReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
