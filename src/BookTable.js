import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router';

export function BookTable(){
let [data,setdata] = useState(null);
useEffect(()=>{
  fetch("https://6397271477359127a02e817e.mockapi.io/books").then((res)=>res.json()).then((val)=>setdata(val))
},[])
return(
  <div>
    {data? <MainTable bookdata= {data}/> : "loading"}
  </div>
)
}


function MainTable({bookdata}) {
  
  let navigate = useNavigate()
  let [hover,sethover] = useState(true)
 
  const columns = [
    {
      id: 'name', label: 'Id',

      minWidth: 120,
      align: 'center',

    },
    {
      id: 'code', label: 'Author', minWidth: 100,
      align: 'center',
    },
    {
      id: 'population',
      label: 'Title',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: ' IsAvalable',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Borowed',
      minWidth: 120,
      align: 'center',
    },
  ];

  function createData(name, code, population, size, density) {

    return { name, code, population, size, density };
  }

  const rows = [
  
  ];

bookdata.map(val=> rows.push(createData( val.id, val.author,val.title, val.isavalable, val.barrowed.length)))

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <div className="library-table">
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 420 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 2, minWidth: column.minWidth }}
                   
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow  hover role="checkbox" tabIndex={-1} key={row.code}>
                  

                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell  onClick={()=>navigate(`/book${row.name}`)} key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper>

    </div>
  );
}