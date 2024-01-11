import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { truncateReview } from '@/utils';

export const MoreLessText = ({ text, maxChars }: { text: string; maxChars: number }) => {
  const [expanded, setExpanded] = useState(false);
  const reviewToDisplay = expanded ? text : truncateReview(text, maxChars);
  const shouldTruncate = text.length > maxChars;

  const toggleText = () => {
    setExpanded((expanded) => !expanded);
  };

  return (
    <>
      <Typography>{reviewToDisplay}</Typography>

      {shouldTruncate && (
        <Button
          variant={'text'}
          disableRipple
          size="small"
          sx={{
            'mr': 'auto',
            'minWidth': 0,
            'padding': 0,
            'fontSize': '0.875rem',
            'fontWeight': 700,
            'textTransform': 'none',
            'textDecoration': 'underline',
            '&:hover': { bgcolor: 'transparent', color: 'secondary.main' },
          }}
          onClick={toggleText}
        >
          {expanded ? 'Show less' : 'Show more'}
        </Button>
      )}
    </>
  );
};
