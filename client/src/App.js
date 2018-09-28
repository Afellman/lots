import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewBatch from './pages/NewBatch/'
import NewLot from './pages/NewLot/'
import NoDate from './pages/NoDate/'
import Batches from './pages/Batches/'
import Totals from './pages/Totals/s'
import Navbar from './components/nav'


class App extends Component {
  render() {
    return (
      <Router>
    <div style={{paddingBottom: '10px', maxWidth: '100vw'}}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={NewBatch} />
        <Route exact path="/newlot" component={NewLot} />
        <Route exact path="/batches" component={Batches} />
        <Route exact path="/totals" component={Totals} />
      </Switch>
    </div>
  </Router>
    );
  }
}

export default App;
