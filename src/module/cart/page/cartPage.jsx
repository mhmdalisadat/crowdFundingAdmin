import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; 
import UseCartId from 'src/hooks/card_id';
import useNavigateStep from 'src/hooks/use-navigate-step';
import { DeleteModal } from 'src/components/modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MessagePage from 'src/module/Create_receiveRrequests/message/page';
import CardFeature from '../feature/cartfeature';
import { deleteCard } from '../service/cartService';
import useGetCards from '../service/useGetCarts';

const CardPage = () => {
  const { incrementPage } = useNavigateStep();
  const { setCartId, cartId } = UseCartId([]);
  const [cards, setCards] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sendMessageModalOpen, setSendMessageModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data, isError, isPending } = useGetCards(cartId);
  const mutation = useMutation({
    mutationFn: (id) => deleteCard(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['card', cartId]);
      setDeleteModalOpen(false);
    },
  });

  useEffect(() => {
    if (!isError && data && !isPending) {
      setCards(data?.cart || []);
    }
  }, [data, isError, isPending]);

  const handleCardClick = (id) => {
    setCartId(id);
  };

  const handleModalOpen = (modalSetter, id) => {
    setCartId(id);
    modalSetter(true);
  };

  const handleClick = (id) => {
    setCartId(id);
    incrementPage();
  };

  const handleDeleteClick = () => {
    if (cartId === null) return;
    mutation.mutate(cartId);
    setDeleteModalOpen(false);
    setCartId(null);
  };

  const handleModalClose = () => {
    setDeleteModalOpen(false);
    setSendMessageModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-transparent min-h-screen flex justify-center items-start">
      <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-8 lg:p-10 max-w-7xl w-full">
        <div className="bg-gray-200 text-white rounded-t-3xl p-4 sm:p-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">لیست درخواست ها</h1>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {cards.length > 0 &&
              cards.map((card) => (
                <motion.div
                  key={card.id}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 20,
                  }}
                >
                  <CardFeature
                    card={card}
                    handleCardClick={handleCardClick}
                    setSendMessageModalOpen={setSendMessageModalOpen}
                    handleClick={handleClick}
                    handleModalOpen={handleModalOpen}
                    setCards={setCards}
                    openDeleteModal={() => {
                      setCartId(card.id);
                      setDeleteModalOpen(true);
                    }}
                  />
                </motion.div>
              ))}
          </div>
        </div>
      </div>
      <DeleteModal
        open={deleteModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteClick}
      />
      <MessagePage cardSelected={cartId} open={sendMessageModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default CardPage;
