import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Checklist from './ToDoList/Checklist.jsx';
import ToDo from "./ToDoList/ToDo";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ToDo/>}/>
      <Route path="checklist" element={<Checklist/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
