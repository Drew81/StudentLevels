import React, { Component } from 'react';

import { graphql, compose } from 'react-apollo';
import { getStudentsQuery, addLevelMutation, getLevelsQuery } from '../queries/queries';




class AddLevel extends Component {
	constructor(props){
		super(props);
		this.state = {
			a_level: '',
			b_level: '',
			c_level: '',
			studentId: ''
		};
	}

	displayStudents(){
		var data = this.props.getStudentsQuery;
		console.log(this.props);
		if(data.loading){
			return(<option disabled>Loading Students...</option>);

		} else {
			return data.students.map(student => {
				return (<option key={ student.id } value={student.id}>{ student.name }</option>);
			})
		}
	}

	submitForm(e){
		e.preventDefault();
		console.log(this.state);
		this.props.addLevelMutation({
			variables: {
			a_level: this.state.a_level,
			b_level: this.state.b_level,
			c_level: this.state.c_level,
			studentId: this.state.studentId
			},
			refetchQueries: [{ query: getLevelsQuery }]
		});	
	}

	render() {
		return (
			<form id="add-level" onSubmit={this.submitForm.bind(this)}>

				<div className="field">
					<label>A Level:</label>
					<input type="number" onChange={(e) => this.setState({ a_level: e.target.value })} />
				</div>

				<div className="field">
					<label>B Level:</label>
					<input type="number" onChange={(e) => this.setState({ b_level: e.target.value })}/>
				</div>

				<div className="field">
					<label>C Level:</label>
					<input type="number" onChange={(e) => this.setState({ c_level: e.target.value })}/>
				</div>

				<div className="field">
					<label>Student Name:</label>
					<select onChange={(e) => this.setState({studentId: e.target.value })}>
						<option>Select student</option>
						{this.displayStudents()}
					</select>
				</div>
				<button>+</button>
			</form>
			);
	}
}

export default compose(
	graphql(getStudentsQuery, {name:"getStudentsQuery"}),
	graphql(addLevelMutation, {name: "addLevelMutation"})
)(AddLevel);



