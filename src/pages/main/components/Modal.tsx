import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Fade, Modal, Stack, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import { FormValue, MainModalProps } from '@src/types/accommodation.types';
import { modalStyles } from './Modal.styles';
import PriceRangeInputs from './PriceRangeInputs';
import PriceRangeSlider from './PriceRangeSlider';
import SortBox from './SortBox';
import { roomsAndPeopleQuantity, sortOptions } from './data.constants';

export default function MainModal({
  open,
  setOpen,
  filters,
  setFilters,
  priceRange,
  setInvisible,
  location,
  checkInDate,
  checkOutDate,
}: MainModalProps) {
  const { totalMinPrice, totalMaxPrice } = priceRange;
  const { minPeople, minRooms, minPrice, maxPrice, orderByPrice, orderByRoom, orderByPeople } =
    filters;

  const [value, setValue] = useState<FormValue>({
    totalMinPrice: totalMinPrice,
    totalMaxPrice: totalMaxPrice,
    minRooms: minRooms,
    minPeople: minPeople,
    maxPrice: maxPrice === '0' ? totalMaxPrice.toString() : maxPrice,
    minPrice: minPrice === '0' ? totalMinPrice.toString() : minPrice,
    orderByPrice: orderByPrice,
    orderByPeople: orderByPeople,
    orderByRoom: orderByRoom,
    location: location,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
  });

  const { totalMinPrice: totalMinPriceValue, totalMaxPrice: totalMaxPriceValue, ...rest } = value;

  const filterValues = useMemo(
    () => ({
      ...rest,
    }),
    [rest]
  );

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const handleFilterClick = useCallback(() => {
    handleClose();

    const searchParams = new URLSearchParams(filterValues);
    setFilters(searchParams);
    setInvisible(true);
  }, [filterValues, handleClose, setFilters, setInvisible]);

  const handleFilterClear = useCallback(() => {
    const defaultFilters = {
      minPrice: totalMinPriceValue.toString(),
      maxPrice: totalMaxPriceValue.toString(),
      minRooms: '0',
      minPeople: '0',
      orderByPrice: 'any',
      orderByPeople: 'any',
      orderByRoom: 'any',
      location: location,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    };

    const searchParams = new URLSearchParams(defaultFilters);

    setFilters(searchParams);
    setInvisible(false);
    handleClose();
  }, [
    totalMinPriceValue,
    totalMaxPriceValue,
    location,
    checkInDate,
    checkOutDate,
    setFilters,
    setInvisible,
    handleClose,
  ]);

  return (
    <Modal open={open} onClose={handleClose}>
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
                <PriceRangeSlider value={value} setValue={setValue} />
                <PriceRangeInputs value={value} setValue={setValue} />
              </Box>
            </Box>
            <SortBox
              title="Rooms"
              options={roomsAndPeopleQuantity}
              minItem={value.minRooms}
              setValue={setValue}
              name={'minRooms'}
            />
            <SortBox
              title="People"
              options={roomsAndPeopleQuantity}
              minItem={value.minPeople}
              setValue={setValue}
              name={'minPeople'}
            />
            <Box mb={'1rem'}>
              <Typography variant="lg">Sort</Typography>
              <SortBox
                title="Price"
                options={sortOptions}
                minItem={value.orderByPrice}
                setValue={setValue}
                name={'orderByPrice'}
              />
              <SortBox
                title="Rooms"
                options={sortOptions}
                minItem={value.orderByRoom}
                setValue={setValue}
                name={'orderByRoom'}
              />
              <SortBox
                title="People"
                options={sortOptions}
                minItem={value.orderByPeople}
                setValue={setValue}
                name={'orderByPeople'}
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
            <Button variant="contained" onClick={handleFilterClear}>
              Clear
            </Button>
            <Button variant="contained" onClick={handleFilterClick}>
              Filter
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
