import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import StudentShow from './components/Students';
import StudentsList from './components/LevelList';
import AddLevel from './components/AddLevel';
import { ApolloProvider } from 'react-apollo';
import './index.css';
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})



class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Students</h1>
          <StudentsList />
          
          <AddLevel />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
