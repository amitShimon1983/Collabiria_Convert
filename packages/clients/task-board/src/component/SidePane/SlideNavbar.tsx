import React, { FunctionComponent } from "react";
import classes from './SideNavbar.module.css';
interface SlideNavbarProps {
    toggleFilter: boolean;
}

const SlideNavbar: FunctionComponent<SlideNavbarProps> = ({ toggleFilter, children }) => {
    return (<div className={classes.wrapper}>
        <div className={`${classes.slide} ${!toggleFilter ? classes.in : classes.out}`}>
            <div className={classes.filterActions}>
                {children}
            </div>
        </div>
    </div>);
}

export default SlideNavbar;