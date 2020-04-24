import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import Header from './ui/components/HeaderComponent';
import HomePage from './ui/pages/HomePage';
import FillFormPage from './ui/pages/FillFormPage';
import PatientFormPage from './ui/pages/PatientFormPage';
import PatientsPage from './ui/pages/PatientsPage';
import ClinicianPage from './ui/pages/ClinicianPage';
import FormResponsesPage from './ui/pages/FormResponsesPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/patients" component={PatientsPage} />
        <Route path="/clinicians" component={ClinicianPage} />
        <Route path="/form-responses" component={FormResponsesPage} />
        <Route path="/FillFormPage" component={FillFormPage} />
        <Route path="/PatientFormPage" component={PatientFormPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
