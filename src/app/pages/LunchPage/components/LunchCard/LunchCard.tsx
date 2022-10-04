import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './LunchCard.module.scss';
import { restaurantSlice, selectRestaurantById } from '../../store/restaurantSlice';
import { LunchValue } from '../../store/lunchModel';
import { RootState } from '@app/store';

interface LunchCardProps {
  lunch: LunchValue
}

const LunchCard: FC<LunchCardProps>  = (props) => {
  const restaurant_id = props.lunch.restaurant_id;
  const restaurant = useSelector((state: RootState) => selectRestaurantById(state, restaurant_id));

  const dispatch = useDispatch();
  const lunchItems = props.lunch.value.map((item, index) => (
    <div className={styles.CardText} key={index}>
      <div className="text-gray-700 text-base col-span-7" key={index+1}>
            {item['text']}
      </div>
      <div className="text-gray-700 text-base col-span-1 text-end" key={index}>
            {item['price']}
      </div>
    </div>
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
      <div className={styles.HideContent}>
        <button className={styles.HideButton} onClick={() => toggleRestaurant(restaurant?.id)}>
            {`hide ${restaurant?.restaurant_name}`}
        </button>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-6">{restaurant?.restaurant_name}</div>
        {lunchItems}
      </div>
      <div className="pb-4 pr-4 place-self-end mt-auto">
        <button onClick={() => openRestaurant(restaurant?.restaurant_endpoint)} className={styles.LinkButton}>
          {`link to ${restaurant?.restaurant_name}`}
        </button>
      </div>
    </div>
  )
}

export default LunchCard;
