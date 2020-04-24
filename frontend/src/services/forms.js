import { getData, api } from './base';

export async function getForms() {
  const { data } = await getData(api('forms'));

  return data;
}

export async function getForm(formType) {
  const { data } = await getData(api(`forms/${formType}`));

  return data;
}
