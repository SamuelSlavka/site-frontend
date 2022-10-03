import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './LunchCard.module.scss';
import { restaurantSlice, selectRestaurantById } from '../../restaurantSlice';
import { LunchValue } from '../../lunchModel';
import { RootState } from '../../../../store';

interface LunchCardProps {
  lunch: LunchValue
}

const LunchCard: FC<LunchCardProps>  = (props) => {
  const restaurant_id = props.lunch.restaurant_id;
  const restaurant = useSelector((state: RootState) => selectRestaurantById(state, restaurant_id));

  const dispatch = useDispatch();
  const lunchItems = props.lunch.value.map((item, index) => (
    <p className="text-gray-700 text-base" key={index}>
          {item}
    </p>
  ))

  const toggleRestaurant = (id: string | undefined) => {
    if(id) {
      dispatch(restaurantSlice.actions.toggleRestaurant({ id }));
    }
  }

  const openRestaurant = (url: string | undefined) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles.LunchCard} data-testid="LunchCard">
      <div className="text-right p-2 absolute top-0 right-0 h-16 w-32 text-xs">
        <button onClick={() => toggleRestaurant(restaurant?.id)} className={styles.HideButton}>
            {`hide ${restaurant?.restaurant_name}`}
        </button>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{restaurant?.restaurant_name}</div>
        {lunchItems}
      </div>
      <div className="p-4 place-self-end mt-auto">
        <button onClick={() => openRestaurant(restaurant?.restaurant_endpoint)} className={styles.LinkButton}>
          {`link to ${restaurant?.restaurant_name}`}
        </button>
      </div>
    </div>
  )
}

export default LunchCard;
