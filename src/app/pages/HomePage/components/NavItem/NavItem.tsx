import React, { FC } from 'react';
import styles from './NavItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

interface NavItemProps {
  name: string,
  link?: string,
  icon: IconDefinition,
}

const NavItem: FC<NavItemProps> = (props) => {

  const redirect = (link?: string) => {
    if(link) {
      const [prefix, domain] = window.location.href.split('//');
      const subdomains = domain.split('.');
      const newHref = `${prefix}//${link}.${subdomains[subdomains.length-2]}.${subdomains[subdomains.length-1]}`;
      window.location.href = newHref;
    }
  }

  return (
    <button onClick={() => redirect(props.link)} className={styles.NavItem} data-testid="NavItem">
      <section className='py-3'>
        <FontAwesomeIcon icon={props.icon} />
        <span className={styles.ItemText}>
          {props.name}
        </span>
      </section>
    </button>
  );
};

export default NavItem;
