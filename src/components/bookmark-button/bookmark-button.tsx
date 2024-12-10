import { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useActionCreators } from '../../hooks/store';
import { favoritesActions } from '../../store/slices/favorites';
import { FavoriteStatus } from '../../types/favorite';
import { AppRoute } from '../../const';
import { useAuth } from '../../hooks/use-auth';

interface BookmarkButtonProps {
  classPath?: 'offer' | 'place-card';
  isFavorite?: boolean;
  offerId: string;
  width?: number;
  height?: number;
}

export function BookmarkButtonComp({
  classPath = 'place-card',
  isFavorite,
  offerId,
  width = 18,
  height = 19
}: BookmarkButtonProps): JSX.Element {
  const [isActive, setActive] = useState(isFavorite);
  const {changeFavorite} = useActionCreators(favoritesActions);
  const navigate = useNavigate();
  const isAuthorized = useAuth();

  function handleClick() {
    if (!isAuthorized) {
      return navigate(AppRoute.Login);
    }
    setActive((prev) => !prev);
    const favoriteStatus: FavoriteStatus = {offerId, statusFavorite: !isActive};
    changeFavorite(favoriteStatus);
  }

  const buttonClass = `${classPath}__bookmark-button`;
  const favoriteClass = classNames(
    buttonClass,
    {
      [`${buttonClass}--active`]: isActive,
    },
    'button'
  );

  return (
    <button className={favoriteClass} onClick={handleClick} type="button">
      <svg
        className={`${classPath}__bookmark-icon`}
        width={width}
        height={height}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

const BookmarkButton = memo(BookmarkButtonComp);

export default BookmarkButton;
