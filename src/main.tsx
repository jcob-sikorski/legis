import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'

// CSS
import './index.css'

// Redux
import { Provider as ReduxProvider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/reducers/index.ts'

const store = configureStore({ 
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

// ANTDesign
import { ConfigProvider, Typography } from "antd";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Poppins"
          }
        }}
      >
        <App />
      </ConfigProvider>
    </ReduxProvider>
  </React.StrictMode>,
)
