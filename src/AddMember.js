import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import {  useFormik } from "formik";
import * as yup from "yup";

const memberValidate =  yup.object({
  memname:yup.string().min(2,"name atleast 3 characters").required("enter name"),
   email: yup.string().min(6).required().email(),
   phone: yup.number().min(10,"Enter Valid Number").required(),


})
export function AddMember() {
  let navigate = useNavigate()
  // let[name,setname] =useState()
  // let[email,setemail] =useState()
  // let[phone ,setphone] =useState()
  
  let formik = useFormik({
    initialValues:{
      memname:"",
      email:"",
      phone:"",
    },
    validationSchema:memberValidate,
    onSubmit:(values)=>{
     postData(values.memname,values.email,values.phone)
    }
  })

let postData = ((name,email,phone)=>{
  let memberData = {
    memname:name,
    email:email,
    phone:phone ,
    barrowed:[]
  }
  fetch("https://6397271477359127a02e817e.mockapi.io/memebers",{
    method:"POST",
    body:JSON.stringify(memberData),
    headers: {
      "Content-type": "application/json; charset=UTF-8"

}}).then(()=>navigate("/"))
})
console.log(formik.errors );

  return (
    <div className="form-area" onSubmit={formik.handleSubmit}>
      <div className="form-area__img">
        <img src="https://img.freepik.com/free-vector/forms-concept-illustration_114360-4957.jpg?w=740&t=st=1670829808~exp=1670830408~hmac=31a720501ff4077eb30d557ef95ae246743fc8ac1dfa357fbe28e681a06a4fd9" alt="memeber-form" />

      </div>
      <div className="form-area__form">
        <h1> ADD Memeber</h1>
        <form>
         
         <TextField type ="text" id="outlined-basic"  onChange={formik.handleChange} name="memname" value = {formik.values.memname}  color={formik.errors.memname == undefined ?"primary" : "error"} label= {formik.errors.memname == undefined ? "Name":formik.errors.memname} variant="outlined" />
         
         <TextField id="outlined-basic"onChange={formik.handleChange} color={formik.errors.email== undefined ?"primary" : "error"} name ="email"  value = {formik.values.email}label={formik.errors.email == undefined ? "Email":formik.errors.email} variant="outlined" />

         <TextField  id="outlined-basic"onChange={formik.handleChange}color={formik.errors.phone == undefined ?"primary" : "error"}name ="phone" value = {formik.values.phone }label={formik.errors.phone == undefined ? "Phone number":formik.errors.phone} variant="outlined" />
         <div className="form-area__form_btn">
         <Button type="submit" variant="contained" >Submit</Button>
         </div>

       </form>
      </div>
    </div>
  );
}


