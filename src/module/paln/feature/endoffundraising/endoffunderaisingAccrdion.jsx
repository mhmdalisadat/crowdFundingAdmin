/* eslint-disable react/button-has-type */
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EndOffUndraisingPage from './feature/endoffundraising';
import ParticipentAccrdion from './feature/participentAccrdion';

export default function ControlledAccordionsEnd() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>پایان جمع آوری وجه</Typography>
          <Typography sx={{ color: 'text.secondary' }}>جمع آوری وجه</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <EndOffUndraisingPage />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>مشارکت کننده ها</Typography>
          <Typography sx={{ color: 'text.secondary' }}>مشارکت</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <ParticipentAccrdion/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
