import { useEffect, useState } from 'react';
import { Context } from '../Context/Context/UseContext';
import Form from "./Form";
import List from './List';
import { useNavigate } from 'react-router-dom';

export default function ToDo() {
  const [inputValue,setInputValue] = useState("");
  const [list,setList] = useState( () => JSON.parse(localStorage.getItem("list")) || []);
  const [editMode,setEditMode] = useState(false);
  const [editList,setEditList] = useState([]);
  const navigate = useNavigate();
  const handleCheck = () => {
    navigate('/checklist');
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  },[list]);

    return (
    <Context.Provider value={{inputValue,setInputValue,list,setList,editMode,setEditMode,editList,setEditList}}>
    <Form/>
    <List/>
    <button className='btn btn-danger mt-3' onClick={handleCheck}>Check your list</button>
    </Context.Provider>
    )
}