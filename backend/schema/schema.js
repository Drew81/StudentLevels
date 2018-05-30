 const graphql = require('graphql');
const _ = require('lodash');
const Level = require('../models/levels');
const Student = require('../models/student');
const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLList,
	GraphQLString,
	GraphQLNonNull,
	GraphQLSchema,
	GraphQLID
} = require('graphql');
/*
const levels = [
	{id:'1', a_level:'3', b_level:'8', studentId:'2'},
	{id:'2', a_level:'6', b_level:'6', studentId:'2'},
	{id:'3', a_level:'22', b_level:'62', studentId:'3'},
	{id:'1', a_level:'3', b_level:'8', studentId:'2'},
	{id:'2', a_level:'6', b_level:'6', studentId:'2'},
	{id:'3', a_level:'22', b_level:'62', studentId:'3'},
];

const student = [
	{id:'1', name:'John Doe', email:'1@w.com', age:'25'},
	{id:'2', name:'JBruce Lee', email:'1@w.com', age:'25'},
	{id:'3', name:'Joe Woo', email:'1@w.com', age:'25'},
]; 
*/
//Types Schema
const LevelType = new GraphQLObjectType({
	name: 'Level',
	fields: () => ({
		id: {type: GraphQLID},
		a_level: {type: GraphQLInt},
		b_level: {type: GraphQLInt},
		c_level: {type: GraphQLInt},
		student: {
			type: StudentType, 
			resolve(parent, args) {
				console.log(parent);
				//return _.find(student,{id:parent.studentId});
				return Student.findById(parent.studentId)
			}
		}
	})
});

const StudentType = new GraphQLObjectType({
	name: 'Student',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		age: {type:GraphQLInt},
		grade:{type: GraphQLInt},
		levels: {
			type: new GraphQLList(LevelType),
			resolve(parent, args){
				console.log(parent);
				//return _.filter(levels,{studentId:parent.id});
				return Level.find({studentId:parent.id})
			}
		}
	})
});

//RootQuery
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		level: {
			type: LevelType,
			args:{id:{type: GraphQLID}},
			resolve(parent, args){
				// code to get data
				//return _.find(levels,{id:args.id});
				return Level.findById(args.id)
			}
		},
		levels: {
			type: new GraphQLList(LevelType),
			resolve(parent, args){
				//return levels
				return Level.find({});
			}
		},
		student: {
			type: StudentType,
			args: {id:{type:GraphQLID}},
			resolve(parent, args){
				//return _.find(student, {id: args.id});
				return Student.findById(args.id)
			}
		},
		students: {
			type: new GraphQLList(StudentType),
			resolve(parent, args){
				//return student
				return Student.find({});
			}
		}
	}
});

//Mutations
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addStudent: {
			type: StudentType,
			args:{
				name:{type: new GraphQLNonNull(GraphQLString)},
				age:{type: new GraphQLNonNull(GraphQLInt)},
				grade:{type: new GraphQLNonNull(GraphQLInt)}
			},
			resolve(parent, args){
				let student = new Student({
					name: args.name,
					age: args.age,
					grade: args.grade
				});
				return student.save();
			}
		},
		addLevel: {
			type: LevelType,
			args: {
				a_level: {type: new GraphQLNonNull(GraphQLInt)},
				b_level: {type: new GraphQLNonNull(GraphQLInt)},
				c_level: {type: new GraphQLNonNull(GraphQLInt)},
				studentId: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent, args){
				let level = new Level({
					a_level: args.a_level,
					b_level: args.b_level,
					c_level: args.c_level,
					studentId: args.studentId
				});
				return level.save();
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});