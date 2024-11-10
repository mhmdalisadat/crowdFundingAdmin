import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import { TbMessagePlus } from 'react-icons/tb';
import { motion } from 'framer-motion';
import usePostFinish from '../service/usePostFinish';

const CardFeature = ({
  card,
  handleCardClick,
  handleClick,
  openDeleteModal,
  setSendMessageModalOpen,
  handleModalOpen,
}) => {
  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const { mutate } = usePostFinish(card.id);
  const handleFinish = () => {
    mutate({
      cartId: card.id,
      finish_cart: !card.finish_cart,
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="flex justify-center items-center"
    >
      <Box
        className="bg-white shadow-lg rounded-3xl p-4 flex flex-col justify-between items-center cursor-pointer transition-all duration-300 hover:shadow-2xl w-full max-w-[350px]"
        onClick={() => handleCardClick(card.id)}
      >
        <div className="flex justify-end w-full mb-4">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              openDeleteModal();
            }}
            style={{
              borderRadius: '50%',
              minWidth: '45px',
              height: '45px',
            }}
          >
            <span style={{ fontSize: '18px', color: '#ff5c5c' }}>❌</span>
          </Button>
        </div>

        <div className="flex flex-col items-center text-center mb-6 space-y-2">
          <Typography variant="h5" className="font-bold text-gray-800">
            {card.company_name || 'بدون نام'}
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            شناسه: {card.nationalid}
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            سرمایه: {formatNumber(card.registered_capital)} ریال
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            شماره ثبت: {card.registration_number}
          </Typography>
        </div>

        <div className="flex justify-center gap-4 mb-4">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleClick(card.id);
            }}
            variant="contained"
            color="primary"
            className="px-4 py-2 text-sm sm:text-base"
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            مشاهده و ویرایش
          </Button>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleFinish();
            }}
            variant="outlined"
            className="px-4 py-2 text-sm sm:text-base"
          >
            {card.finish_cart ? 'شروع' : 'اتمام'}
          </Button>
        </div>

        <div className="flex justify-center mt-2">
          <TbMessagePlus
            style={{ fontSize: '28px', cursor: 'pointer', color: '#007bff' }}
            onClick={(e) => {
              e.stopPropagation();
              handleModalOpen(setSendMessageModalOpen, card.id);
            }}
          />
        </div>
      </Box>
    </motion.div>
  );
};

CardFeature.propTypes = {
  card: PropTypes.object.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  handleModalOpen: PropTypes.func.isRequired,
  setSendMessageModalOpen: PropTypes.func.isRequired,
};

export default CardFeature;
