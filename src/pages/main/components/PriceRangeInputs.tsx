import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { Box, TextField } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';

import { ONLY_NUMBERS } from '@src/config/regexp.config';
import { FormValue } from '@src/types/accommodation.types';
import { HomeUIInfo } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';
import { modalStyles } from './Modal.styles';

type PriceRangeInputsProps = {
  value: FormValue;
  setValue: React.Dispatch<React.SetStateAction<FormValue>>;
};

function PriceRangeInputs({ value, setValue }: PriceRangeInputsProps) {
  const { t } = useTranslation();
  const handleChangeMinimumPrice = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = Number(e.target.value);

      if (!ONLY_NUMBERS.test(e.target.value)) return;
      if (inputValue > value.totalMaxPrice) return;
      if (inputValue > Number(value.maxPrice)) return;

      setValue((prev) => ({
        ...prev,
        minPrice: inputValue.toString(),
      }));
    },
    [setValue, value.totalMaxPrice, value.maxPrice]
  );

  const handleChangeMaximumPrice = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = Number(e.target.value);

      if (!ONLY_NUMBERS.test(e.target.value)) return;
      if (inputValue < Number(value.minPrice)) return;
      if (inputValue > value.totalMaxPrice) {
        setValue((prev) => ({
          ...prev,
          maxPrice: value.totalMaxPrice.toString(),
        }));
        return;
      }

      setValue((prev) => ({
        ...prev,
        maxPrice: inputValue.toString(),
      }));
    },
    [setValue, value.totalMaxPrice, value.minPrice]
  );

  return (
    <Box sx={modalStyles.buttonContainer}>
      <TextField
        label={t(HomeUIInfo.filters_button_price_price_min)}
        variant="outlined"
        fullWidth
        value={value.minPrice}
        onChange={handleChangeMinimumPrice}
      />
      <Box>
        <HorizontalRuleIcon fontSize="large" />
      </Box>
      <TextField
        label={t(HomeUIInfo.filters_button_price_price_max)}
        variant="outlined"
        fullWidth
        value={value.maxPrice}
        onChange={handleChangeMaximumPrice}
      />
    </Box>
  );
}

export default PriceRangeInputs;
