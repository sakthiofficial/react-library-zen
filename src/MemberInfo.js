import { Button } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from "react-router";
import EastTwoToneIcon from '@mui/icons-material/EastTwoTone';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export function MemberInfo() {

  let [data, setdata] = useState(null)
  let { id } = useParams()
  useEffect(() => {
    fetch(`https://6397271477359127a02e817e.mockapi.io/memebers/${id}`).then((res) => res.json()).then((val) => setdata(val))
  }, [])
  return (
    <div>
      {data ? <MemberData id={id}  data={data} /> : "loading"}
    </div>
  )
}

function MemberData({data, id }) {
  let [barrow, setbarrow] = useState(false)
  let [bookdata,setbookdata] = useState(null);
  useEffect(()=>{
    fetch("https://6397271477359127a02e817e.mockapi.io/books").then((res)=>res.json()).then((val)=>setbookdata(val))
  },[])

  let navigate = useNavigate()
  let deleteData = (() => {
    fetch(`https://6397271477359127a02e817e.mockapi.io/memebers/${id}`, {
      method: "DELETE"
    }).then(() => navigate(-1))
  })

  return (
    <>
      <div className="book-info">
        <div className="book-info__img">
          <img src="https://img.freepik.com/free-vector/character-illustration-people-holding-user-account-icons_53876-43022.jpg?t=st=1670826441~exp=1670827041~hmac=7468dd42dbd8c2f4d0445f145e8524357bb152726039cf1f0abdb5fbef19069b" alt="Book-IMg" />

        </div>

        <div className="book-info__cont">
          <h1>Member Details</h1>
          <p><span className="sub-topic">Name</span> : {data.memname}</p>
          <p><span className="sub-topic">Phone No</span> : {data.phone} </p>
          <p><span className="sub-topic">Email</span> : {data.email}</p>

          <p onClick={()=>setbarrow(!barrow)} style={{ cursor: "pointer" }}><span className="sub-topic">Barrowed</span> : {data.barrowed.length}< EastTwoToneIcon /></p>
          <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>


          <Button variant="contained" color="error" onClick={() => deleteData()}>Delete</Button>


        </div>
      </div>

      <div className="barrow">
        {barrow ? <BarrowCont setbarrow={setbarrow} bookdata ={bookdata} barrowInfo={data.barrowed} id={id} navigate={navigate} /> : null}
      </div>
    </>

  );
}
function BarrowCont({bookdata,id ,barrowInfo,setbarrow}) {


let navigate = useNavigate()

  let putData = ((ele)=>{
    let res = barrowInfo
    res.splice(ele,1)
    console.log(res);

   
    fetch(`https://6397271477359127a02e817e.mockapi.io/memebers/${id}`,{
      method:"PUT",
      body:JSON.stringify({barrowed:res}),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    }).then(()=>navigate("/dashboard"))
  })

  return (
    <div className="barrow-cont" onDoubleClick={() => setbarrow(false)}>
      <div className="barrowed-field barrowed-mem">
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 300 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>

                  <TableCell>
                    Book
                  </TableCell>
                  <TableCell>
                    Author
                  </TableCell>
                  <TableCell>
                    Avalable
                  </TableCell>
                  <TableCell>
                    Return
                  </TableCell>
                 


                </TableRow>
              </TableHead>
              <TableBody>
               
                         
                         {bookdata.map((book)=> barrowInfo.map((val,index)=>{
                          console.log(book,val)
                          if(book.id == val.toString()){
                            return(
                              <TableRow hover role="checkbox">
                              <TableCell>
                              {book.title}
                             </TableCell>
                             <TableCell>
                               {book.author}
                             </TableCell> <TableCell>
                             {book.isavalable}
                             </TableCell>
                             <TableCell>
                            <Button onClick={()=>putData(index)} color="error">return</Button>
                             </TableCell>
                             </TableRow>
                            )
                          }
                         }))} 
                         
                       
                    


              </TableBody>
            </Table>
          </TableContainer>
          <Button onClick={() => setbarrow(false)}>back</Button>
          <TablePagination

          />

        </Paper>

      </div>
    </div>
  )
}