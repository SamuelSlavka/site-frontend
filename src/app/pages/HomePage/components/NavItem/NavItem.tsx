import React, { FC } from 'react';
import styles from './NavItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom'
import { NavItemProps } from '../../models/navItemProps';
import { IconName, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'

const NavItem: FC<NavItemProps> = (props) => {
    library.add(fas)
    const navigate = useNavigate();
    const redirect = (props: NavItemProps) => {
        if (props.route) {
            window.location.href = props.route;
        } else if (props.link) {
            navigate(props.link);
        }
    }

    return (
        <div className="m-auto mx-3 self-center">
            <button style={{ backgroundColor: props.bg}} onClick={() => redirect(props)} className={`${styles.card} text-2xl p-2 m-2 md:p-4 md:m-4 lg:m-6 rounded relative`} data-testid="NavItem">
                <div className='p-2 md:p-4 lg:px-6 lg:py-4 relative z-20'>
                    <FontAwesomeIcon icon={["fas", props.icon as IconName]} />

                    <i className="fa-regular fa-user"></i>
                    <span className="px-4">
                        {props.name}
                    </span>
                </div>
            </button>
        </div>
    );
};

export default NavItem;
