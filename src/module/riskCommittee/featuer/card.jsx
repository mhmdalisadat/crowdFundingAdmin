import React from 'react';
import { Button, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useGetCards from 'src/module/Create_receiveRrequests/cart/service/useGetCarts';
import UseCartId from 'src/hooks/card_id';

const RiskCommitteeCards = () => {
  const navigate = useNavigate();
  const { cartId } = UseCartId();
  const { data, isLoading, isError } = useGetCards(cartId);

  const cartData = data?.cart || [];

  const handleCardClick = (id) => {
    navigate(`/riskCommittee/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <Typography variant="body2" color="error">
        خطایی در دریافت اطلاعات رخ داده است.
      </Typography>
    );
  }

  return (
    <div className="flex flex-wrap justify-start items-start gap-6 w-full">
      {Array.isArray(cartData) && cartData.length > 0 ? (
        cartData.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-between items-center cursor-pointer transition-all duration-300 hover:shadow-2xl w-full max-w-[400px] hover:bg-gray-100 mb-6"
            onClick={() => handleCardClick(item.id)}
          >
            <div className="mb-4">
              <Typography variant="h5" component="div">
                {item.company_name}
              </Typography>
            </div>
            <div className="mb-4">
              <Typography variant="body1" color="text.secondary">
                شناسه ملی: {item.nationalid}
              </Typography>
            </div>
            <div className="mb-4">
              <Typography variant="body1" color="text.secondary">
                سرمایه ثبت‌شده: {item.registered_capital} (ریال)
              </Typography>
            </div>
            <div className="mb-4">
              <Typography variant="body1" color="text.secondary">
                شماره ثبت: {item.registration_number}
              </Typography>
            </div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(item.id);
              }}
            >
              مشاهده جزئیات
            </Button>
          </motion.div>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          داده‌ای برای نمایش وجود ندارد.
        </Typography>
      )}
    </div>
  );
};

export default RiskCommitteeCards;
