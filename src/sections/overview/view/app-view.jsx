import Container from '@mui/material/Container';
import AppWidgetSummary from '../app-widget-summary';
import AnalyticsTasks from '../app-tasks';

export default function AppView() {
  return (
    <Container maxWidth="xl">
   
      <AppWidgetSummary />
      <AnalyticsTasks />
    </Container>
  );
}
