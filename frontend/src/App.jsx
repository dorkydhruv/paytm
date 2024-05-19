import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { SignUp } from './pages/SIgnUp';
import { Signin } from './pages/SignIn';
import { Dashboard } from './pages/Dasboard';
import {SendMoney} from './pages/SendMoney';
function App() {

  return (
    <>
      <BrowserRouter >
          <Routes>
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/send" element={<SendMoney />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
