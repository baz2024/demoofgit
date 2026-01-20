import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BreadcrumbsNav from '../components/BreadcrumbsNav';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=1000')
      .then(response => response.json())  
      .then(data => setRows(data))
      .catch(error => console.error('Error fetching data:', error));
    }, []);
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'completed', headerName: 'Completed', width: 130, 
      renderCell: (params) => (
        params.value ? 'Yes' : 'No'
      ),
    },
  ];
  


  return (
    <>
      <Navbar onMenuClick={() => setOpen(true)} />
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <Box sx={{ p: 2 }}>
        <BreadcrumbsNav />
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5">Welcome Back!</Typography>
            <Typography variant="body1">Here are your tasks:</Typography>
          </CardContent>
        </Card>
        <DataGrid autoHeight rows={rows} columns={columns} pageSize={5} />
      </Box>
    </>
  );
};

export default Dashboard;