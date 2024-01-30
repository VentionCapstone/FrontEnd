import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Fade, Modal, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';

import {
  Clusterer,
  GeolocationControl,
  Map,
  Placemark,
  TypeSelector,
  YMaps,
} from '@pbe/react-yandex-maps';
import useGetAccommodationsQuery from '@src/api/queries/main/useGetAccommodationsQuery';
import { MapModalProps } from '@src/types/accommodation.types';
import { modalStyles } from './Modal.styles';

const maxAccommInMap = import.meta.env.VITE_MAX_ACCOMMODATIONS_IN_MAP as string;
const originUrl = import.meta.env.VITE_ORIGIN_URL as string;

export default function MapModal({ open, setOpen, searchParamsAsObject }: MapModalProps) {
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const { data } = useGetAccommodationsQuery({
    searchParamsAsObject: {
      ...searchParamsAsObject,
      limit: maxAccommInMap,
    },
  });
  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Box sx={modalStyles.modalContainer} p={5}>
          <Stack
            mb={4}
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            flexGrow={'0'}
          >
            <Typography variant="lg">Map</Typography>
            <Button
              disableRipple
              disableFocusRipple
              sx={modalStyles.closeButton}
              onClick={handleClose}
            >
              <CloseIcon sx={{ color: 'secondary2.main' }} />
            </Button>
          </Stack>
          <Box style={{ width: '100%', height: '90%' }}>
            <YMaps>
              <div style={{ width: '100%', height: '100%' }}>
                <Map
                  style={{ width: '100%', height: '100%' }}
                  defaultState={{
                    center: [40.89755, -73.84776],
                    zoom: 9,
                    controls: ['zoomControl', 'fullscreenControl'],
                  }}
                  modules={['control.ZoomControl', 'control.FullscreenControl']}
                >
                  <GeolocationControl options={{ float: 'left' }} />
                  {/* <SearchControl options={{ float: 'right' }} /> */}
                  <TypeSelector />
                  {/* <RulerControl options={{ float: 'right' }} /> */}

                  <Clusterer
                    options={{
                      preset: 'islands#invertedVioletClusterIcons',
                      groupByCoordinates: false,
                    }}
                  >
                    {data?.pages[0].data?.map((accommodation) => (
                      <Placemark
                        modules={['geoObject.addon.balloon']}
                        key={accommodation.id}
                        geometry={[accommodation.address.latitude, accommodation.address.longitude]}
                        options={{ preset: 'islands#violetIcon' }}
                        properties={{
                          iconCaption: accommodation.price + '$',
                          balloonContentBody: `
                            <a href="${originUrl}/rooms/${accommodation.id}" style="overflow: hidden; position: relative; text-decoration: none; color: #000; width: 250px;     height: 150px;"  >
                              <div style="padding: 16px 0; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-size: 16px; max-width: 250px;">
                                <div style="font-weight: bold; font-size: 20px; margin-bottom: 8px;">
                                  ${accommodation.title}
                                </div>
                                <img src="${accommodation.thumbnailUrl}" alt="" onerror="this.onerror=null; this.src='/src/assets/no-image.jpg';"  style="width: 250px; height: 150px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); margin-bottom: 8px;border-radius: 10px;  max-height: 150px; object-fit: cover;" />
                                <Typography mt={2}>
                                  ${accommodation.address.city}, ${accommodation.address.country}
                                </Typography>
                              </div>
                            </a>
                          `,
                        }}
                      />
                    ))}
                  </Clusterer>
                </Map>
              </div>
            </YMaps>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
