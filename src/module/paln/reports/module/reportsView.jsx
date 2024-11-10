import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { ToastContainer } from 'react-toastify';
import PlanDocumentation from '../../feature/documentation/planDocumentation';
import PlanGuarante from '../../feature/Guarante/planGuarante';
import PlanProgress from '../components/planProgress';
import PlanAudit from '../components/planAudit';
import PlanGuaranty from '../components/PlanGuaranty';

export default function ControlledToggleButtons() {
  const [selected, setSelected] = React.useState('');

  const handleToggle = (event, newSelected) => {
    setSelected(newSelected);
  };

  return (
    <div >
      <ToastContainer />

      <ToggleButtonGroup
  value={selected}
  color="primary"
  exclusive
  onChange={handleToggle}
  aria-label="text alignment"
  sx={{ display: 'flex', justifyContent: 'center', p: 4 }}
>

        <ToggleButton value="documentation" aria-label="مستندات">
          <Typography>مستندات</Typography>
        </ToggleButton>
        <ToggleButton value="guarante" aria-label="تضامین">
          <Typography>تضامین</Typography>
        </ToggleButton>
        <ToggleButton value="progress" aria-label="پیشرفت طرح">
          <Typography>پیشرفت طرح</Typography>
        </ToggleButton>
        <ToggleButton value="audit" aria-label="حسابرسی">
          <Typography>حسابرسی</Typography>
        </ToggleButton>
        <ToggleButton value="guaranty" aria-label="ضمانت نامه ها">
          <Typography>ضمانت نامه ها</Typography>
        </ToggleButton>
      </ToggleButtonGroup>

      {selected === 'documentation' && <PlanDocumentation />}
      {selected === 'guarante' && <PlanGuarante />}
      {selected === 'progress' && <PlanProgress />}
      {selected === 'audit' && <PlanAudit />}
      {selected === 'guaranty' && <PlanGuaranty />}
    </div>
  );
}
