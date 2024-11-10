import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { AddFormButton, SubmitButton } from 'src/components/button';
import UseCartId from 'src/hooks/card_id';
import useNavigateStep from 'src/hooks/use-navigate-step';
import { useEffect } from 'react';
import usePostShereHolder from '../service/usePostShereholder';

const ShareHolderButton = ({ handleAddSection, formSections }) => {
  const { cartId } = UseCartId();
  const { incrementPage } = useNavigateStep();

  const {
    mutate,
    isError: isErrorPost,
    isPending: isPendingPost,
    isSuccess: isSuccessPost,
  } = usePostShereHolder(cartId);

  useEffect(() => {
    if (!isErrorPost && !isPendingPost && isSuccessPost) {
      incrementPage();
    }
  }, [incrementPage, isErrorPost, isPendingPost, isSuccessPost]);

  const handleSubmit = () => {            
    mutate({ formSections });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 3,
        width: '100%',
      }}
    >
      <div className="flex justify-center">
        <AddFormButton onClick={handleAddSection} />
      </div>
      <SubmitButton onClick={handleSubmit} />
    </Box>
  );
};

ShareHolderButton.propTypes = {
  handleAddSection: PropTypes.func,
  formSections: PropTypes.array,
};

export default ShareHolderButton;
