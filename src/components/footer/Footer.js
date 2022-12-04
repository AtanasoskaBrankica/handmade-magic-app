import React from 'react';
import classes from './Footer.module.css';

const date = new Date();
const currentYear = date.getFullYear();
const Footer = () => {
  return (
    <div className={classes.footer}>
      &copy; {currentYear} All Right Reserved
    </div>
  );
};

export default Footer;
