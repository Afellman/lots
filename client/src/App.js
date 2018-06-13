import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewBatch from './pages/NewBatch/'
import NewLot from './pages/NewLot/'
import NoDate from './pages/NoDate/'
import Batches from './pages/Batches/'
import Navbar from './components/nav'

class App extends Component {
  render() {
    return (
      <Router>
    <div style={{height: "100%"}}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={NewBatch} />
        <Route exact path="/newlot" component={NewLot} />
        <Route exact path="/nodate" component={NoDate} />
        <Route exact path="/batches" component={Batches} />
      </Switch>
    </div>
  </Router>
    );
  }
}

export default App;