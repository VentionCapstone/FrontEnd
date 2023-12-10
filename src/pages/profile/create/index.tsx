import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function CreateProfile() {
  return (
    <>
      <Typography fontSize={{ xs: '1.5rem', md: '2rem' }} fontWeight={600} component={'h1'} mb={8}>
        Create Profile
      </Typography>

      <Stack gap={8}>
        <Box>
          <Typography fontWeight={600}>Legal name</Typography>
          <Typography variant={'sm'} mt={1} mb={4} color={'secondary2.main'}>
            This is the name on your travel document, which could be a license or a passport.
          </Typography>

          <Stack rowGap={2} columnGap={4} direction={{ md: 'row' }}>
            <TextField
              // value={firstName}
              // onChange={(e) => {
              //   setFirstName(e.target.value);
              // }}
              fullWidth
              size="small"
              label="First name"
            />
            <TextField
              // value={lastName}
              // onChange={(e) => {
              //   setLastName(e.target.value);
              // }}
              fullWidth
              size="small"
              label="Last name"
            />
          </Stack>
        </Box>

        <Box>
          <Stack direction={{ md: 'row' }} columnGap={4} rowGap={8}>
            <Box width={'100%'}>
              <Typography fontWeight={600}>Country</Typography>

              <Typography variant={'sm'} mt={1} mb={4} color={'secondary2.main'}>
                Select country
              </Typography>

              <FormControl fullWidth size="small">
                <InputLabel id="user-country-select-label">Coutry</InputLabel>
                <Select
                  value={'Uzbekistan'}
                  // onChange={(e) => {
                  //   setCountry(e.target.value);
                  // }}
                  labelId="user-country-select-label"
                  label="Country"
                >
                  <MenuItem value={'Uzbekistan'}>Uzbekistan</MenuItem>
                  <MenuItem value={'Russia'}>Russia</MenuItem>
                  <MenuItem value={'Kazakhstan'}>Kazakhstan</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box width={'100%'}>
              <Typography fontWeight={600}>Gender</Typography>

              <Typography variant={'sm'} mt={1} mb={4} color={'secondary2.main'}>
                Select your gender
              </Typography>

              <FormControl fullWidth size="small">
                <InputLabel id="user-gender-select-label">Gender</InputLabel>
                <Select
                  // onChange={(e) => setGender(e.target.value as typeof userGender)}
                  value={'MALE'}
                  labelId="user-gender-select-label"
                  id="user-gender-select"
                  label="Gender"
                >
                  <MenuItem value={'MALE'}>Male</MenuItem>
                  <MenuItem value={'FEMALE'}>Female</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </Box>

        <Box>
          <Typography fontWeight={600}>Phone number</Typography>
          <Typography variant={'sm'} mt={1} mb={4} color={'secondary2.main'}>
            Add a number so confirmed guests and Airbnb can get in touch. You can add other numbers
            and choose how they’re used.
          </Typography>

          <Stack gap={4} direction={{ md: 'row' }}>
            <FormControl fullWidth size="small">
              <InputLabel id="number-country-select-label">Coutry</InputLabel>
              <Select
                value={'Uzbekistan'}
                labelId="number-country-select-label"
                id="number-country-select"
                label="Country"
              >
                <MenuItem value={'Uzbekistan'}>Uzbekistan</MenuItem>
                <MenuItem>Russia</MenuItem>
                <MenuItem>Kazakhstan</MenuItem>
              </Select>
            </FormControl>

            <TextField
              // value={inputValue}
              // onChange={handleInputChange}
              fullWidth
              type="text"
              size="small"
              label="Phone number"
              name="phone-number-update"
              InputProps={{
                startAdornment: <InputAdornment position="start">+998</InputAdornment>,
              }}
            />
          </Stack>
        </Box>

        <Box>
          <Typography fontWeight={600}>Decsription</Typography>
          <Typography variant={'sm'} mt={1} mb={4} color={'secondary2.main'}>
            Tell us a little bit about yourself, so your future hosts or guests can get to know you.
          </Typography>

          <TextField
            // value={description}
            // onChange={(e) => {
            //   setDescription(e.target.value);
            // }}
            id="standard-multiline-flexible"
            multiline
            minRows={2}
            maxRows={6}
            fullWidth
          />
        </Box>
      </Stack>

      <Button variant={'contained'} sx={{ mt: 8 }}>
        Create
      </Button>
    </>
  );
}

export default CreateProfile;
