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

function mapStateToProps(state, ownProps) {
  let course = {id: '', watchHref: '', title: '', authorid:'', length: '', category: ''};

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
