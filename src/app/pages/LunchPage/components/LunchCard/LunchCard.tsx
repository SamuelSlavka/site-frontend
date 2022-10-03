import { FC, useEffect } from 'react'
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

  useEffect(() => {
    console.log(restaurant)
  });

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
    <div className={`${styles.LunchCard} relative grow flex flex-col m-4 bg-white text-black max-w-sm rounded overflow-hidden shadow-lg hover:ring-2 ring-light transition-all ease-in-out duration-300`} data-testid="LunchCard">
      <div className="text-right p-2 absolute top-0 right-0 h-16 w-32 text-xs">
        <button onClick={() => toggleRestaurant(restaurant?.id)} className="rounded text-dark font-bold p-2 bg-light hover:bg-middle hover:text-light transition-all ease-in-out duration-200">
            {`hide ${restaurant?.restaurant_name}`}
        </button>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{restaurant?.restaurant_name}</div>
        {lunchItems}
      </div>
      <div className="p-4 place-self-end mt-auto">
        <button onClick={() => openRestaurant(restaurant?.restaurant_endpoint)} className="text-sm inline-block bg-blue-500 text-dark bg-light hover:bg-dark hover:text-light transition-all ease-in-out duration-200 font-bold py-2 px-4 rounded">
          {`link to ${restaurant?.restaurant_name}`}
        </button>
      </div>
    </div>
  )
}

export default LunchCard;
