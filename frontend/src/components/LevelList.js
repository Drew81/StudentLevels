import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getLevelsQuery } from '../queries/queries';
import StudentDetails from './StudentDetails';

class LevelList extends Component {
	constructor(props){
		super(props);
		this.state = {
			selected: null
			}
	}
	displayLevels(){
		var data = this.props.data;
		if(data.loading){
			return (<div>Loading Levels...</div>);
		} else {
			return data.levels.map(level => {
				return(
				<li key={level.id} onClick={(e) => {this.setState({selected:level.id})}}>{level.id}</li>
				);
			})
		}
	}
  render() {
  	console.log(this.props);
    return (
      <div>
	      <ul id="level-list">
	      	{this.displayLevels()}
	      </ul>

	     <StudentDetails levelId={this.state.selected}/>
      </div>
    );
  }
}

export default graphql(getLevelsQuery)(LevelList);