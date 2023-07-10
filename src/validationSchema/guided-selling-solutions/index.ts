import * as yup from 'yup';

export const guidedSellingSolutionValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  organization_id: yup.string().nullable(),
});
