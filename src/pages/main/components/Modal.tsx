import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Fade, Modal, Stack, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import { FormValue, MainModalProps } from '@src/types/accommodation.types';
import { HomeUIInfo } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
          <Stack direction={'row'} sx={modalStyles.modalHeader}>
            <Typography variant="lg">{t(HomeUIInfo.filters_button_filter)}</Typography>
            <Button
              disableRipple
              disableFocusRipple
              sx={modalStyles.closeButton}
              onClick={handleClose}
            >
              <CloseIcon sx={{ color: 'secondary2.main' }} />
            </Button>
          </Stack>

          <Stack
            rowGap={4}
            flexGrow={'1'}
            px={5}
            py={2}
            sx={{
              overflowY: 'auto',
            }}
          >
            <Box>
              <Typography> {t(HomeUIInfo.filters_button_price_price_range)}</Typography>
              <Typography variant={'sm'}>
                {t(HomeUIInfo.filters_button_price_price_description)}
              </Typography>
              <Box sx={modalStyles.sliderContainer}>
                <PriceRangeSlider value={value} setValue={setValue} />
                <PriceRangeInputs value={value} setValue={setValue} />
              </Box>
            </Box>
            <SortBox
              title={t(HomeUIInfo.filters_button_rooms_title)}
              options={roomsAndPeopleQuantity}
              minItem={value.minRooms}
              setValue={setValue}
              name={'minRooms'}
            />
            <SortBox
              title={t(HomeUIInfo.filters_button_people_title)}
              options={roomsAndPeopleQuantity}
              minItem={value.minPeople}
              setValue={setValue}
              name={'minPeople'}
            />
            <Box>
              <Typography variant="lg">{t(HomeUIInfo.filters_button_sort_title)}</Typography>
              <SortBox
                title={t(HomeUIInfo.filters_button_sort_price_title)}
                options={sortOptions}
                minItem={value.orderByPrice}
                setValue={setValue}
                name={'orderByPrice'}
              />
              <SortBox
                title={t(HomeUIInfo.filters_button_sort_room_title)}
                options={sortOptions}
                minItem={value.orderByRoom}
                setValue={setValue}
                name={'orderByRoom'}
              />
              <SortBox
                title={t(HomeUIInfo.filters_button_sort_people_title)}
                options={sortOptions}
                minItem={value.orderByPeople}
                setValue={setValue}
                name={'orderByPeople'}
              />
            </Box>
          </Stack>

          <Stack sx={modalStyles.modalFooter} direction={'row'}>
            <Button variant="outlined" onClick={handleFilterClear}>
              {t(HomeUIInfo.filters_button_clear_btn)}
            </Button>
            <Button variant="contained" onClick={handleFilterClick}>
              {t(HomeUIInfo.filters_button_filter_btn)}
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
