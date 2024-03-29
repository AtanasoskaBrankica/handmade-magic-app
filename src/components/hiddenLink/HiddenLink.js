import {useSelector} from 'react-redux';

export const ShowOnLogin = ({children}) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return children;
  }
  return;
};

export const ShowOnLogout = ({children}) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return children;
  }
  return;
};
