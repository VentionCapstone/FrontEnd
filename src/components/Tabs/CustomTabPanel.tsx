import { Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  activeIndex: number;
  value: number;
}

export const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, activeIndex, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== activeIndex}
      id={`simple-tabpanel-${activeIndex}`}
      aria-labelledby={`simple-tab-${activeIndex}`}
      {...other}
    >
      {value === activeIndex && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};
