import { validateObjectId } from '../PatientsPage';

it('validates objectID', () => {
  expect(validateObjectId('abc123')).toEqual(false);
  expect(validateObjectId('5db2831a49b61663d0e7b005')).toEqual(true);
});
