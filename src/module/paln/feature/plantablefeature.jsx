import React, { useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator_bootstrap4.min.css';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import PlanDeleteModal from './plandeleteModal';
import PlanCreateModal from './planCreateModal';
import PlanUpdateModal from './planUpdate';
import deletePlan from '../service/planService';

const PlanTableFeature = ({ planData, refetch }) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateRowData, setUpdateRowData] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ['deletePlan', selectedRow?.id],
    mutationFn: () => deletePlan(selectedRow?.id),
  });

  const handleAddOpen = () => setOpenAddModal(true);
  const handleAddClose = () => setOpenAddModal(false);

  const handleDeleteClick = () => {
    if (selectedRow) {
      setShowConfirm(true);
    }
    handleCloseContextMenu();
  };

  const handleConfirmClose = () => setShowConfirm(false);

  const handleSendDeletePlan = () => {
    mutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('حذف طرح با موفقیت انجام شد');
        refetch();
      },
    });
    setShowConfirm(false);
  };

  const handleUpdateClose = () => setOpenUpdateModal(false);

  const handleRowClick = (e, row) => {
    const rowData = row.getData();
    const { id } = rowData;
    if (id) {
      navigate(`/plandetail/${id}`);
    }
  };

  const handleContextMenu = (e, row) => {
    e.preventDefault();
    const rowData = row.getData();
    if (rowData) {
      setSelectedRow(rowData);
      setContextMenu({
        mouseX: e.clientX - 2,
        mouseY: e.clientY - 4,
      });
    }
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const formatNumber = (value) => {
    if (value == null) return '0';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };


  const columns = [
    { title: 'نام طرح', field: 'plan_name', width: 300, headerFilter: 'input' },
    { title: 'نام شرکت', field: 'company_name', width: 250, headerFilter: 'input' },
    { title: 'نماد', field: 'symbol', width: 240, headerFilter: 'input' },
    {
      title: 'مبلغ تعیین شده',
      field: 'funded_amount',
      align: 'left',
      width: 300,
      formatter: (cell) => formatNumber(cell.getValue()),
      headerFilter: 'input',
    },
    {
      title: 'سود',
      field: 'applicant_funding_percentage',
      align: 'left',
      width: 250,
      headerFilter: 'input',
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <ToastContainer />

      <Button
        variant="contained"
        color="primary"
        style={{ margin: '16px 0' }}
        onClick={handleAddOpen}
      >
        افزودن طرح
      </Button>
      <div>
        <ReactTabulator
          data={planData}
          columns={columns}
          layout="fitData"
          options={{ movableRows: true }}
          events={{
            rowClick: handleRowClick,
            rowContext: handleContextMenu,
          }}
        />
      </div>
      <PlanCreateModal refetch={refetch} open={openAddModal} onClose={handleAddClose} />
      <PlanDeleteModal
        showConfirm={showConfirm}
        handleConfirmClose={handleConfirmClose}
        handleDeleteConfirm={handleSendDeletePlan}
        isLoading={mutation.isLoading}
      />
      {updateRowData && (
        <PlanUpdateModal
          open={openUpdateModal}
          onClose={handleUpdateClose}
          item={updateRowData}
          handleInputChange={(field, value) => {
            setUpdateRowData((prev) => ({
              ...prev,
              [field]: value,
            }));
          }}
          index={planData.findIndex((row) => row.id === updateRowData.id)}
        />
      )}
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
        }
      >
        <MenuItem onClick={handleDeleteClick}>حذف</MenuItem>
      </Menu>
    </div>
  );
};

PlanTableFeature.propTypes = {
  planData: PropTypes.array.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default PlanTableFeature;
