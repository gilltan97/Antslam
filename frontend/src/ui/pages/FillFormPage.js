import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import { Alert } from 'react-bootstrap';

import { getForm } from '../../services/forms';
import { createFormResponse, updateFormResponse } from '../../services/form_responses';

const log = (type) => console.log.bind(console, type);

class FillFormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: null,
      uiSchema: {},
      formData: props.location.filledFormResponse ? props.location.filledFormResponse.form : {},
      showSubmissionAlert: false,
    };
  }

  async componentDidMount() {
    const { location } = this.props;
    if (!location.formID) { // direct loading of this page from browser
      return;
    }
    try {
      const schema = await getForm(location.formID);
      this.setState({ schema });
    } catch (err) {
      console.log(err);
    }
  }

  // eslint-disable-next-line no-alert
  onError = (errors) => alert('I have', errors.length, 'errors to fix');

  onChange = ({ formData }) => log('Data changed: ', formData);

  onSubmit = ({ formData }, e) => {
    e.preventDefault();
    const { location } = this.props;
    const formResponse = {
      clinician: location.clinicianID,
      patient: location.patientID,
      formId: location.formID,
      form: formData,
    };
    if (location.isEditForm && location.filledFormResponse) {
      updateFormResponse(formResponse, location.filledFormResponse._id);
    } else {
      createFormResponse(formResponse);
    }
    console.log('Data submitted: ', formResponse);
    this.setState({ showSubmissionAlert: true });
  }

  render() {
    const { location, history } = this.props;
    const {
      schema, uiSchema, formData, showSubmissionAlert,
    } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <p>
              Form ID:&nbsp;
              {location.formID}
            </p>
            <p>
              Clinician ID:&nbsp;
              {location.clinicianID}
            </p>
            <p>
              Patient ID:&nbsp;
              {location.patientID}
            </p>
            {schema && (
              <Form
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                onError={this.onError}
              />
            )}
          </div>
        </div>
        {
          showSubmissionAlert
          && (
          <div className="row mt-3">
            <div className="col">
              <Alert variant="success" onClose={() => history.push('/')} dismissible>
                <Alert.Heading>Submitted successfully!</Alert.Heading>
              </Alert>
            </div>
          </div>
          )
        }
      </div>
    );
  }
}

FillFormPage.propTypes = {
  location: PropTypes.shape({
    formID: PropTypes.string,
    clinicianID: PropTypes.string,
    patientID: PropTypes.string,
    filledFormResponse: PropTypes.object,
    isEditForm: PropTypes.bool,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

FillFormPage.defaultProps = {
  location: PropTypes.shape({
    formID: 'DEFAULT',
    clinicianID: 'DEFAULT',
    patientID: 'DEFAULT',
    isEditForm: false,
  }),
};

export default FillFormPage;
