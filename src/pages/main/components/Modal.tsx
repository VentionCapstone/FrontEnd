import { ChangeEvent, useCallback, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import {
  Button,
  Backdrop,
  Modal,
  Fade,
  Typography,
  Box,
  Slider,
  TextField,
  Stack,
} from '@mui/material';
import { FormValue, MainModalProps } from '../../../types/accommodation.types';
import SortBox from './SortBox';
import { roomsAndPeopleQuantity, sortOptions } from './data.constants';
import { modalStyles } from './Modal.styles';

export default function MainModal({
  open,
  setOpen,
  filters,
  setFilters,
  priceRange,
}: MainModalProps) {
  const { totalMinPrice, totalMaxPrice } = priceRange;
  const { people, rooms, minPrice, maxPrice, orderByPrice, orderByRooms, orderByPeople } = filters;

  const [value, setValue] = useState<FormValue>({
    minPrice: minPrice !== '0' ? minPrice : totalMinPrice.toString(),
    maxPrice: maxPrice !== '0' ? maxPrice : totalMaxPrice.toString(),
    totalMinPrice: totalMinPrice,
    totalMaxPrice: totalMaxPrice,
    minRooms: rooms && rooms !== '0' ? rooms : '0',
    minPeople: people && people !== '0' ? people : '0',
    orderByPrice: orderByPrice,
    orderByPeople: orderByPeople,
    orderByRooms: orderByRooms,
  });

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
  const handleClose = () => setOpen(false);

  const handlePriceChange = useCallback(
    (newValue: string, valueType: 'min' | 'max') => {
      const regex = /^[0-9\b]+$/;
      const inputValue = Number(newValue);

      if (!regex.test(newValue)) return;

      let minLimit: number, maxLimit: number;

      if (valueType === 'min') {
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

  const handleClick = () => {
    handleClose();

    const filters = {
      minPrice: value.minPrice,
      maxPrice: value.maxPrice,
      rooms: value.minRooms,
      people: value.minPeople,
      orderByPrice: value.orderByPrice,
      orderByPeople: value.orderByPeople,
      orderByRooms: value.orderByRooms,
    };

    const searchParams = new URLSearchParams(filters);

    setFilters(searchParams);
  };

  const handleSelect = (id: number | string, filterName: string) => {
    setValue((prev) => ({ ...prev, [filterName]: id }));
  };

  const handleClear = () => {
    const filters = {
      minPrice: '0',
      maxPrice: value.totalMaxPrice.toString(),
      rooms: '0',
      people: '0',
      orderByPrice: 'any',
      orderByPeople: 'any',
      orderByRooms: 'any',
    };

    const searchParams = new URLSearchParams(filters);

    setFilters(searchParams);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyles.modalContainer}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            flexGrow={'0'}
          >
            <Typography variant="lg">Filter</Typography>
            <Button
              disableRipple
              disableFocusRipple
              sx={modalStyles.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </Button>
          </Stack>
          <Stack
            rowGap={4}
            marginTop={'1rem'}
            flexGrow={'1'}
            sx={{
              overflowY: 'auto',
            }}
          >
            <Box>
              <Typography>Price Range</Typography>
              <Typography variant={'sm'}>Nightly prices before fees and taxes</Typography>
              <Box sx={modalStyles.sliderContainer}>
                <Slider
                  value={[Number(value.minPrice), Number(value.maxPrice)]}
                  max={value.totalMaxPrice}
                  min={value.totalMinPrice}
                  onChange={handleChange}
                  valueLabelDisplay="off"
                  disableSwap
                />
                <Box sx={modalStyles.buttonContainer}>
                  <TextField
                    label="Minimum"
                    variant="outlined"
                    fullWidth
                    value={value.minPrice}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handlePriceChange(e.target.value, 'min')
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
                      handlePriceChange(e.target.value, 'max')
                    }
                  />
                </Box>
              </Box>
            </Box>
            <SortBox
              title="Rooms"
              options={roomsAndPeopleQuantity}
              minItem={value.minRooms}
              handleSelect={(id) => handleSelect(id, 'minRooms')}
            />
            <SortBox
              title="People"
              options={roomsAndPeopleQuantity}
              minItem={value.minPeople}
              handleSelect={(id) => handleSelect(id, 'minPeople')}
            />
            <Box mb={'1rem'}>
              <Typography variant="lg">Sort</Typography>
              <SortBox
                title="Price"
                options={sortOptions}
                minItem={value.orderByPrice}
                handleSelect={(id) => handleSelect(id, 'orderByPrice')}
              />
              <SortBox
                title="Rooms"
                options={sortOptions}
                minItem={value.orderByRooms}
                handleSelect={(id) => handleSelect(id, 'orderByRooms')}
              />
              <SortBox
                title="People"
                options={sortOptions}
                minItem={value.orderByPeople}
                handleSelect={(id) => handleSelect(id, 'orderByPeople')}
              />
            </Box>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            columnGap={'1rem'}
            marginTop={'2rem'}
            flexGrow={'0'}
          >
            <Button variant="contained" onClick={handleClear}>
              Clear
            </Button>
            <Button variant="contained" onClick={handleClick}>
              Filter
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
