import { Slider } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { FormValue } from '../../../types/accommodation.types';

type PriceRangeProps = {
  value: FormValue;
  setValue: React.Dispatch<React.SetStateAction<FormValue>>;
};

function PriceRangeSlider({ value, setValue }: PriceRangeProps) {
  const { minPrice, maxPrice, totalMaxPrice, totalMinPrice } = value;
  const minMaxPriceValues = useMemo(
    () => [Number(minPrice), Number(maxPrice)],
    [maxPrice, minPrice]
  );

  const handleChange = useCallback(
    (_event: Event, newValue: number | number[]) => {
      setValue((prev) => {
        if (Array.isArray(newValue)) {
          return {
            ...prev,
            minPrice: newValue[0].toString(),
            maxPrice: newValue[1].toString(),
          };
        }
        return prev;
      });
    },
    [setValue]
  );

  return (
    <Slider
      value={minMaxPriceValues}
      max={totalMaxPrice}
      min={totalMinPrice}
      onChange={handleChange}
      valueLabelDisplay="off"
      disableSwap
    />
  );
}

export default PriceRangeSlider;
