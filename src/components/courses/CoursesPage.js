import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';

class CoursesPage extends React.Component {
  /**
   *  --------------
   *  In the constructor, we initialize state and also call our bind functions. Any functions that need to be bound to
   *  the 'this' context, this is the best place to do so.
   *  --------------
   */
  constructor(props, context) {
    super(props, context);
  }

  /**
   *  --------------
   *  Child functions, which are called by render.
   *  --------------
   */

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  /**
   *  --------------
   *  render function where we would typically just be calling a child component. Container components ideally just call
   *  a child component that contains that markup.
   *  --------------
   */

  render () {
    const {courses} = this.props;

    return (
      <div>
        <h1>Courses</h1>
        <CourseList courses={courses}/>
      </div>
    );
  }
}

/**
 *  --------------
 *  propTypes that provide our prop type validation.
 *  --------------
 */

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

/**
 *  --------------
 *  Redux Connect and related functions. Below, we have our call to Connect. We have our mapStateToProps function and
 *  our mapDispatchToProps function.
 *  --------------
 */


/**
 * When the course data changes that this 'mapStateToProps' function would receive that new state and end up passing that
 * state as 'this.props.courses' to our component.
 */
function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

/**
 * mapDispatchToProps determines what actions are available in the component. It takes one parameter, which is dispatch.
 * This will get injected in by the Connect function.
 * Here, we call 'bindActionCreators' and pass it the 'courseActions' and the dispatch parameters. And what
 * bindActionCreators will do is it will go through our 'courseActions' and find all the actions in that file and then
 * wrap them in a call to dispatch.
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

/**
 * Export a component that's decorated by the React-Redux Connect function. The Connect function is what we use to create
 * components that can interact with Redux.
 * Connect is a higher-order component that's going to wrap our CoursesPage. And Connect takes two parameters, the first
 * being 'mapStateToProps' and the second being 'mapDispatchToProps'. Each of these parameters is a function.
 */
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);


/**
 * NOTE:
 *
 * When we use React's createClass function (ES5), then functions are autobound for us, so we didn't have to use bind
 * in instances like this. However, React doesn't autobind in ES6 classes, so we have to handle binding ourselves.
 * The issue in this case is that the 'this' context is currently wrong in our change handler. Our function is
 * inheriting the 'this' context of the caller, which in this case is the change handler. Every time that we are having
 * a change event occur down here on our input, it is passing the 'this' context of this input over to our change handler
 * for onTitleChange, and that's why 'this' is not the 'this' that we're expecting. It needs to be bound to the
 * instance of our component. So to fix this, let's bind the 'this' context up in our constructor. We will add in
 * 'bind' statements for both of our functions--the onTitleChange function and the onClickSave function. All we are doing
 * here is binding them to the 'this' of our CoursesPage component.
 */
