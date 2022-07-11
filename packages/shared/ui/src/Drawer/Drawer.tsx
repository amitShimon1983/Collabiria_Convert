import React, { FunctionComponent } from 'react';
import classes from './Drawer.module.scss';
interface DrawerProps {
  children: any;
  isOpen: boolean;
}

const Drawer: FunctionComponent<DrawerProps> = ({ children, isOpen }) => {
  return <div className={`${classes.drawer} ${isOpen && classes.isOpen}`}>{children}</div>;
};

export default Drawer;
