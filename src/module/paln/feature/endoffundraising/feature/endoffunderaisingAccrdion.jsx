import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import EndOffUndraisingPage from './endoffundraising';
import ParticipentAccrdion from './participentAccrdion';

export default function ControlledToggleButtons() {
  const [selected, setSelected] = React.useState(null);

  const handleToggle = (event, newSelected) => {
    setSelected(newSelected);
  };

  return (
    <div>
      <ToggleButtonGroup
        value={selected}
        color="primary"
        exclusive
        onChange={handleToggle}
        aria-label="text formatting"
        sx={{ marginBottom: 2, display: 'flex', justifyContent: 'center', marginTop: 6 }}
      >
        <ToggleButton value="panel1" aria-label="end fundraising">
          پایان جمع آوری وجه
        </ToggleButton>
        <ToggleButton value="panel2" aria-label="send participants">
          ارسال مشارکت کننده ها به فرابورس
        </ToggleButton>
      </ToggleButtonGroup>

      {selected === 'panel1' && <EndOffUndraisingPage />}
      {selected === 'panel2' && <ParticipentAccrdion />}
    </div>
  );
}
