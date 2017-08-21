/**
 * Created by rajush on 5/15/17.
 */
// Top Level Component
// This component handles the App template used on every page.
import  React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends React.Component {
  render() {
    return (
      /**
       * When we go to /about in routes.js, then App.js will end up
       * getting our About page component right here because it will
       * be passed in as a child by React router.
       */
      <div className="container-fluid">
        <Header
          loading={this.props.loading}
        />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

// connect to the Redux store so that we can get the loading status and pass it down to the header
export default connect(mapStateToProps)(App);
