import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { store } from './redux/store';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {

  return (

    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Signup />} />
        </Routes>
      </Router>
    </Provider>

  )
}

export default App
