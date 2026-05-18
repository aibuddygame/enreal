import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { I18nProvider } from './i18n/I18nContext.jsx'
import './index.css'

console.log('main.jsx executing, root element:', document.getElementById('root'));

try {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    console.log('Root created:', root);
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <I18nProvider>
                    <App />
                </I18nProvider>
            </BrowserRouter>
        </React.StrictMode>,
    );
    console.log('Render called');
} catch (e) {
    console.error('REACT ERROR:', e);
    document.body.innerHTML = '<div style="padding:20px;font-family:sans-serif;"><h1>React Error</h1><pre style="background:#fee;padding:10px;border-radius:4px;">' + e.message + '<br>' + e.stack + '</pre></div>';
}
