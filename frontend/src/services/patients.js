import { getData, api, postData } from './base';

export async function getPatients(query) {
  const { data } = await getData(api('patients'), { params: query });

  return data;
}

export async function createPatient(patient) {
  const { data } = await postData(api('patients'), patient);

  return data;
}
