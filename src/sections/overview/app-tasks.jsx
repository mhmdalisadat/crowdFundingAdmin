import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';

const taskList = [
  { id: '1', name: 'پاس کردن چک ها', date: '1403/11/04' },
  { id: '2', name: 'برسی بتن', date: '1403/11/04' },
  { id: '3', name: 'برسی فولاد', date: '1403/11/04' },
  { id: '4', name: 'برسی', date: '1403/11/04' },
  { id: '5', name: 'برسی بتن', date: '1403/11/04' },
];

const taskList2 = [
  { id: '1', name: 'سود دی ماه', date: '1403/11/04' },
  { id: '2', name: 'سود مهرماه', date: '1403/11/04' },
  { id: '3', name: 'برسی سود ابان ماه', date: '1403/11/04' },
];

export default function AnalyticsTasks({ title, subheader, ...other }) {
  const [selectedTasks, setSelectedTasks] = useState({ list1: ['2'], list2: [] });

  const handleClickComplete = (taskId, list) => {
    setSelectedTasks((prev) => ({
      ...prev,
      [list]: prev[list].includes(taskId)
        ? prev[list].filter((value) => value !== taskId)
        : [...prev[list], taskId],
    }));
  };

  return (
    <Card {...other} sx={{ p: 2, mt: 2 }}>
      <CardHeader title={title} subheader={subheader} />

      <Typography variant="h6" sx={{ mt: 2, mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
        لیست دریافت وصول چک
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>نام</TableCell>
              <TableCell>تاریخ</TableCell>
              <TableCell align="right">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskList.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                checked={selectedTasks.list1.includes(task.id)}
                onChange={() => handleClickComplete(task.id, 'list1')}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" sx={{ mt: 4, mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
        لیست واریز سود ها
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>نام</TableCell>
              <TableCell>تاریخ</TableCell>
              <TableCell align="right">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskList2.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                checked={selectedTasks.list2.includes(task.id)}
                onChange={() => handleClickComplete(task.id, 'list2')}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

AnalyticsTasks.propTypes = {
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function TaskItem({ task, checked, onChange }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <TableRow
      sx={{
        textDecoration: checked ? 'line-through' : 'none',
        opacity: checked ? 0.6 : 1,
      }}
    >
      <TableCell>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={onChange} />}
          label={task.name}
          sx={{ m: 0 }}
        />
      </TableCell>

      <TableCell>
        <Typography variant="body2">{task.date}</Typography>
      </TableCell>

      <TableCell align="right">
        <IconButton color={open ? 'inherit' : 'default'} onClick={handleOpenMenu}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:checkmark-circle-2-fill" sx={{ mr: 2 }} />
          Mark Complete
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="solar:pen-bold" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="solar:share-bold" sx={{ mr: 2 }} />
          Share
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </TableRow>
  );
}

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.object,
};
