/**
 * Created by rajush on 5/15/17.
 */
// This component handles the App template used on every page.
import  React, {PropTypes} from 'react';

class App extends React.Component {
  render() {
    return (
      //When we go to /about in routes.js, then App.js will end up
      //getting our Aboutpage component right here because it will
      //be passed in as a child by React router.
      <div className="container-fluid">
        <p>Header here...</p>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
