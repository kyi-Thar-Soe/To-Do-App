import { useContext, useReducer, useEffect} from "react"
import { Context } from "../Context/Context/UseContext"
import { TextField} from '@mui/material';
import './Form.css';
import note from '../assets/note3.png';
export default function Form() {
    const {inputValue,setInputValue,list,setList,editMode,editList} = useContext(Context);

    const reducer = (state,action) => {
        switch(action.type){
            case 'SUBMIT':
                return setList([...list,action.payload]);
            default:
                return list;
        }
    };

    const [state,dispatch] = useReducer(reducer,inputValue);
  
   
    const handleSubmit = (event) => {
        event.preventDefault();
        const newItem = {id: Math.random().toString(), name : inputValue}
        dispatch({ type: 'SUBMIT', payload: newItem});
        setInputValue("");
    };
   const handleUpdate = (event) => {
        event.preventDefault();
        setList(list.map((item) => {
            if(item.id === editList){
                return {...item,name: inputValue}
            }
            return item;
        }));
        setInputValue("");
   };

   useEffect(() => {
    // Save list to local storage whenever the list array changes
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

    return(
        <>
        <div className="d-flex gap-2 justify-content-center align-content-center">
        <h4 className="toDo--header">To - Do List</h4>
        <img src={note} alt="note--img" className="note--img"/>
        </div>
        {editMode ?  <form onSubmit={handleUpdate}>
        <TextField
          id="outlined-textarea"
          label="Edit your list here"
          multiline
          size="small"
          value={inputValue}
          onChange={(event) =>setInputValue(event.target.value)}
          className="textfield"
        />
        <button type="submit" className="btn btn-success ms-4">Update</button>
        </form> :  
        <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-textarea"
          label="Add your list here"
          multiline
          size="small"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="textfield"
        />
        <button type="submit" className="btn btn-success ms-4 submit--btn">Submit</button>
        </form>
        }
        
        </>
    )
}