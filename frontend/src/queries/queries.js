import { gql } from 'apollo-boost';

const getStudentsQuery = gql`
	{
		students{
			id
			name
			age
			grade
			
		}
	}

`

const getLevelsQuery = gql`
	{
	levels{
		id
		a_level
		b_level
		c_level
	}
}
`
const addLevelMutation = gql`

	mutation($a_level: Int!, $b_level: Int!, $c_level: Int!, $studentId: ID!){
		addLevel(a_level: $a_level, b_level: $b_level, c_level: $c_level, studentId: $studentId){
			id
			a_level
			b_level
			c_level
		}
	}

`

const getStudentLevelQuery = gql`

	query($id: ID){
		level(id:$id){
			a_level
			b_level
			c_level
			student{
				id
				name
				grade
				age
				levels{
					id
					a_level
					b_level
					c_level
				}
			}
		}
	}
`

const getStudentDetailsQuery = gql`

	query($id: ID) {
		student(id:$id) {
			name
			age
			grade
			level {
				id
				a_level
				b_level
				c_level
				students {
					id
					name
					grade
					age
				}
			}
		}
	}
`

export{ getStudentsQuery, getLevelsQuery, addLevelMutation, getStudentLevelQuery, getStudentDetailsQuery };