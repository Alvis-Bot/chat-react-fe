import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {Provider as ReduxProvider} from "react-redux/es/exports";
import {persistor, store} from "./redux/store.ts";
import {PersistGate} from "redux-persist/lib/integration/react";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <BrowserRouter>
        <ReduxProvider store={store}>
            <PersistGate loading={<></>} persistor={persistor}>
                <App/>
            </PersistGate>
        </ReduxProvider>
    </BrowserRouter>
    // </React.StrictMode>,
)
