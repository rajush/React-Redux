import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: { title: "" }
    };

    /**
     * React doesn't autobind in ES6 classes, so we have to handle binding ourselves.It needs to be bound to the
     * instance of our component. So to fix this, let's bind the 'this' context in our constructor. All we are doing
     * here is binding them to the 'this' of our CoursesPage component.
     */
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course: course});
  }

  onClickSave() {
    this.props.dispatch(courseActions.createCourse(this.state.course));
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  render () {
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input
          type="text"
          onChange={this.onTitleChange}
          value={this.state.course.title}/>

        <input
          type="submit"
          value="Save"
          onClick={this.onClickSave}/>
      </div>
    );
  }
}

CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired
};

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
 * Export a component that's decorated by the React-Redux Connect function. The Connect function is what we use to create
 * components that can interact with Redux.
 * Connect is a higher-order component that's going to wrap our CoursesPage. And Connect takes two parameters, the first
 * being mapStateToProps and the second being mapDispatchToProps. Each of these parameters is a function.
 */
export default connect(mapStateToProps)(CoursesPage);


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

