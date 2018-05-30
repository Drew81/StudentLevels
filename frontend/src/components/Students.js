import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getStudentsQuery } from '../queries/queries';
import StudentDetails from './StudentDetails';

class StudentShow extends Component {
	constructor(props){
		super(props);
		this.state = {
			selected: null
			}
	}
	displayStudent(){
		var data = this.props.data;
		if(data.loading){
			return (<div>Loading Students...</div>);
		} else {
			return data.students.map(student => {
				return(
				<li key={student.id} onClick={(e) => {this.setState({selected:student.id})}}>{student.name}</li>
				);
			})
		}
	}
  render() {
  	console.log(this.props);
    return (
      <div>
	      <ul id="student-list">
	      	{this.displayStudent()}
	      </ul>

	     <StudentShow studentId={this.state.selected}/>
      </div>
    );
  }
}

export default graphql(getStudentsQuery)(StudentShow);