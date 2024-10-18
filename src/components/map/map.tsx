import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import { City, Offers, Offer } from '../../types/offer-type';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';

const EMPTY_LOCATION: City = {
  name: '',
  location: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  }
};

type MapProps = {
  offers: Offers;
  selectedOffer: Offer | undefined;
  className?: string;
  currentCity: string;
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

function Map(props: MapProps): JSX.Element {
  const {offers, selectedOffer, className, currentCity} = props;

  const offer = offers.find((item)=> item.city.name === currentCity);

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
            selectedOffer !== undefined && item.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, currentCity]);

  return <section className={`map ${className}`} ref={mapRef} />;
}

export default Map;
