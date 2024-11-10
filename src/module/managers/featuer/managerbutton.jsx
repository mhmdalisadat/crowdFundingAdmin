import { Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AddFormButton, SubmitButton } from 'src/components/button';
import UseCartId from 'src/hooks/card_id';
import useNavigateStep from 'src/hooks/use-navigate-step';
import PropTypes from 'prop-types';
import { sendManager } from '../service/managerService';

const ManagerButton = ({ formSections, handleAddSection }) => {
  const { cartId } = UseCartId();
  const { incrementPage } = useNavigateStep();
  const mutation = useMutation({
    mutationKey: ['set management'],
    mutationFn: (sections) => sendManager(cartId, sections),
  });
  const handleSubmit = () => {
    mutation.mutateAsync(formSections).then(() => incrementPage());
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
      <div className="flex justify-center gap-3">
        <AddFormButton onClick={handleAddSection} />
      </div>
      <SubmitButton onClick={handleSubmit} />
    </Box>
  );
};

ManagerButton.propTypes = {
  formSections: PropTypes.array,
  handleAddSection: PropTypes.func,
};

export default ManagerButton;
