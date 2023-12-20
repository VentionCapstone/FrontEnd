import * as React from 'react';
import { useState } from 'react';
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
import { InputFilter, ObjType } from '../../types/accommodation.types';
import FilterChip from '../shared/FilterChip';

const style = {
  position: 'absolute' as const,

  bottom: {
    xs: '0',
    sm: 'unset',
  },
  left: {
    sm: '50%',
  },
  top: {
    sm: '50%',
  },
  width: {
    xs: '100%',
    sm: '80%',
    md: '63%',
    lg: '50%',
    xl: '40%',
  },
  transform: {
    sm: 'translate(-50%, -50%)',
  },
  bgcolor: 'background.paper',
  p: 7,
  display: 'flex',
  flexDirection: 'column' as const,
  height: {
    xs: '92%',
    sm: '85%',
  },
};

type MainModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: InputFilter;
  setFilters: React.Dispatch<React.SetStateAction<InputFilter>>;
};

type FormValue = {
  minPrice: number;
  maxPrice: number;
  minRooms: number;
  minPeople: number;
  totalMinPrice: number;
  totalMaxPrice: number;
  orderByPrice: string;
  orderByPeople: string;
  orderByRooms: string;
};

export default function MainModal({ open, setOpen, filters, setFilters }: MainModalProps) {
  const [value, setValue] = useState<FormValue>({
    minPrice: filters.curMinPrice,
    maxPrice: filters.curMaxPrice,
    totalMinPrice: filters.totalMinPrice,
    totalMaxPrice: filters.totalMaxPrice,
    minRooms: filters.rooms && filters.rooms > 0 ? filters.rooms : 0,
    minPeople: filters.people && filters.people > 0 ? filters.people : 0,
    orderByPrice: 'any',
    orderByPeople: 'any',
    orderByRooms: 'any',
  });

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue((prev) => {
      if (Array.isArray(newValue)) {
        return {
          ...prev,
          minPrice: newValue[0],
          maxPrice: newValue[1],
        };
      }
      return prev;
    });
  };
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    handleClose();
    setFilters({
      curMinPrice: value.minPrice,
      curMaxPrice: value.maxPrice,
      people: value.minPeople,
      rooms: value.minRooms,
      totalMinPrice: filters.totalMinPrice,
      totalMaxPrice: filters.totalMaxPrice,
      orderByPrice: value.orderByPrice,
      orderByPeople: value.orderByPeople,
      orderByRooms: value.orderByRooms,
    });
  };

  const handleSelect = (id: number | string, filterName: string) => {
    setValue((prev) => ({ ...prev, [filterName]: id }));
  };

  const handleClear = () => {
    setFilters((prev) => ({
      ...prev,
      minPrice: filters.totalMinPrice,
      maxPrice: filters.totalMaxPrice,
      minRooms: 0,
      minPeople: 0,
    }));
    handleClose();
  };

  return (
    <div>
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
          <Box sx={style}>
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
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  'padding': 0,
                  'display': 'flex',
                  'justifyContent': 'end',
                }}
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
                <Box
                  sx={{
                    width: {
                      xs: '85%',
                    },
                    marginX: 'auto',
                    marginTop: '1rem',
                  }}
                >
                  <Slider
                    value={[value.minPrice, value.maxPrice]}
                    max={filters.totalMaxPrice}
                    min={filters.totalMinPrice}
                    onChange={handleChange}
                    valueLabelDisplay="off"
                    disableSwap
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      columnGap: '1rem',
                      marginTop: '1rem',
                    }}
                  >
                    <TextField
                      label="Minimum"
                      variant="outlined"
                      fullWidth
                      value={value.minPrice}
                      onChange={(e) => {
                        const regex = /^[0-9\b]+$/;
                        const inputValue = Number(e.target.value);
                        if (!regex.test(e.target.value)) return;
                        if (inputValue < filters.totalMinPrice) {
                          setValue((prev) => ({ ...prev, minPrice: filters.totalMinPrice }));
                          return;
                        }
                        if (inputValue > value.totalMaxPrice) {
                          setValue((prev) => ({ ...prev, minPrice: value.totalMaxPrice }));
                          return;
                        }
                        setValue((prev) => ({ ...prev, minPrice: inputValue }));
                      }}
                    />
                    <Box>
                      <HorizontalRuleIcon fontSize="large" />
                    </Box>
                    <TextField
                      label="Maximum"
                      variant="outlined"
                      fullWidth
                      value={value.maxPrice}
                      onChange={(e) => {
                        const regex = /^[0-9\b]+$/;
                        const inputValue = Number(e.target.value);
                        if (!regex.test(e.target.value)) return;
                        if (inputValue > filters.totalMaxPrice) {
                          setValue((prev) => ({ ...prev, maxPrice: filters.totalMaxPrice }));
                          return;
                        }
                        if (inputValue < value.totalMinPrice) {
                          setValue((prev) => ({ ...prev, maxPrice: value.totalMinPrice }));
                          return;
                        }
                        setValue((prev) => ({ ...prev, maxPrice: inputValue }));
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography>Rooms</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    columnGap: '1rem',
                    rowGap: '1rem',
                    marginTop: '1rem',
                    width: {
                      '2xl': '85%',
                    },
                    marginX: 'auto',
                  }}
                >
                  {roomsAndPeopleQuantity.map((room) => (
                    <FilterChip
                      key={room.id}
                      item={room}
                      minItem={value.minRooms}
                      handleSelect={() => handleSelect(room.id, 'minRooms')}
                    />
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography>People</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    columnGap: '1rem',
                    rowGap: '1rem',
                    marginTop: '1rem',
                    width: {
                      '2xl': '85%',
                    },
                    marginX: 'auto',
                  }}
                >
                  {roomsAndPeopleQuantity.map((person) => (
                    <FilterChip
                      key={person.id}
                      item={person}
                      minItem={value.minPeople}
                      handleSelect={() => handleSelect(person.id, 'minPeople')}
                    />
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography variant="lg">Sort</Typography>
                <Typography mt={'1rem'}>Price</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    columnGap: '1rem',
                    rowGap: '1rem',
                    marginTop: '1rem',
                    width: {
                      '2xl': '85%',
                    },
                    marginX: 'auto',
                  }}
                >
                  {sortOptions.map((price) => (
                    <FilterChip
                      key={price.id}
                      item={price}
                      minItem={value.orderByPrice}
                      handleSelect={() => handleSelect(price.id, 'orderByPrice')}
                    />
                  ))}
                </Box>
                <Typography mt={'1rem'}>People</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    columnGap: '1rem',
                    rowGap: '1rem',
                    marginTop: '1rem',
                    width: {
                      '2xl': '85%',
                    },
                    marginX: 'auto',
                  }}
                >
                  {sortOptions.map((person) => (
                    <FilterChip
                      key={person.id}
                      item={person}
                      minItem={value.orderByPeople}
                      handleSelect={() => handleSelect(person.id, 'orderByPeople')}
                    />
                  ))}
                </Box>
                <Typography mt={'1rem'}>Rooms</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    columnGap: '1rem',
                    rowGap: '1rem',
                    marginY: '1rem',
                    width: {
                      '2xl': '85%',
                    },
                    marginX: 'auto',
                  }}
                >
                  {sortOptions.map((room) => (
                    <FilterChip
                      key={room.id}
                      item={room}
                      minItem={value.orderByRooms}
                      handleSelect={() => handleSelect(room.id, 'orderByRooms')}
                    />
                  ))}
                </Box>
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
    </div>
  );
}

const roomsAndPeopleQuantity: ObjType[] = [
  {
    id: 0,
    name: 'Any',
  },
  {
    id: 1,
    name: '1',
  },
  {
    id: 2,
    name: '2',
  },
  {
    id: 3,
    name: '3',
  },
  {
    id: 4,
    name: '4',
  },
  {
    id: 5,
    name: '5+',
  },
];

const sortOptions: ObjType[] = [
  {
    id: 'any',
    name: 'Any',
  },
  {
    id: 'asc',
    name: 'Low to High',
  },
  {
    id: 'desc',
    name: 'High to Low',
  },
];
