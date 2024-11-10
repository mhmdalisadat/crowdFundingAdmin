import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';
import { Button, Tooltip, Box } from '@mui/material';
import { TbMessagePlus } from 'react-icons/tb';
import useNavigateStep from 'src/hooks/use-navigate-step';
import UseCartId from 'src/hooks/card_id';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import SendMessage from './sendMessage';

const CardList = () => {
  const { incrementPage } = useNavigateStep();
  const { setCartId } = UseCartId();
  const [cards, setCards] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [sendMessageModalOpen, setSendMessageModalOpen] = useState(false);
  const access = getCookie('access');

  const formatNumber = (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${OnRun}/api/cart/admin/`, {
          headers: { Authorization: `Bearer ${access}` },
        });
        setCards(response.data.cart || []);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    if (access) {
      fetchCards();
    }
  }, [access]);

  const handleCardClick = (id) => {
    setSelectedCardId(id);
    setCartId(id);
  };

  const handleClick = (id) => {
    setSelectedCardId(id);
    setCartId(id);
    incrementPage();
  };

  const handleModalOpen = (modalSetter, id) => {
    setSelectedCardId(id);
    modalSetter(true);
  };

  const handleDeleteClick = async () => {
    if (selectedCardId === null) return;
    try {
      await axios.delete(`${OnRun}/api/cart/admin/${selectedCardId}/`, {
        headers: { Authorization: `Bearer ${access}` },
      });
      setCards((prevCards) => prevCards.filter((card) => card.id !== selectedCardId));
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteModalOpen(false);
      setSelectedCardId(null);
    }
  };

  const handleModalClose = () => {
    setDeleteModalOpen(false);
    setSendMessageModalOpen(false);
    setSelectedCardId(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-transparent min-h-screen flex justify-center items-start">
      <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-8 lg:p-10 max-w-7xl w-full">
        <div className="bg-gray-200 text-white rounded-t-3xl p-4 sm:p-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">لیست کارت‌ها</h1>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {cards.length > 0 ? (
              cards.map((card) => (
                <Box
                  key={card.id}
                  className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 flex flex-col justify-between items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100 min-w-[240px] max-w-[320px] h-auto"
                  onClick={() => handleCardClick(card.id)}
                >
                  <div className="flex flex-col items-center space-y-4 sm:space-y-5">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                      {card.company_name}
                    </h2>
                    <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                      <p className="text-sm sm:text-base font-medium text-gray-700">
                        شناسه: {card.nationalid}
                      </p>
                      <p className="text-sm sm:text-base font-medium text-gray-700">
                        سرمایه: {formatNumber(card.registered_capital)}
                      </p>
                      <p className="text-sm sm:text-base font-medium text-gray-700">
                        شماره ثبت: {card.registration_number}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4">
                    <Tooltip title="مشاهده و ویرایش">
                      <Button
                        onClick={handleClick}
                        variant="contained"
                        color="primary"
                        style={{ textTransform: 'none' }}
                      >
                        مشاهده و ویرایش
                      </Button>
                    </Tooltip>
                    <Tooltip title="حذف کارت">
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ textTransform: 'none' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleModalOpen(setDeleteModalOpen, card.id);
                        }}
                      >
                        حذف
                      </Button>
                    </Tooltip>
                    <Tooltip title="ارسال پیام">
                      <TbMessagePlus
                        style={{ fontSize: '24px', cursor: 'pointer' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleModalOpen(setSendMessageModalOpen, card.id);
                        }}
                      />
                    </Tooltip>
                  </div>
                </Box>
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg sm:text-xl">هیچ کارتی موجود نیست</p>
            )}
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteClick}
      />

      <SendMessage
        cardSelected={selectedCardId}
        open={sendMessageModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default CardList;
