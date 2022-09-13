import { useFormikContext } from 'formik';
import { useAllPreferencesQuery } from 'generated/graphql';
import { CardBody, FormGroup, Input, Label } from 'reactstrap';
import { ProductSearchFilter } from '../common';

export default function Categories() {
  const { values, handleChange } = useFormikContext<ProductSearchFilter>();

  const { data: preferences } = useAllPreferencesQuery();

  if (!preferences?.allPreferences) return null;

  return (
    <CardBody>
      {preferences.allPreferences.map((preference) => {
        if (preference && preference.id) {
          return (
            <FormGroup check key={preference.id}>
              <Label check>
                <Input
                  checked={
                    values.selectedCategoryIds?.includes(preference.id) ?? false
                  }
                  name="selectedCategoryIds"
                  value={preference.id}
                  type="checkbox"
                  onChange={handleChange}
                />
                <span className="form-check-sign" />
                {preference.name}
              </Label>
            </FormGroup>
          );
        }
        return null;
      })}
    </CardBody>
  );
}
