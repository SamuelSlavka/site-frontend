import React, { FC } from 'react';
import styles from './NavItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

interface NavItemProps {
  name: string,
  link: {sub?: string, path?: string},
  icon: IconDefinition,
}

const NavItem: FC<NavItemProps> = (props) => {

  const redirect = (link: {sub?: string, path?: string}) => {
    if(link.sub) {
      const [prefix, domain] = window.location.href.split('//');
      const subdomains = domain.split('.')
      const newHref = `${prefix}//${link.sub}.${subdomains[subdomains.length-1]}`;
      window.location.href = newHref;
    } else if(link.path) {

    }
  }

  return (
    <button onClick={() => redirect(props.link)} className={styles.NavItem} data-testid="NavItem">
      <FontAwesomeIcon icon={props.icon} />
      <span className="ml-4">
        {props.name}
      </span>
    </button>
  );
};

export default NavItem;
