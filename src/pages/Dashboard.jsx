import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BreadcrumbsNav from '../components/BreadcrumbsNav';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState('');


  const handleAddTask = () => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: newTask,
        completed: false,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRows((prevRows) => [...prevRows, data]);
        setOpenDialog(false);
        setNewTask('');
      })
      .catch((error) => console.error('Error adding task:', error));    

  }
 
 
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
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
        <Button variant="contained" startIcon={<AddIcon />} sx={{ mb: 2 }} onClick={() => setOpenDialog(true)}>
          Add Task
        </Button>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Title"
              fullWidth
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleAddTask}>Add</Button>
          </DialogActions>
        </Dialog>

        <DataGrid autoHeight rows={rows} columns={columns} pageSize={5} />
      </Box>
    </>
  );
};

export default Dashboard;