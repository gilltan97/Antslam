import { getData, api, postData } from './base';

export async function getClinicians() {
  const { data } = await getData(api('clinicians'));

  return data;
}

export async function createClinician(clinician) {
  const { data } = await postData(api('clinicians'), clinician);

  return data;
}
