# API Design

OpenAPI Docs can be found in backend/openapi.yaml

## High Level Overview

### Patients

The Patients endpoints will be used to search for patients, get all patients, and to create and delete patients.

### Clinicians

The Clinicians endpoints will be used to search for clinicians, get all clinicians, and to create and delete clinicians.

### Forms

The Forms endpoint will only allow to get an existing form. There will not be any updating, creation, or deletion of forms through this API.

This is the endpoint that takes an XML form that is stored in the backend, and returns a parsed JSON representation of the form.

### Form Responses

Form responses can be created in response to a specific form, and creating an association between a patient and a clinician.

Form responses are allowed to be edited, and deleted as well.