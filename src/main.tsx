import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'

import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';

// CSS
import './index.css'

// Redux
import { Provider as ReduxProvider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/reducers/index.ts'

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({ 
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

const persistor = persistStore(store);

// ANTDesign
import { ConfigProvider, Spin, Typography } from "antd";
// import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={<Spin size='large' />} persistor={persistor}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Poppins"
            }
          }}
          >
          <App />
        </ConfigProvider>
      </PersistGate>
    </ReduxProvider>
  // </React.StrictMode>,
)
