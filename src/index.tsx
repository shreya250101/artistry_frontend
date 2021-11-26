import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { Provider } from 'urql'
import client from './config/urqlClient'
import { AppState } from './context/AppContext'

ReactDOM.render(
    <React.StrictMode>
        <Provider value={client}>
            <BrowserRouter>
                <AppState>
                    <App />
                </AppState>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
)
