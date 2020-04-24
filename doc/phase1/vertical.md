# Vertical

We have a vertical slice of our application working, which connects the frontend, backend and database together.

# Workflow

* The current workflow is able to perform the following:
   * Once the app starts, if the database is empty, the app creates a few patients and clinicians, the clinician enters the patient ID and specifies the form type. The backend server fetches the corresponding xml file (static file), parses the XML form into JSON format in the backend and sends it as a response to the client. It's then converted via [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) to a React Form component. The clinician fills this form and submits the result. The `FormResult` is sent through a POST request to the backend server, which finally stores those results in a MongoDB. The frontend app can fetch all the `formResponses` in the `Responses` tab. For the sake of time, we are using a sample form in [xml-sample-data](https://github.com/csc302-fall-2019/proj-ANTSLAM/blob/dev/backend/utils/sample-xml-data.xml). 


## Frontend

* We can retrieve a patient's forms by specifying the patient ID and the type of form we are requesting.

* We can also create a new form by specifying the form type.

## Backend

* We have models for the following: 
    * Clinician
    * Medical Intervention
    * Medical Procedure
    * Patient

* We have routes for the following:
    * Clinician
    * Form
    * Form Response
    * Patient

* We also have the XML Parser

## Database
* Our database will store the following:
    * Clinicans and Patients
    * FormResponses containing the results of filled forms
    * We might store the parsed forms for easy access instead of parsing it everytime it is queried
