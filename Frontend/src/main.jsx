
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserCont from './context/UserCont.jsx'


createRoot(document.getElementById('root')).render(
  
  <UserCont>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserCont>
 

)
