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
import { useFormik } from "formik";
import * as yup from "yup";
let sample = createContext();
export function BookInfo() {


  let [memInfo, setmemInfo] = useState(null);


  let [data, setdata] = useState(null)
  let [memdata, setmemdata] = useState(null)
  let { id } = useParams()
  useEffect(() => {
    fetch(`https://6397271477359127a02e817e.mockapi.io/books/${id}`).then((res) => res.json()).then((val) => setdata(val))
  }, [])

  return (
    <sample.Provider value={[memInfo, setmemInfo]}>
      <div>

        {data ? <BookCont id={id} data={data} /> : "loading"}
      </div>
    </sample.Provider>
  )
}


function BookCont({ data, id }) {
  console.log(data);
  let [memdata, setmemdata] = useState()
  useEffect(() => {
    fetch(`https://6397271477359127a02e817e.mockapi.io/memebers`).then((res) => res.json()).then((val) => setmemdata(val))
  }, [])
  let [barrow, setbarrow] = useState(false);
  let [bookdata, setbookdata] = useState(null);
  let [showmem, setshowmem] = useState(false)
  let deleteData = (() => {
    fetch(`https://6397271477359127a02e817e.mockapi.io/books/${id}`, {
      method: "DELETE"
    }).then(() => navigate(-1))
  })
  useEffect(() => {
    fetch(`https://6397271477359127a02e817e.mockapi.io/books/${id}`).then((res) => res.json()).then((val) => setbookdata(val))
  }, [])
  let navigate = useNavigate()
  return (
    <>
      <div className="book-info">
        <div className="book-info__img">
          <img src="https://img.freepik.com/free-vector/open-book-isolated_1284-43075.jpg?w=996&t=st=1670824302~exp=1670824902~hmac=2accbf3ce5bcc42cfdf2da23000c6e28d3b137eb3dec0e4f300b0b02a270a61c" alt="Book-IMg" />

        </div>
        <div className="book-info__cont">
          <h1>Book Details</h1>
          <p><span className="sub-topic">Title</span> : {data.title}</p>
          <p><span className="sub-topic">Author</span> : {data.author} </p>
          <p onClick={() => setshowmem(!showmem)} style={{ cursor: "pointer" }}><span className="sub-topic">Barrowed</span> : {data.barrowed.length}< EastTwoToneIcon /> </p>
          <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
          <Button variant="contained" color="success" onClick={() => setbarrow(!barrow)}>Barrow</Button>

          <Button variant="contained" color="error" onClick={() => deleteData()}>Delete</Button>




        </div>

      </div>
      <div className="barrow">
        {barrow ? <BarrowCont barrow={barrow} setbarrow={setbarrow} memdata={memdata} barrowInfo={bookdata.barrowed} id={id} navigate={navigate} /> : null}
        {/* {console.log(memdata)} */}
      </div>
      <div className="barrow" >
        {showmem ? <MemInfoTable setshowmem={setshowmem} memData={memdata} barrowInfo={bookdata.barrowed} id={id} navigate={navigate} /> : null}
      </div>
    </>

  );
}
function BarrowCont({ barrow, setbarrow, barrowInfo, memdata, navigate, id }) {
  let memValidate = yup.object({
    memId: yup.number().max(memdata.length, `Member Id Within ${memdata.length}`).required(`Enter Id Within ${memdata.length}`)

  })
  let memform = useFormik({
    initialValues: {
      memId: "",

    },
    validationSchema: memValidate,
    onSubmit: (values) => {
      putData(barrowInfo, id, values.memId, bookApi)
    }
  })
  let [memId, setmemId] = useState();
  let [count, setcount] = useState(0);
  let [memInfo, setmemInfo] = useContext(sample)
  useEffect(() => {
    fetch(`https://6397271477359127a02e817e.mockapi.io/memebers/${memId}`).then((res) => res.json()).then((val) => setmemInfo(val))
  }, [memId])
  let bookApi = "https://6397271477359127a02e817e.mockapi.io/books/";
  let memApi = "https://6397271477359127a02e817e.mockapi.io/memebers/";
  let test = () => {
    console.log("sucess");
  }
  let putData = ((arr, add, ele, api) => {

    arr.map((val) => {
      if (val != ele) {
        console.log("already barrowed")
        setbarrow(!barrow)

        return

      }
    })

    fetch(`${api}${add}`, {
      method: "PUT",
      body: JSON.stringify({ barrowed: [...arr, parseInt(ele)] }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(() => {
      if (count == 0) {
        putData(memInfo.barrowed, memId, id, memApi)
        count++
      } else {
        navigate(-1)
        return
      }

    })


  })

  return (
    <div className="barrow-cont" onDoubleClick={() => setbarrow(false)}>
      <div className="barrowed-field">
        <form onSubmit={memform.handleSubmit}>
          <TextField id="standard-basic" name="memId" value={memform.values.memId} color={memform.errors.memId == undefined ? "primary" : "error"} label={memform.errors.memId == undefined ? "Member Id" : memform.errors.memId} onChange={memform.handleChange} variant="filled" />
          <Button variant="contained" type="submit" >done</Button>
          {/* onClick={()=>)} */}
        </form>
      </div>
    </div>
  )
}
function MemInfoTable({ setshowmem, memData, id, barrowInfo }) {

  let navigate = useNavigate()

  let postData = ((ele) => {
    let res = barrowInfo
    res.splice(ele, 1)
    console.log(res);


    fetch(`https://6397271477359127a02e817e.mockapi.io/books/${id}`, {
      method: "PUT",
      body: JSON.stringify({ barrowed: res }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(() => navigate("/dashboard"))
  })

  return (
    <div className="barrow-cont" onDoubleClick={() => setshowmem(false)}>
      <div className="barrowed-field barrowed-mem">
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>

                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Phone no
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    Return
                  </TableCell>


                </TableRow>
              </TableHead>
              <TableBody>
                {barrowInfo.length == 0 ?


                  <TableRow hover role="checkbox">
                    <div className="barrow-msg">
                    <h1 >No One  Barrowed This Book</h1>

                  </div>
                </TableRow >
              
            :null}
              {memData.map((mem) => barrowInfo.map((val, index) => {
                {

                  if (val == mem.id) {
                    return (
                      <TableRow hover role="checkbox">

                        <TableCell>
                          {mem.memname}
                        </TableCell>
                        <TableCell>
                          {mem.email}
                        </TableCell> <TableCell>
                          {mem.phone}
                        </TableCell>
                        <TableCell>
                          <Button color="error" onClick={() => postData(index)}>return</Button>
                        </TableCell>
                      </TableRow>
                    )
                  }

                }
              }))}


            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={() => setshowmem(false)}>back</Button>
        <TablePagination

        />

      </Paper>

    </div>
    </div >
  )
}