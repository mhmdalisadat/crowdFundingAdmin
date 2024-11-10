import { Box } from '@mui/material';
import UseCartId from 'src/hooks/card_id';
import { useEffect, useState } from 'react';
import { DeleteModal } from 'src/components/modal';
import Styles from '../style.jsx/manageStyle';
import ShareholderFeature from '../featuer/shareholderfeature';
import ShareHolderButton from '../featuer/ShareHolderButton';
import useGetShereholder from '../service/useGetShareholder';

const singleFile = {
  name: '',
  national_code: '',
  percent: '',
  phone: '',
  lock: false,
};

const ShareholderPage = () => {
  const { cartId } = UseCartId();

  const [formSections, setFormSections] = useState([singleFile]);
  const [fetchedData, setFetchedData] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { data, isPending, isError } = useGetShereholder(cartId);

  useEffect(() => {
    if (!isError && data && !isPending) {
      setFetchedData(data.data || [singleFile]);
    }
  }, [data, isError, isPending]);

  useEffect(() => {
    if (fetchedData.length) {
      setFormSections(fetchedData);
    }
  }, [fetchedData]);

  const handleAddSection = () => {
    setFormSections([...formSections, { ...singleFile }]);
  };

  const handleRemoveSection = () => {
    if (deleteIndex !== null) {
      setFormSections(formSections.filter((_, i) => i !== deleteIndex));
      setDeleteIndex(null);
    }
    setOpenModal(false);
  };

  const handleOpenDialog = (index) => {
    setDeleteIndex(index);
    setOpenModal(true);
  };

  const handleChange = (index, input, value) => {
    const updatedSections = formSections.map((section, i) =>
      i === index ? { ...section, [input]: value } : section
    );
    setFormSections(updatedSections);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setDeleteIndex(null);
  };

  return (
    <div style={Styles.container}>
      <Box sx={Styles.box}>
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">سهامداران</h1>
        </div>
        {formSections.length > 0 &&
          formSections.map((section, sectionIndex) => (
            <ShareholderFeature
              key={sectionIndex}
              sectionIndex={sectionIndex}
              section={section}
              handleChange={handleChange}
              formSections={formSections}
              handleOpenDialog={handleOpenDialog}
              handleAddSection={handleAddSection}
              handleRemoveSection={handleRemoveSection}
            />
          ))}

        <ShareHolderButton handleAddSection={handleAddSection} formSections={formSections} />
      </Box>
      <DeleteModal open={openModal} onClose={handleCloseModal} onConfirm={handleRemoveSection} />
    </div>
  );
};
export default ShareholderPage;
