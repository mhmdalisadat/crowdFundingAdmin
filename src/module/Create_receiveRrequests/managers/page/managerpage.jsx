import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import UseCartId from 'src/hooks/card_id';
import { DeleteModal } from 'src/components/modal';
import { ManagerFeature } from '../featuer';
import { fetchManager } from '../service/managerService';
import Styles from '../style.jsx/manageStyle';
import ManagerButton from '../featuer/managerbutton';

const initialSection = {
  name: '',
  position: '',
  national_code: '',
  national_id: '',
  phone: '',
  representative: '',
  is_legal: false,
  is_obliged: false,
  lock: false,
};

const ManagerPage = () => {
  const { cartId } = UseCartId();
  const [formSections, setFormSections] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const { data, status } = useQuery({
    queryKey: ['userMessage', cartId],
    queryFn: () => fetchManager(cartId),
  });

  useEffect(() => {
    if (status === 'success' && data) {
      const fetchedSections = data.length ? data : [initialSection];
      setFormSections(fetchedSections);
    }
  }, [data, status]);

  const handleAddSection = () => {
    setFormSections([...formSections, initialSection]);
  };

  const handleRemoveSection = (index) => {
    setSelectedIndex(index);
    setOpenModal(true);
  };

  const confirmRemoveSection = () => {
    if (selectedIndex !== null) {
      setFormSections(formSections.filter((_, i) => i !== selectedIndex));
    }
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedIndex(null);
  };

  const handleChange = (index, input, value) => {
    const updatedSections = formSections.map((section, i) =>
      i === index ? { ...section, [input]: value } : section
    );
    setFormSections(updatedSections);
  };

  if (status === 'loading') {
    return (
      <Box sx={Styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={Styles.container}>
      <Box sx={Styles.box}>
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">اطلاعات مدیران</h1>
        </div>
        <Box sx={Styles.formContainer}>
          {formSections.map((section, sectionIndex) => (
            <ManagerFeature
              key={sectionIndex}
              section={section}
              sectionIndex={sectionIndex}
              handleChange={handleChange}
              handleRemoveSection={handleRemoveSection}
              formSections={formSections}
            />
          ))}
          <ManagerButton formSections={formSections} handleAddSection={handleAddSection} />
        </Box>
      </Box>
      <DeleteModal open={openModal} onClose={handleCloseModal} onConfirm={confirmRemoveSection} />
    </div>
  );
};

export default ManagerPage;
