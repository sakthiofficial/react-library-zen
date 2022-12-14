import logo from './logo.svg';
import './App.css';
import { isFragmen,ForwardRef, useContext} from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Library } from './Library';
import { BookInfo } from './BookInfo';
import { MemberInfo } from './MemberInfo';
import { AddBook } from './AddBook';
import { AddMember } from './AddMember';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <div className="app-navbar">
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
      
          </IconButton>
       
          <Button path="/" color="inherit"><Link to="/">Home</Link></Button>
          <Button  color="inherit"><Link to="dashboard">Dashboard</Link></Button>

        </Toolbar>
      </AppBar>
    </Box>
        </div>
        
      <Routes>
     
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={ <Library/>}/>
          <Route path="/book:id" element={ <BookInfo/>}/>
          <Route path="/member:id" element={ <MemberInfo/>}/>
          <Route path="/addbook" element={ <AddBook/>}/>
          <Route path="/addmember" element={ <AddMember/>}>





        </Route>
      </Routes>
    </BrowserRouter>
        

    </div>
  );
}
function Home(){
  let navigate = useNavigate()
  return(
<div className='home-page'>
  <div className="home-page__img">
    
  <img src="
    https://img.freepik.com/free-vector/library-concept-illustration_114360-2788.jpg?w=740&t=st=1670663508~exp=1670664108~hmac=a3610138c970d362634608a3af38ff1af5e2cbd03b6f360d6c695d1adc802a08" alt="libray-illustaration"/>
  </div>
  <div className="home-page__cont">
 <div className='btns'>
 <Button variant="contained" onClick={()=> navigate("/addbook")} >Add Books</Button>
 <Button variant="contained" onClick={()=> navigate("/addmember")}>Add Memberes</Button>


 </div>

 <Button onClick={()=> navigate("/dashboard")} variant="contained">Library</Button>




  </div>
</div>
  )
}
export default App;
