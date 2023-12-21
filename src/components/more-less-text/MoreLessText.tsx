import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export const MoreLessText = ({ text, maxChars }: { text: string; maxChars: number }) => {
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = text.length > maxChars;
  const reviewToDisplay = expanded ? text : truncateReview(text);

  function truncateReview(text: string) {
    if (shouldTruncate) {
      const truncatedText = text.slice(0, maxChars) + '...';
      return truncatedText;
    }

    return text;
  }

  const toggleText = () => {
    setExpanded(!expanded);
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
