import {
  getData, api, postData, putData,
} from './base';

export async function getFormResponses() {
  const { data } = await getData(api('form-responses'));
  return data;
}

export async function getFormResponseForPatient(patientID, formType) {
  const { data } = await getData(api('form-responses'), {
    params: {
      patient: patientID,
      formId: formType,
    },
  });
  return data;
}

export async function createFormResponse(formResponse) {
  const { data } = await postData(api('form-responses'), formResponse);

  return data;
}

export async function updateFormResponse(formResponse, id) {
  const { data } = await putData(api(`form-responses/${id}`), formResponse);

  return data;
}
