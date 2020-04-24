const API = {
  GET_FORM(formID, port) {
    return `http://localhost:${port}/forms/${formID}`;
  },
  SUBMIT_FORM(formID, port) {
    return `http://localhost:${port}/forms/${formID}`;
  },
};

export default API;
