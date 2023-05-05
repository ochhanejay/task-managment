import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import { Route, Routes } from 'react-router';
import UserTask from './components/userTask';

function App() {
  return (
    <div className="App">


      <Routes>

        <Route path="/" element={<UserTask />} />
        <Route path="*" element={<div>404 not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
