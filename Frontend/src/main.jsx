import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './context/UserCont.jsx';
import CaptainCont from './context/CaptainCont.jsx';
import SocketProvider from './context/SocketContext.jsx';


createRoot(document.getElementById('root')).render(
  <UserProvider>
    <CaptainCont>
      <SocketProvider> {/* ✅ Now it can access both contexts */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketProvider>
    </CaptainCont>
  </UserProvider>
);