import * as React from 'react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { Button, Backdrop, Modal, Fade, Typography, Box, Slider, TextField } from '@mui/material';
import { InputFilter } from '../../types/accommodation.types';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  width: {
    xs: '90%',
    sm: '80%',
    md: '60%',
    lg: '50%',
    xl: '40%',
  },
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 7,
};

type MainModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: InputFilter;
  setFilters: React.Dispatch<React.SetStateAction<InputFilter>>;
};

export default function MainModal({ open, setOpen, filters, setFilters }: MainModalProps) {
  const [value, setValue] = useState<number[]>([filters.minPrice, filters.maxPrice]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const handleClose = () => setOpen(false);
  const handleClick = () => {
    handleClose();
    setFilters({
      minPrice: value[0],
      maxPrice: value[1],
    });
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography>Filter</Typography>
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
            </Box>
            <Box>
              <Typography>Price Range</Typography>
              <Typography variant={'sm'}>Nightly prices before fees and taxes</Typography>
              <Box
                sx={{
                  width: '85%',
                  marginX: 'auto',
                  marginTop: '1rem',
                }}
              >
                <Slider
                  value={value}
                  max={filters.maxPrice}
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
                    value={value[0]}
                    onChange={(e) => {
                      const inputValue = Number(e.target.value);
                      if (inputValue < filters.minPrice) {
                        setValue([filters.minPrice, value[1]]);
                        return;
                      }
                      if (inputValue > value[1]) {
                        setValue([value[1], value[1]]);
                        return;
                      }
                      setValue([inputValue, value[1]]);
                    }}
                  />
                  <Box>
                    <HorizontalRuleIcon fontSize="large" />
                  </Box>
                  <TextField
                    label="Maximum"
                    variant="outlined"
                    fullWidth
                    value={value[1]}
                    onChange={(e) => {
                      const inputValue = Number(e.target.value);
                      if (inputValue > filters.maxPrice) {
                        setValue([value[0], filters.maxPrice]);
                        return;
                      }
                      if (inputValue < value[0]) {
                        setValue([value[0], value[0]]);
                        return;
                      }
                      setValue([value[0], inputValue]);
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Button
              sx={{
                marginTop: '1rem',
                marginLeft: 'auto',
                display: 'flex',
              }}
              variant="contained"
              onClick={handleClick}
            >
              Filter
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
