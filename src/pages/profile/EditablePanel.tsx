import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';

type EditablePanelType = {
  panelHeading: string;
  initialValue: string;
  renderProps: (collapse: () => void) => JSX.Element;
};

const EditablePanel = ({ panelHeading, renderProps, initialValue }: EditablePanelType) => {
  const [expanded, setExpanded] = useState(false);

  const collapsePanel = () => {
    setExpanded(false);
  };

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Box py={4} borderBottom={'1px solid'} borderColor={'darkGrey.light'}>
      <Stack direction={'row'} gap={4} justifyContent={'space-between'} alignItems={'center'}>
        <Typography>{panelHeading}</Typography>
        <Button
          disableRipple
          size="small"
          sx={{
            'minWidth': 0,
            'fontSize': '0.875rem',
            'fontWeight': 700,
            'textTransform': 'none',
            'textDecoration': 'underline',
            '&:hover': { bgcolor: 'transparent', color: 'secondary.main' },
          }}
          onClick={handleToggle}
        >
          {expanded ? 'Cancel' : 'Edit'}
        </Button>
      </Stack>
      {expanded ? (
        renderProps(collapsePanel)
      ) : (
        <Typography variant={'sm'} color={'darkGrey.main'}>
          {initialValue}
        </Typography>
      )}
    </Box>
  );
};

export default EditablePanel;
