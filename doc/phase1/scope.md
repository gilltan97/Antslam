# Scope
Each of our team members had indivdual learning goals that they wanted to reach:
- Alex: Gain more experience with front-end development
- Amr: Further skills in front-end architecture design 
- Musa: Pursue more knowledge in micro-services and databases 
- Nikita: Learn more about OpenAPI, and CI/CD
- Tanveer: Gain more knowledge in dev-ops 
- Shoaib: Gain more experience in using the MERN stack (focusing on backend)
- Lana: Gain more experience in backend development

Given our individual team's learning goals, we decided that the most fruitful approach to this project would be to focus on having an impeccably dynamic front-end interface, supported by the dynamic algorithmic parsing of the XML to JSON in the backend, backed by the persistence, retrieval, and querying of all the information, documents, and forms necessary through our database entries, all while focusing on learning how to build robust APIs and service interfaces as per the Bezos Dictum on web services.

Hence, our code will solve the following use cases:
1) Input the diagnosis procedure and retrieve the empty form to be filled, question by question
2) Fill the form with responses to each question and its dependant questions
3) Store the responses of the filled form in a persistent manner for the specific patient
4) Retrieve the information of a given patient's form (in raw data rather than with in SDC form format)
5) Convert XML SDCs into JSON-React Schema dynamically 
6) Submit the PID and DPID to the Doctor so they can access the information through our tools
7) Query the answers on the form viewer side based on the QID and the input constraints 
8) Search For Patients by Name
9) Get the Forms associated with a patient
10) Obtain URL link for final form and answers
11) Allow form receiver to use the link to retrieve the form: the link has to have the PID and DPID in it's URL params, and we can then query those entries from our database.

Because we have chosen this subset of use cases, we are forced to modify the following use cases:
1) Modify Form Receiver's view: When a doctor requests to view an already-submitted form, we will show the anwers and questions as text rather than form objects. This is because we believe that this format (i.e. turning multiple choice questions into Question -> chosen answer) is more informative to the doctor than seeing the whole form itself. By only showing the chosen question-answer pairs, we are removing the noise and allowing the doctor to focus on the information that matters.

And Omit the following:
1) SDC Manager uploading/deleting/editing a new XML form into the data base as an SDC form manager: Our main focus will be on having a seamless integration of Frontend->Backend->database (and viceversa), so we have decided to omit the endpoint that allows a manager to input a new XML since it isn't as related to our learning goals. 
2) Form Filler editing the already-submitted form at the Radiologist level: since we are putting all our resources into dynamically parsing the XML, dynamically rendering the react components, and querying the information we've stored, we will not be implementing changing already-parsed responses due to feasability measures.  

Time Permitting
1) Email the link to the receiver: This is a very interesting feature that our members would like to learn how to implement. Since it's not as high a priority as the basic functionality of the the SDC service, we may not be able to implement it. But if we have enough time to implement this feature, we will be sending an email to a form receiver.

A more in-depth look at the exact use cases we are covering (as also specified in the P1 handout)

## SDCTools Service
1. Get SDCForm for a DiagnosticProcedureID. Return the model object that represents a SDCForm in the client.
2. Validate data entered in to a question field. (called by clients to validate data entered into a field of a form)\
    1. Integer 
    2. Decimal
    3. String
3. Create new SDCFormIterator, positioned at first node in form
4. Get SDCFormNode at current position of SDCFormIterator
5. Query if SDCFormIterator has a next node
6. Position SDCFormIterator to next node
7. Get questions of current node
8. Get enabled state of node
9. Get control node of a node
10. Enter working answer for a node and propagate dependencies. (returns at least indication that dependencies have changed enabled state)
Get list of dependent nodes of a given node (none if not control node)

## Actor Form Filler (Radiologist)
1) Assume only about a dozen radiology and pathology diagnostic procedures exist for this project. 
2) Search for form by diagnostic procedure eg: Cat Scan (CT) of lung.
3) Start new structured clinical note for patient, procedure.
4) Fetch the form 
5) Render the form (HTML or React|Angular webapp etc. )
6) User fills out form creating form response (SDCFormResponse)
7) Save form response to (our prototype) enhanced EMR as structured clinical note, or “form response.
8) Delete form response.
9) Obtain external link to the completed form

## Actor Form Receiver
1. View external reference to saved structured clinical note via query/link
2. Advanced, search for by querying the data using a search bar mechanism:
    1. List of SDCFormResponses in which the various questions have been answered in specific ways. 
    2. List of SDCFormResponses for LungRADS Category 4A for female patients older than 65.

