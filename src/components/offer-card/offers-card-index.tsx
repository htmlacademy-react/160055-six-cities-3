import {Offers} from './offer-type';
import OfferCard from './offer-card';

type CardsProps = {
  offers: Offers;
  onOfferHover: (listItemId: string | undefined) => void;
  onOfferLeave: () => void;
}

function OffersCardsIndex(props: CardsProps): JSX.Element {
  const {offers, onOfferHover, onOfferLeave} = props;

  return (
    <>
      {
        offers.map((offer) => (
          <OfferCard offer={offer} key={offer.id} onOfferHover={onOfferHover} onOfferLeave={onOfferLeave} />
        ))
      }
    </>
  );
}
export default OffersCardsIndex;
