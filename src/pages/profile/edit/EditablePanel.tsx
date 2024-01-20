import { Box, Button, Stack, Typography } from '@mui/material';
import i18n from '@src/i18n/i18n';
import { AccountEditPersonalInfo } from '@src/types/i18n.types';
import { useState } from 'react';

type EditablePanelType = {
  panelHeading: string;
  initial: JSX.Element;
  editable: (collapse: () => void) => JSX.Element;
};

const EditablePanel = ({ panelHeading, editable, initial }: EditablePanelType) => {
  const [expanded, setExpanded] = useState(false);

  const collapsePanel = () => {
    setExpanded(false);
  };

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Box py={4} borderBottom={'1px solid'} borderColor={'secondary2.light'}>
      <Stack direction={'row'} gap={4} justifyContent={'space-between'} alignItems={'center'}>
        <Typography fontWeight={600}>{panelHeading}</Typography>
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
          {expanded ? 'Cancel' : `${i18n.t(AccountEditPersonalInfo.edit_name)}`}
        </Button>
      </Stack>
      {expanded ? editable(collapsePanel) : initial}
    </Box>
  );
};

export default EditablePanel;
