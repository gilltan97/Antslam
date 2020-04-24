import React from 'react';
import PropTypes from 'prop-types';

function PatientFormPage(props) {
  const { location } = props;
  return (
    <div>
      The patient ID is
      {' '}
      {location.filledFormResponse
        && location.filledFormResponse[0]
        && location.filledFormResponse[0]._id}
      <br />
      The form ID is
      {' '}
      {/* NOT IN SCHEMA YET */}
    </div>
  );
}

PatientFormPage.propTypes = {
  location: PropTypes.shape({
    patientID: PropTypes.string,
    formID: PropTypes.number,
    filledFormResponse: PropTypes.array,
  }),
};

PatientFormPage.defaultProps = {
  location: PropTypes.shape({
    patientID: '',
    formID: 'DEFAULT',
  }),
};

export default PatientFormPage;
