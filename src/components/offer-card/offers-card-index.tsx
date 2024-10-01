import {Offers} from './offer-type';
import OfferCard from './offer-card';

type CardsProps = {
  offers: Offers;
}

function OffersCardsIndex(props: CardsProps): JSX.Element {
  const {offers} = props;

  return (
    <>
      {
        offers.map((offer) => (
          <OfferCard offer={offer} key={offer.id} />
        ))
      }
    </>
  );
}
export default OffersCardsIndex;
