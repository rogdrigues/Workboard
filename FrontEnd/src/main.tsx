import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import { Provider } from 'react-redux'
import store, { persistor } from '@/redux/index'
import { ToastManager } from './components'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastManager>
          <App />
        </ToastManager>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
