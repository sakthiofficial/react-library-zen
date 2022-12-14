// import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {  useFormik } from "formik";
import * as yup from "yup";
export function AddBook() {
  let bookValidate = yup.object({
    title:yup.string().min(4,"Enter Valid book name").required("enter book name"),
    author:yup.string().min(3,"Enter Valid Author Name").required("enter book name"),
    isavalable:yup.string().required("yes or no").max(3)
  })
  let bookform = useFormik({
   initialValues:{
    title:"",
    author:"",
    isavalable:"",
   },
    validationSchema:bookValidate,
    onSubmit: (values)=>{
      postData(values.title,values.author,values.isavalable)
    }
  })
  let navigate = useNavigate()

//   let[title,settitle] =useState()
//   let[author,setauthor] =useState()
//   let[avalable,setavalable] =useState()

let postData = ((title,author,avalable)=>{
  let bookData = {
    title:title,
    author:author,
    isavalable:avalable,
    barrowed:[]
  }
  fetch("https://6397271477359127a02e817e.mockapi.io/books",{
    method:"POST",
    body:JSON.stringify(bookData),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
  }
  }).then(()=>navigate("/"))
})
  return (
    <div className="form-area">
      <div className="form-area__img">
        <img src="https://img.freepik.com/free-vector/book-readers-concept_74855-6263.jpg?w=1060&t=st=1670828336~exp=1670828936~hmac=3f1b8b1cc745a51c9e4d451822f00b793a816b2f99cb930dffe3b992a14a5115" alt="book-form" />

      </div>
      <div className="form-area__form" >
        <h1> ADD BOOK</h1>
        <form onSubmit={bookform.handleSubmit}>
         
          <TextField id="outlined-basic" name="title" color={bookform.errors.title == undefined ?"primary" : "error"} label= {bookform.errors.title == undefined ? "Title":bookform.errors.title} onChange={bookform.handleChange}  value = {bookform.title}  variant="outlined" />
          <TextField id="outlined-basic" name="author" onChange={bookform.handleChange} color={bookform.errors.author == undefined ?"primary" : "error"} label= {bookform.errors.author == undefined ? "Author":bookform.errors.author}  value = {bookform.author}  variant="outlined" />

          <TextField  id="outlined-basic" name="isavalable" onChange={bookform.handleChange}color={bookform.errors.isavalable == undefined ?"primary" : "error"} label= {bookform.errors.isavalable == undefined ? "IsAvalable":bookform.errors.isavalable}  value = {bookform.avalable} variant="outlined" />
          <div className="form-area__form_btn">
          <Button type="submit" variant="contained" >Submit</Button>
          </div>

        </form>
      </div>
    </div>
  );
}
