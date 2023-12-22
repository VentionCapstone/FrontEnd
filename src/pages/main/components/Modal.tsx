import { useCallback, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Modal, Fade, Typography, Box, Stack } from '@mui/material';
import { FormValue, MainModalProps } from '../../../types/accommodation.types';
import SortBox from './SortBox';
import { roomsAndPeopleQuantity, sortOptions } from './data.constants';
import { modalStyles } from './Modal.styles';
import PriceRangeSlider from './PriceRangeSlider';
import PriceRangeInputs from './PriceRangeInputs';

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

  const filterValues = useMemo(
    () => ({
      minPrice: value.minPrice,
      maxPrice: value.maxPrice,
      rooms: value.minRooms,
      people: value.minPeople,
      orderByPrice: value.orderByPrice,
      orderByPeople: value.orderByPeople,
      orderByRooms: value.orderByRooms,
    }),
    [value]
  );

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const handleClick = useCallback(() => {
    handleClose();

    const searchParams = new URLSearchParams(filterValues);
    setFilters(searchParams);
  }, [filterValues, handleClose, setFilters]);

  const handleClear = useCallback(() => {
    const defaultFilters = {
      minPrice: '0',
      maxPrice: value.totalMaxPrice.toString(),
      rooms: '0',
      people: '0',
      orderByPrice: 'any',
      orderByPeople: 'any',
      orderByRooms: 'any',
    };

    const searchParams = new URLSearchParams(defaultFilters);

    setFilters(searchParams);
    handleClose();
  }, [value, setFilters, handleClose]);

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
                <PriceRangeInputs value={value} setValue={setValue} filters={filters} />
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
                minItem={value.orderByRooms}
                setValue={setValue}
                name={'orderByRooms'}
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
