import { useContext, useReducer, useEffect} from "react";
import { Context } from "../Context/Context/UseContext";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import './List.css';
import { ApiCall } from "../ApiService/ApiCall";

export default function List() {
    const {inputValue,setInputValue,list,setList,setEditMode,setEditList} = useContext(Context);

    const reducer= (state,action) => {
        switch(action.type){
            case "DELETE":
                const deleteItem = list.filter((item) => item.id !== action.payload);
                return setList(deleteItem);
            default:
                return list;
        }
    };

    const [state,dispatch] = useReducer(reducer,inputValue);

   
    const handleEdit = (item) => {
        setEditMode(true);
        setEditList(item.id);
        setInputValue(item.name);
    };
    const handleDelete = (id) => {
        dispatch({ type: 'DELETE',payload: id})
    };
    const handleSave  = async (item) => {
       const url = 'http://localhost:3000/checklist';
       const tempDate = new Date();
       const postData = {
        note : item?.name,
        date : ` ${tempDate.getFullYear()} / ${tempDate.getMonth()+1} / ${tempDate.getDate()} `
       };
       await ApiCall(url, 'post', postData);
    };
 
    return(
        <div className="list--div">
                {list.map((item,index) => {
                    return(
                    <div key={index} className="d-flex list">

                        <div className="w-75 d-flex ms-3">
                        <li className="mb-3">{item.name} </li>
                        </div>

                        <div className="d-flex ms-2 gap-2">
                        <BorderColorOutlinedIcon onClick={() =>handleEdit(item)}/>
                        <DeleteOutlinedIcon onClick={() =>handleDelete(item.id)}/>
                        <SaveAltOutlinedIcon onClick={() =>handleSave(item)} className="save--list"/>
                    </div>
        </div>
                    
     )
    })}
    </div>
    )
}