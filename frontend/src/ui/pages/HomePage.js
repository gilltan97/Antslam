import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Card, CardBody, CardHeader, Row, Col, Input, Button,
} from 'reactstrap';

import { getPatients, createPatient } from '../../services/patients';
import { getClinicians, createClinician } from '../../services/clinicians';

import { getFormResponseForPatient } from '../../services/form_responses';
import { validateObjectId } from './PatientsPage';


const style = {
  card: {
    width: '700px',
    border: '0',
  },

  header: {
    color: '#7f7f7f',
    backgroundColor: 'white',
    border: '0',
    paddingBottom: '0',
  },

  body: {
    paddingLeft: '5',
  },
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patientID: '', // Unique patient identifier
      clinicianID: '', // Unique clinician identifier
      retrieveFormID: 'DEFAULT', // Unique identifier for patient form to retrieve
      createFormID: 'DEFAULT', // Unique identifier for 'Start New Form' to create
      patients: [],
      clinicians: [],
      redirectWithResponse: false,
      canCreateNewForm: false,
      filledFormResponse: null,
      retrievePatientID: '',
    };

    this.formTypes = [
      'sample-xml-data',
      'PKG_ACR_CT_STROKE',
      'PKG_Lung_Surgery_CCO',
    ];

    // Bind evend handlers
    this.handleRetrieveDropdownChange = this.handleRetrieveDropdownChange.bind(
      this,
    );
    this.handleCreateDropdownChange = this.handleCreateDropdownChange.bind(
      this,
    );
    this.handleChooseClinicianDropdownChange = this.handleChooseClinicianDropdownChange.bind(this);
    this.handleChoosePatientDropdownChange = this.handleChoosePatientDropdownChange.bind(this);
    this.handleGetPatientFormButton = this.handleGetPatientFormButton.bind(this);
    this.handleRetrievePatientDropdownChange = this.handleRetrievePatientDropdownChange.bind(this);
    this.handleCreateNewFormButton = this.handleCreateNewFormButton.bind(this);
  }

  async componentDidMount() {
    let patients = await getPatients();
    let clinicians = await getClinicians();
    if (patients.length === 0) {
      createPatient({ name: 'Patient1' });
      createPatient({ name: 'Patient2' });
      await createPatient({ name: 'Patient3' });
      patients = await getPatients();
    }
    if (clinicians.length === 0) {
      createClinician({ name: 'Clinician1' });
      createClinician({ name: 'Clinician2' });
      await createClinician({ name: 'Clinician3' });
      clinicians = await getClinicians();
    }
    this.setState({
      patients,
      clinicians,
    });
  }

  /**
   * Returns a React element containing a header, a textbox, a dropdown menu, and a submit button
   * for the 'Retrieve Patient Form' part of the homepage.
   */
  getPatientFormComponent() {
    const {
      retrievePatientID, retrieveFormID, patients,
    } = this.state;

    return (
      <div className="homeFormComponent">
        <Card style={style.card}>
          <CardHeader style={style.header}><strong>Retrieve Patient Form</strong></CardHeader>
          <CardBody style={style.body}>
            <Row>
              <Col>
                <Input
                  size="sm"
                  type="select"
                  name="select"
                  onChange={this.handleRetrievePatientDropdownChange}
                  value={retrievePatientID}
                >
                  <option value="DEFAULT" hidden>
                  Select Patient
                  </option>
                  {patients.map((patient) => (
                    <option
                      key={patient._id}
                      value={patient._id}
                    >
                      {' '}
                      {patient.name}
                      {' '}
                    </option>
                  ))}
                </Input>
              </Col>

              <Col>
                <Input
                  size="sm"
                  type="select"
                  name="select"
                  onChange={this.handleRetrieveDropdownChange}
                  value={retrieveFormID}
                >
                  <option value="DEFAULT" hidden>
                  Select Form Type
                  </option>
                  {this.formTypes.map((formType) => (
                    <option
                      key={this.formTypes.indexOf(formType)}
                      value={formType}
                    >
                      {' '}
                      {formType}
                      {' '}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={this.handleGetPatientFormButton}
                >
                Get patient form
                </Button>
              </Col>

              <Col />
            </Row>

          </CardBody>
        </Card>
      </div>
    );
  }

  /**
   * Returns a React element containing a header, a dropdown menu, and a submit button
   * for the 'Start New Form' part of the homepage.
   */
  getNewFormComponent() {
    const {
      createFormID, clinicianID, patientID, clinicians, patients,
    } = this.state;
    return (
      <div className="homeFormComponent">
        <Card style={style.card}>
          <CardHeader style={style.header}><strong>Start New Form</strong></CardHeader>
          <CardBody style={style.body}>
            <Row>
              <Col>
                <Input
                  size="sm"
                  type="select"
                  name="select"
                  onChange={this.handleCreateDropdownChange}
                  value={createFormID}
                >
                  <option value="DEFAULT" hidden>
                Select Form Type
                  </option>
                  {this.formTypes.map((formType) => (
                    <option
                      key={this.formTypes.indexOf(formType)}
                      value={formType}
                    >
                      {' '}
                      {formType}
                      {' '}
                    </option>
                  ))}
                </Input>
              </Col>

              <Col>
                <Input
                  size="sm"
                  type="select"
                  name="select"
                  onChange={this.handleChooseClinicianDropdownChange}
                  value={clinicianID}
                >
                  <option value="DEFAULT" hidden>
                  Select Clinician
                  </option>
                  {clinicians.map((clinician) => (
                    <option
                      key={clinician._id}
                      value={clinician._id}
                    >
                      {' '}
                      {clinician.name}
                      {' '}
                    </option>
                  ))}
                </Input>
              </Col>

              <Col>
                <Input
                  size="sm"
                  type="select"
                  name="select"
                  onChange={this.handleChoosePatientDropdownChange}
                  value={patientID}
                >
                  <option value="DEFAULT" hidden>
                  Select Patient
                  </option>
                  {patients.map((patient) => (
                    <option
                      key={patient._id}
                      value={patient._id}
                    >
                      {' '}
                      {patient.name}
                      {' '}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col>
                <Link
                  to={{
                    pathname: './FillFormPage',
                    formID: createFormID,
                    clinicianID,
                    patientID,
                    isEditForm: false,
                  }}
                >
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={this.handleCreateNewFormButton}
                  >
                Create a new form
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }

  /**
   * Preform a fetch request for a form response specified patient and form type dropdown menus.
   */
  handleGetPatientFormButton() {
    const { retrievePatientID, retrieveFormID } = this.state;
    getFormResponseForPatient(retrievePatientID, retrieveFormID)
      .then((result) => {
        if (result.length > 0) {
          this.setState({ filledFormResponse: result[0], redirectWithResponse: true });
        } else {
          // eslint-disable-next-line no-alert
          alert(`${retrieveFormID} response does not exist for patient ${retrievePatientID}`);
        }
      }, (error) => {
        // eslint-disable-next-line no-alert
        alert(`Error while getting ${retrieveFormID} response for patient ${retrievePatientID}`, error);
      });
  }

  /**
   * Update retrievePatientID when dropdown menu value changes.
   * @param {Object} event A change event from the dropdown menu.
   */
  handleRetrievePatientDropdownChange(event) {
    this.setState({ retrievePatientID: event.target.value });
  }

  /**
   * Update the value for the type of form to be retrieved.
   * @param {Object} event A change event from 'Retrieve Patient Form' the dropdown menu.
   */
  handleRetrieveDropdownChange(event) {
    console.log(event.target.value);
    this.setState({ retrieveFormID: event.target.value });
  }

  /**
   * Update the value for the type of form to be created.
   * @param {Object} event A change event from 'Start New Form' the dropdown menu.
   */
  handleCreateDropdownChange(event) {
    const createFormID = event.target.value;
    const { patientID } = this.state;
    if (!validateObjectId(patientID)) {
      this.setState({ createFormID });
      return;
    }

    getFormResponseForPatient(patientID, createFormID)
      .then((result) => {
        if (result.length > 0) {
          // eslint-disable-next-line no-alert
          alert(`${createFormID} form already exist for this patient`);
        } else {
          this.setState({ createFormID });
        }
      }, (error) => {
        console.log('Failed to retrieve form response', error);
        this.setState({ createFormID });
      });
  }

  handleChooseClinicianDropdownChange(event) {
    this.setState({ clinicianID: event.target.value });
  }

  handleChoosePatientDropdownChange(event) {
    const patientID = event.target.value;
    const { createFormID } = this.state;
    if (!this.formTypes.includes(createFormID)) {
      this.setState({ patientID });
      return;
    }

    getFormResponseForPatient(patientID, createFormID)
      .then((result) => {
        if (result.length > 0) {
          // eslint-disable-next-line no-alert
          alert(`${createFormID} form already exist for this patient`);
        } else {
          this.setState({ patientID });
        }
      }, (error) => {
        console.log('Failed to retrieve form response', error);
        this.setState({ patientID });
      });
  }

  handleCreateNewFormButton() {
    const { createFormID, clinicianID, patientID } = this.state;
    if (createFormID === 'DEFAULT') {
      // eslint-disable-next-line no-alert
      alert('No from type selected');
      return;
    }
    if (clinicianID.length === 0) {
      // eslint-disable-next-line no-alert
      alert('No clinician selected');
      return;
    }
    if (patientID.length === 0) {
      // eslint-disable-next-line no-alert
      alert('No patient selected');
      return;
    }
    this.setState({ canCreateNewForm: true });
  }

  /**
   * Returns a React element made of the 'Retrieve Patient Form' and 'Start New Form'
   * elements described above.
   */
  render() {
    const {
      redirectWithResponse,
      filledFormResponse,
      canCreateNewForm,
      createFormID,
      clinicianID,
      patientID,
    } = this.state;

    if (redirectWithResponse) {
      return (
        <Redirect to={{
          pathname: './FillFormPage',
          formID: filledFormResponse.formId,
          clinicianID: filledFormResponse.clinician._id,
          patientID: filledFormResponse.patient._id,
          filledFormResponse,
          isEditForm: true,
        }}
        />
      );
    }
    if (canCreateNewForm) {
      return (
        <Redirect to={{
          pathname: './FillFormPage',
          formID: createFormID,
          clinicianID,
          patientID,
          isEditForm: false,
        }}
        />
      );
    }
    return (
      <div className="container">
        <div className="row mb-3">
          <div className="col">
            {this.getPatientFormComponent()}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            {this.getNewFormComponent()}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
