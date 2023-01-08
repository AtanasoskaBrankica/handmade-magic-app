import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
const AdminRoute = ({children}) => {
  const userEmail = useSelector(state => state.auth.email);
  console.log(userEmail);
  if (userEmail === 'admin@gmail.com') {
    return children;
  }
  return (
    <section style={{height: '50vh'}}>
      <div className="container">
        <h2>Permission Denied.</h2>
        <p>This page can only be view by an Admin user.</p>
        <br />
        <Link to="/" style={{textDecoration: 'none'}}>
          <button className="btn--btn">&larr;Back To Home</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminLink = ({children}) => {
  const userEmail = useSelector(state => state.auth.email);
  console.log(userEmail);
  if (userEmail === 'admin@gmail.com') {
    return children;
  }
  return;
};

export default AdminRoute;
