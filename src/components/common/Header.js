import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';

/**
 * This is stateless functional component, with just an arrow function here and have a body inside.
 * We are using the IndexLink component from React Router to handle this IndexLink, which just has a slash in it.
 * And we're also using a nice little feature that comes along with both Link and IndexLink to say when this link is active
 * based on the route, go ahead and apply a class for us. So this allows us to style the currently selected anchor up
 * in the header.
 */
const Header = ({loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/courses" activeClassName="active">Courses</Link>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
      {loading && <LoadingDots interval={100} dots={20}/>}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
