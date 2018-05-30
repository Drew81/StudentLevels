import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getStudentLevelQuery } from '../queries/queries';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory';

class StudentDetails extends Component { 
 data = {}
	displayStudentDetails(){
  		const { level } = this.props.data;
  		if( level ){
  			return(
  				<div>
            
  					<h2>Incident Level</h2>
  					<h2>{level.a_level}...{level.b_level}...{level.c_level}</h2>
  					<h2></h2>
  					<p>{level.student.name}</p>
  					<ul className="other-levels">
  						{level.student.levels.map(item => {
                return <li key={item.id}><h3>Incident Level</h3>{item.a_level}...{item.b_level}...{item.c_level}</li>
  						})}
              
  					</ul>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={150}
            >

              <VictoryBar
                style={{ data: { fill: "#c43a31" } }}
                data={[
                {x: 'a_level', y:level.a_level},
                {x: 'b_level', y:level.b_level},
                {x: 'c_level', y:level.c_level}
              ]}
              />
           </VictoryChart>
  				</div>
  				)
  		} else {
  			return(
  			<div id="student-details">No level selected...</div>
  			)
  		}
  	}
  render() { 
  	console.log(this.props);
    return (
      <div id="student-details">
      	{this.displayStudentDetails()}
      </div>
    );
  }
}

export default graphql(getStudentLevelQuery, {
	options: (props) => {
		return {
			variables: {
				id: props.levelId
			}

		}
		
	}
})(StudentDetails);