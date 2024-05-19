import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { SignUp } from './pages/signup';
import { SignIn } from './pages/SignIn';
import { SendMoney } from './pages/SendMoney';
import { Dashboard } from './pages/Dasboard';

function App() {

  return (
    <>
      <BrowserRouter >
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/send" element={<SendMoney />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
