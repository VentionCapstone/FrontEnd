import { Slider } from '@mui/material';
import { FormValue } from '../../../types/accommodation.types';

type PriceRangeProps = {
  value: FormValue;
  setValue: React.Dispatch<React.SetStateAction<FormValue>>;
};

function PriceRangeSlider({ value, setValue }: PriceRangeProps) {
  const { minPrice, maxPrice, totalMaxPrice, totalMinPrice } = value;

  const handleChange = (_event: Event, newValue: number | number[]) => {
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
  };

  return (
    <Slider
      value={[Number(minPrice), Number(maxPrice)]}
      max={totalMaxPrice}
      min={totalMinPrice}
      onChange={handleChange}
      valueLabelDisplay="off"
      disableSwap
    />
  );
}

export default PriceRangeSlider;
