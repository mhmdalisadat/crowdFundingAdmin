/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useGetManagement from '../hook/useGetmanagement';
import Row from '../component/row';
import { getCookie } from 'src/api/cookie'; // اطمینان حاصل کنید که این ماژول را به درستی وارد کرده‌اید
import { toast } from 'react-toastify'; // اطمینان حاصل کنید که این ماژول را به درستی وارد کرده‌اید
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';

const Attachement = ({ id }) => {
  const { data } = useGetManagement(id);
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (data) {
      const updatedList = data.map(item => ({
        national_code: item.national_code
      }));
      setResumeList(updatedList);
    }
  }, [data]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', data.name || "");
      formData.append('national_code', data.national_code || "");
      
      const accessApi =  getCookie('accessApi');
      const response = await axios.post(`${OnRun}/api/resume/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${accessApi}`,
        },
        maxBodyLength: Infinity
      });
      
      if (response.status === 200 || response.status === 201) {
        toast.success('اطلاعات با موفقیت ارسال شد.');
      }
    } catch (error) {
      toast.error('خطا در ارسال اطلاعات.');
    }
  };

  useEffect(() => {
    if (data) {
      handleSubmit();
    }
  }, [data]);

  return (
    <>
      {data && data.map((item, index) => (
        <Row
          key={index}
          index={index}
          list={resumeList}
          item={item}
          setList={setResumeList}
        />
      ))}
    </>
  );
};

Attachement.propTypes = {
  id: PropTypes.number,
};

export default Attachement;
