import loaderImage from '../../assets/loader.gif';
import classes from './Loader.module.css';
import ReactDom from 'react-dom';
const Loader = () => {
  return ReactDom.createPortal(
    <div className={classes['wrapper-loader']}>
      <div className={classes.loader}>
        <img src={loaderImage} alt="Loading..." />
      </div>
    </div>,
    document.getElementById('loader')
  );
};

export default Loader;
