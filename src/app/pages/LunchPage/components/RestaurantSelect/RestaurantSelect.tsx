import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './RestaurantSelect.module.scss';
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { restaurantSlice, selectFilteredRestaurants, selectRestaurants } from '../../restaurantSlice';

const RestaurantSelect = () => {
  const restaurants = useSelector(selectRestaurants);
  const selectedRestaurants = useSelector(selectFilteredRestaurants);
  const dispatch = useDispatch();

  const toggleRestaurant = (id: string) => {
    dispatch(restaurantSlice.actions.toggleRestaurant({ id }));
  }
  
  return (
    <div className={styles.SelectorContainer} data-testid="RestaurantSelect">
      <Listbox value={selectedRestaurants} multiple>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
            <span className={styles.SearchField}>
              {selectedRestaurants?.map((restaurant) => restaurant.restaurant_name).join(', ')}
            </span>
            <span className={`${styles.SearchIcon} absolute inset-y-0 right-3 flex items-center pl-3 text-amber-600`}>
              <FontAwesomeIcon icon={solid("utensils")} />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-[10] absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {restaurants.map((restaurant) => (
                <Listbox.Option
                  key={restaurant.id}
                  className={({ active }) =>
                    `hover:bg-middle relative cursor-default select-none m-1 rounded-md shadow`
                  }
                  value={restaurant}
                  onClick={() => { toggleRestaurant(restaurant.id) }}
                >
                  {({ selected }) => (
                    <div className={`py-2 pl-10 pr-4 rounded-md ${selected ? 'hover:bg-middle font-bold shadow-md text-black': 'text-dark'}`}>
                      <span className={styles.InnerText}>
                        {restaurant.restaurant_name}
                      </span>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default RestaurantSelect;
