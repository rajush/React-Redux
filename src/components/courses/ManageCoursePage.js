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
    console.log('saveCourse', this.state.course);
    this.props.actions.saveCourse(this.state.course);
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
