import { configureStore, } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import persistedReducer from './features/persistConfig';


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
 
});

const persistor = persistStore(store);

export { store, persistor };
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

