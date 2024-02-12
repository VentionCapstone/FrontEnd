// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Fade, Modal, Stack, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';

import { DEFAULT_COORDINATES } from '@src/constants';
import { MapModalProps } from '@src/types/accommodation.types';
import { modalStyles } from './Modal.styles';

const maxAccommInMap = import.meta.env.VITE_MAX_ACCOMMODATIONS_IN_MAP as string;
const originUrl = import.meta.env.VITE_ORIGIN_URL as string;
const serverUrl = import.meta.env.VITE_API_URL as string;

export default function MapModal({ open, setOpen, searchParamsAsObject }: MapModalProps) {
  const { location } = searchParamsAsObject;

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  function initMapWithCoordinates(coords) {
    ymaps.ready(() => {
      const mapContainer = document.getElementById('map');
      if (mapContainer && mapContainer.children.length > 0) {
        return;
      }
      init(coords);
    });
  }

  useEffect(() => {
    if (!location || location.trim() === '') {
      initMapWithCoordinates(DEFAULT_COORDINATES);
      return;
    }
    const geocoder = ymaps.geocode(location);

    geocoder.then(function (res) {
      const firstGeoObject = res.geoObjects.get(0);
      const coords = firstGeoObject.geometry.getCoordinates();
      initMapWithCoordinates(coords);
    });
  }, [location]);

  function init(coordinates) {
    const myMap = new ymaps.Map('map', {
      center: coordinates,
      zoom: 10,

      controls: [
        'zoomControl',
        'searchControl',
        'typeSelector',
        'fullscreenControl',
        'routeButtonControl',
        'geolocationControl',
      ],
      searchControlProvider: 'yandex#search',
    });

    const MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
      `<div  class="popover top" >
        <a class="close" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: black; stroke-width: 3; overflow: visible;">
            <path d="m6 6 20 20M26 6 6 26"></path>
          </svg>
        </a>
        <div class="arrow"></div>
        <div class="popover-inner">
          <a class="ballon__link" href="${originUrl}/rooms/$[properties.accommodationId]" target="_blank" rel="noopener noreferrer">
            $[[options.contentLayout observeSize minWidth=310 maxWidth=310 maxHeight=420]]
          </a>
          </div>
      </div>`,
      {
        build: function () {
          this.constructor.superclass.build.call(this);

          this._$element = $('.popover', this.getParentElement());

          this.applyElementOffset();

          this._$element.find('.close').on('click', $.proxy(this.onCloseClick, this));
        },

        clear: function () {
          this._$element.find('.close').off('click');

          this.constructor.superclass.clear.call(this);
        },

        onSublayoutSizeChange: function () {
          MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

          if (!this._isElement(this._$element)) {
            return;
          }

          this.applyElementOffset();

          this.events.fire('shapechange');
        },

        applyElementOffset: function () {
          this._$element.css({
            left: -this._$element[0].offsetWidth - 40,
            top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight),
          });
        },

        onCloseClick: function (e) {
          e.preventDefault();

          this.events.fire('userclose');
        },

        getShape: function () {
          if (!this._isElement(this._$element)) {
            return MyBalloonLayout.superclass.getShape.call(this);
          }

          const position = this._$element.position();

          return new ymaps.shape.Rectangle(
            new ymaps.geometry.pixel.Rectangle([
              [position.left, position.top],
              [
                position.left + this._$element[0].offsetWidth,
                position.top +
                  this._$element[0].offsetHeight +
                  this._$element.find('.arrow')[0].offsetHeight,
              ],
            ])
          );
        },

        _isElement: function (element) {
          return element && element[0] && element.find('.arrow')[0];
        },
      }
    );

    const MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
      `<div class="balloon" style="width: 290px; height: 400px; padding: 5px; border-radius: 15px">
        <div class="balloon__container">
          <div class="img-container">
            <img src="$[properties.thumbnailUrl]"    onerror="this.onerror=null; this.src='/src/assets/no-image.jpg';" style="width: 300px; height: 250px; object-fit: cover; border-radius: 15px 15px 0 0" alt="" />
          </div>
          <div class="info-container"  style="padding: 10px">
            <div class="title" style="display: flex; align-self: center; justify-content: space-between;">
              <div style=" font-weight: 700;margin-right: 40px; margin: 10px 30px 10px 0">
                $[properties.balloonAdress]
              </div>
              <div style="display: flex; align-items: center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style="
                    display: block;
                    height: 12px;
                    width: 12px;
                    fill: currentcolor;
                    margin-right: 7px;
                  "
                >
                  <path
                    fill-rule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  ></path>
                </svg>
                4,73
              </div>
            </div>
            <div class="accomm__title" style="margin-bottom: 4px">$[properties.balloonAccommTitle]</div>
            <div class="accomm__price"><span>$[properties.iconCaption]</span> night</div>
          </div>
        </div>
      </div>`
    );

    const {
      minPrice,
      maxPrice,
      minRooms,
      minPeople,
      orderByPrice,
      orderByPeople,
      orderByRoom,
      location,
      checkInDate,
      checkOutDate,
    } = searchParamsAsObject;
    const newParams = {
      page: 1,
      limit: maxAccommInMap || AMOUNT_PER_PAGE,
      maxPrice: Number(maxPrice) || null,
      minPrice: Number(minPrice) || null,
      minRooms: Number(minRooms) || null,
      minPeople: Number(minPeople) || null,
      orderByPrice: orderByPrice == 'any' ? null : orderByPrice,
      orderByPeople: orderByPeople == 'any' ? null : orderByPeople,
      orderByRoom: orderByRoom == 'any' ? null : orderByRoom,
      location: location || null,
      checkInDate: checkInDate || null,
      checkOutDate: checkOutDate || null,
    };

    function setURLSearchParams(baseUrl, params) {
      const url = new URL(baseUrl);

      for (const [key, value] of Object.entries(params)) {
        if (value !== null) {
          url.searchParams.set(key, value);
        }
      }

      const modifiedUrl = url.href + '&bbox=%b';
      return modifiedUrl;
    }

    const url = setURLSearchParams(`${serverUrl}/accommodations/map`, newParams);

    const loadingObjectManager = new ymaps.LoadingObjectManager(url, {
      clusterize: true,
      clusterHasBalloon: false,
      geoObjectOpenBalloonOnClick: true,
      paddingTemplate: 'myCallback_%c',
      splitRequests: true,
    });

    loadingObjectManager.clusters.options.set({
      preset: 'islands#invertedDarkBlueClusterIcons',
    });

    loadingObjectManager.objects.options.set({
      preset: 'islands#darkBlueDotIcon',

      balloonShadow: false,
      balloonLayout: MyBalloonLayout,
      balloonContentLayout: MyBalloonContentLayout,
      hideIconOnBalloonOpen: false,
      balloonPanelMaxMapArea: 0,
    });

    myMap.geoObjects.add(loadingObjectManager);

    myMap.events.add('click', function (e) {
      myMap.balloon.close();
    });
  }
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
            <Typography constiant="lg">Map</Typography>
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
            <div id="map"></div>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
