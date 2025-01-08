import {useRef, useEffect, memo} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import { City, Offers, Offer } from '../../types/offer-type';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, CityName} from '../../const';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks/store';
import { offersSelectors } from '../../store/slices/offers';

const EMPTY_LOCATION: City = {
  name: 'Paris',
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  }
};

type MapProps = {
  offers: Offers;
  className?: string;
  currentCity: CityName;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function MapComp(props: MapProps): JSX.Element {
  const {offers, className, currentCity} = props;

  const offer = offers.find((item)=> item.city.name === currentCity);
  const activeId = useAppSelector(offersSelectors.activeId);

  const getOfferCity = (offerCityObject: Offer | undefined): City => {
    if(offerCityObject) {
      const cityObject = offerCityObject.city;
      return cityObject;
    }
    return EMPTY_LOCATION;
  };

  const mapRef = useRef(null);
  const map = useMap(mapRef, getOfferCity(offer));

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((item) => {
        const marker = new Marker({
          lat: item.location.latitude,
          lng: item.location.longitude
        });

        marker
          .setIcon(
            item.id !== undefined && item.id === activeId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, activeId, currentCity]);

  return <section className={`map ${className}`} ref={mapRef} />;
}

const Map = memo(MapComp);

export default Map;
