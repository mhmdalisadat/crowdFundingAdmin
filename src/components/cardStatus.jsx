import { FaCheckCircle, FaClock, FaQuestionCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { fetchStatus } from 'src/hook/status';
import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';

const CardStatus = ({ card, openStatusModal, cardSelected }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['shareholder', cardSelected],
    queryFn: () => fetchStatus(cardSelected),
  });
  const [formData, setFormData] = useState([]);


  

  useEffect(() => {
    if (isSuccess === 'success' && data && data.manager) {

      setFormData(data.manager.map((item) => ({ ...item})));
    } else if (isSuccess === 'error') {
      console.error('Failed to fetch resume data');
    }
  }, [data, isSuccess]);

  const getStatusChip = (status) => {
    const iconStyle = { fontSize: '18px' };
    const chipStyles = {
      borderRadius: '20px',
      fontWeight: 'bold',
      margin: '2px',
      padding: '4px 8px',
    };

    switch (status) {
      case '1':
        return (
          <Chip
            icon={<FaClock style={iconStyle} />}
            label="بررسی شرکت"
            color="warning"
            variant="outlined"
            style={chipStyles}
          />
        );
      case '2':
        return (
          <Chip
            icon={<FaCheckCircle style={iconStyle} />}
            label="بررسی مدیران"
            color="success"
            variant="outlined"
            style={chipStyles}
          />
        );
      case '3':
      case '4':
      case '5':
        return (
          <Chip
            icon={<FaQuestionCircle style={iconStyle} />}
            label="بررسی سهامداران"
            color="info"
            variant="outlined"
            style={chipStyles}
          />
        );
      default:
        return (
          <Chip
            icon={<FaQuestionCircle style={iconStyle} />}
            label="نامشخص"
            color="default"
            variant="outlined"
            style={chipStyles}
          />
        );
    }
  };


  return (
    <div
      className="flex items-center"
      role="button"
      tabIndex={0}
      onClick={() => openStatusModal(card)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          openStatusModal(card);
        }
      }}
    >
      {getStatusChip(formData.status)}
    </div>
  );
};

CardStatus.propTypes = {
  openStatusModal: PropTypes.func,
  card: PropTypes.object,
  cardSelected: PropTypes.number,
};

export default CardStatus;
