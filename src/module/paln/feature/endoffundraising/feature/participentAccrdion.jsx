/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import { useParams } from 'react-router-dom';
import usePost from 'src/module/paln/service/participantcertifit/usePostparticipant';

const ParticipentAccrdion = ({  form }) => {
    const {trace_code} = useParams();

    const { mutate, isPending, isError, isSuccess } = usePost(trace_code);

    const handleSend = () => {
        mutate({ data: form, trace_code });
    };

    return (
        <div className="flex justify-center items-center">
            <button
                onClick={handleSend}
                className="bg-blue-700 py-2 px-3 rounded-md text-white"
                disabled={isPending}
            >
                {isPending ? 'در حال ارسال...' : 'ارسال اطلاعات'}
            </button>

            {isError && <p className="text-red-500">خطا در ارسال اطلاعات</p>}
            {isSuccess && <p className="text-green-500">اطلاعات با موفقیت ارسال شد</p>}
        </div>
    );
};

export default ParticipentAccrdion;
