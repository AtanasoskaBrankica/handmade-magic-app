import classes from './Loader.module.css';
import ReactDOM from 'react-dom';
import loader from '../../assets/loader.gif';
const Loader = () => {
  return ReactDOM.createPortal(
    <div className={classes.wrapper}>
      <div className={classes.loader}>
        <img src={loader} alt="Loading..." />
      </div>
    </div>,
    document.getElementById('loader')
  );
};

export default Loader;
