import React from 'react';
import PropTypes from 'prop-types';
import GlobalTextField from 'src/components/fild/textfiled';
import SelectField from 'src/components/fild/selectedfiled';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const types = [
  { value: false, label: 'حقیقی' },
  { value: true, label: 'حقوقی' },
];

const movazaf = [
  { value: false, label: 'خیر' },
  { value: true, label: 'بله' },
];

const positions = [
  { value: 1, label: 'رئیس هیئت مدیره' },
  { value: 2, label: 'نایب رئیس' },
  { value: 3, label: 'عضو هیئت مدیره' },
  { value: 4, label: 'مدیرعامل' },
];

const ManagerInput = ({ section, sectionIndex, handleChange }) => (
  <>
    <GlobalTextField
      label="نام و نام خانوادگی"
      value={section.name}
      onChange={(e) => handleChange(sectionIndex, 'name', e.target.value)}
    />

    <SelectField
      id={`company-type-${sectionIndex}`}
      label="نوع "
      value={section.is_legal}
      onChange={(e) => handleChange(sectionIndex, 'is_legal', e.target.value)}
      options={types}
    />

    <SelectField
      id={`is-obliged-${sectionIndex}`}
      label="موظف"
      value={section.is_obliged}
      onChange={(e) => handleChange(sectionIndex, 'is_obliged', e.target.value)}
      options={movazaf}
    />
    <div className="mb-6">
      <FormControl fullWidth variant="outlined">
        <InputLabel id={`position-label-${sectionIndex}`}>سمت</InputLabel>
        <Select
          labelId={`position-label-${sectionIndex}`}
          id={`position-select-${sectionIndex}`}
          value={section.position}
          onChange={(e) => handleChange(sectionIndex, 'position', e.target.value)}
          label="سمت"
        >
          <MenuItem value="">
            <em>انتخاب کنید</em>
          </MenuItem>
          {positions.map((pos) => (
            <MenuItem key={pos.value} value={pos.value}>
              {pos.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
    <GlobalTextField
      label="کد ملی"
      value={section.national_code}
      onChange={(e) =>
        handleChange(sectionIndex, 'national_code', e.target.value.replace(/[^0-9]/g, ''))
      }
      inputProps={{ maxLength: 10, pattern: '[0-9]*' }}
    />

    {section.is_legal && (
      <GlobalTextField
        label="شناسه ملی شرکت"
        value={section.national_id}
        onChange={(e) =>
          handleChange(sectionIndex, 'national_id', e.target.value.replace(/[^0-9]/g, ''))
        }
        inputProps={{ maxLength: 10, pattern: '[0-9]*' }}
      />
    )}

    {section.is_legal && (
      <GlobalTextField
        label="نماینده"
        value={section.representative}
        onChange={(e) => handleChange(sectionIndex, 'representative', e.target.value)}
      />
    )}
  </>
);

ManagerInput.propTypes = {
  handleChange: PropTypes.func,
  section: PropTypes.object,
  sectionIndex: PropTypes.number,
};

export default ManagerInput;
