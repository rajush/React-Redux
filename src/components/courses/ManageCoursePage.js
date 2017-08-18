import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {}
    };
    /**
￼     + React doesn't autobind in ES6 classes, so we have to handle binding ourselves.It needs to be bound to the
￼     + instance of our component. So to fix this, let's bind the 'this' context in our constructor. All we are doing
￼     + here is binding them to the 'this' of our component.
￼     */
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  /**
   * When the props change, we need to update our container component's state.
   * This React lifecycle function is called anytime that props have changed, as well as anytime that React thinks
   * that props might have changed. This function may run sometimes even when props haven't changed. That's because
   * sometimes React can't tell for sure if props have changed, so it runs this function for safety.
   */
  componentWillReceiveProps(nextProps) {
    //doing this check here to say, Has the course's Id changed? And if it hasn't changed, then don't run this part of
    //the function because the whole goal here is to make sure that if we end up getting a new course on props, then
    //that's when we need to update state.
    if (this.props.course.id !== nextProps.course.id) {
      console.log(nextProps.course);
      //Necessary to pupulate form when existing course is loaded directly
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  saveCourse(event) {
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course);
    /**
     * Call this.context.router, which will push a new item to the router on our context object.
     * So this will change our URL to /courses.
     */
    this.context.router.push('/courses');
  }

  render() {
    return (
      <div>
        <CourseForm
          allAuthors={this.props.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          course={this.state.course}
          errors={this.state.errors}/>
      </div>
    );
  }

}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

/**
 * Pull in the React Router contsxt so router is available on this.context.router.
 * This time we're going to use 'React Router's context' to redirect. To set up React Router's context, we have to declare
 * that we want it. And we can do that by declaring the 'contextTypes' that we'd like to import on our component. Since contextTypes
 * is a static property, it has to be done after the class definition. So a logical place to make this happen is right down here by
 * our PropTypes. So, again, we're referencing our class. But this time we're referencing the 'contextTypes' that we'd expect. And
 * we're effectively saying that we want router to be one of the contextTypes that are required. And by doing this, this makes
 * React Router's context available to us throughout this component.
 *
 * Context is basically a global variable that library authors use but that we as library consumers should avoid. Yes, global
 * state is generally evil, but context is used by both React Router and Redux in some places to provide easy access to the data
 * that we need without having to write boilerplate plumbing code. And that's exactly what we're avoiding here.
 *
 */
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course.length) return course[0]; // since filter return an array, have to grab the first
  return null;
}

function mapStateToProps(state, ownProps) {
  /**
   * We need to look at the URL to determine if the user is trying to add a new course or edit an existing course. To get parameters
   * from the URL, there's a second parameter on mapStateToProps that will make this easy called ownProps. Again, it's called ownProps
   * because it's a reference to our component's props. In other words, its own props. So in our case, it means we can access some
   * routing-related props that are populated by React Router based on the route defined for this component. So let's read the course Id
   * from the URL right here
   */
  // from the path '/course/:id' in routes.js as the placeholder used was Id. So by saying Id here, it meant that we would say Id here
  // to reference that segment of the URL. And that's how we say that we are wanting to get that second piece of the URL because this
  // was the placeholder that we chose.
  const courseId = ownProps.params.id; //

  let course = {id: '', watchHref: '', title: '', authorid:'', length: '', category: ''};

  /**
   * We're still waiting for AJAX call to come back, but this is running immediately on page load. So we have to make sure that we don't
   * try getting courses when no courses are available yet by checking state.courses.length is greater than 0. So what we're checking
   * for is just to make sure that at least one course exists. And it will once our AJAX call is actually completed to get those courses.
   */
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  /**
   * The SelectInput component is looking for an object that has a 'value' property and a 'text' property. But the data that's coming down
   * from our store is going to have an author with an Id, a first name, and a last name. So we translate the shape to return a new object
   * here that has the properties that we need--a value property and a text property, value set to the author Id and the text set to the
   * author's first name and last name concatenated together.
   *
   */
  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
