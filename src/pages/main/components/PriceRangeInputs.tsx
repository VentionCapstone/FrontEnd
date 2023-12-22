import { Box, TextField } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { modalStyles } from './Modal.styles';
import { FormValue } from '../../../types/accommodation.types';
import { PRICE_RANGE } from './data.constants';

type PriceRangeInputsProps = {
  value: FormValue;
  setValue: React.Dispatch<React.SetStateAction<FormValue>>;
  filters: Record<string, string>;
};

function PriceRangeInputs({ value, setValue, filters }: PriceRangeInputsProps) {
  const handlePriceChange = useCallback(
    (newValue: string, valueType: 'min' | 'max') => {
      const regex = /^[0-9\b]+$/;
      const inputValue = Number(newValue);

      if (!regex.test(newValue)) return;

      let minLimit: number, maxLimit: number;

      if (valueType === PRICE_RANGE.min) {
        minLimit = Number(filters.totalMinPrice);
        maxLimit = value.totalMaxPrice;
      } else {
        minLimit = value.totalMinPrice;
        maxLimit = Number(filters.totalMaxPrice);
      }

      if (inputValue < Number(minLimit)) {
        setValue((prev) => ({
          ...prev,
          [`${valueType}Price`]: minLimit,
        }));
      } else if (inputValue > maxLimit) {
        setValue((prev) => ({
          ...prev,
          [`${valueType}Price`]: maxLimit,
        }));
      } else {
        setValue((prev) => ({
          ...prev,
          [`${valueType}Price`]: inputValue.toString(),
        }));
      }
    },
    [filters, value, setValue]
  );
  return (
    <Box sx={modalStyles.buttonContainer}>
      <TextField
        label="Minimum"
        variant="outlined"
        fullWidth
        value={value.minPrice}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handlePriceChange(e.target.value, PRICE_RANGE.min)
        }
      />
      <Box>
        <HorizontalRuleIcon fontSize="large" />
      </Box>
      <TextField
        label="Maximum"
        variant="outlined"
        fullWidth
        value={value.maxPrice}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handlePriceChange(e.target.value, PRICE_RANGE.max)
        }
      />
    </Box>
  );
}

export default PriceRangeInputs;
