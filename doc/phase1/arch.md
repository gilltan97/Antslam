# Architecture 
The project is split into backend and frontend web services. 

## Frontend
1. FormFiller webapp: The client-side web application renders the web pages for the clinicians to login, fill the form, view the structured clinical note in JSON format, etc. The major functionality of this frontend application is to render the correct form for the clinicians to enter the clinical note. To render the form, the client application requests the API to provide the form given patients OHIP # and the type of the form.
2. FormViewer webapp: Based on the scope we decided to focus on rendering the SDCForm more than setting up a nice UI for viewing the FormResponse. Therefore, the FormViewer app will have only one page that takes a patientdId (OHIP #) and formType to display the corresponding FormResponse in simple text.

## Backend
The server is connected to the database which stores all the data required for the application. The database is accessed through mongoose ORM (Object-relational mapping) middleware to respond the incoming requests form the frontend. The XMLParser middleware is instantiated when the frontend application requests a particular form. When a form is requested, the raw XML for the requested form is passed through the XMLParser middleware to convert the XML form into JSON format before responding to the request. The response follows [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) format.


Here is the visual of the architecture.
![SDC architecture](https://github.com/csc302-fall-2019/proj-ANTSLAM/blob/docs/arch/assets/arch.png)
