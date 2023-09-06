import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Card,CardBody,CardHeader,CardText} from 'reactstrap';
import { ApiCall } from "../ApiService/ApiCall";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const url = "https://note-database.onrender.com/";
export default function Checklist() {
    const [data,setData] = useState(null);
    const navigate = useNavigate();

    const loadData = async () => {
         const tempData = await ApiCall(url,'get');
         setData(tempData);
    };
 
    useEffect(() => {
        loadData()
    },[]);
   
    const handleDelete = async (id) => {
      await ApiCall(`${url}/${id}`,'delete');
      loadData();
    };

    return (
      <>
      <button className="btn btn-danger d-flex justify-content-start ms-5" style={{marginTop: "-70px"}}onClick={() => navigate(-1)}>Back</button>
        <div className="d-flex flex-column justify-content-center align-items-center">
        {data?.map((item,index) => {
            return (
            <Card className="my-2" color="gray" outline style={{width: '18rem' , padding: "0px", background: "rgb(218, 225, 223)"}} key={index}>
              <CardHeader className="d-flex justify-content-center align-items-center gap-2">
                <CalendarMonthOutlinedIcon/>
                <span className="fw-bolder">{item?.date}</span>
                <CalendarMonthOutlinedIcon/>
              </CardHeader>
              <CardBody>
                <div className="d-flex mt-2">
                <CardText className="w-75">
                  <span className="d-flex justify-content-start ms-2">{item?.note}</span>
                </CardText>
                <DeleteOutlinedIcon className="ms-4" onClick={()=>handleDelete(item?.id)}/>
                </div>
              </CardBody>
            </Card>
            )
        })}
        </div>
      </>
    )
}