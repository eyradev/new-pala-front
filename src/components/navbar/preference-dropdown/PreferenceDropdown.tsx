import { Spinner } from 'components/spinner';
import { useAllPreferencesQuery } from 'generated/graphql';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';

export default function PreferenceDropdown() {
  const { data, error, loading } = useAllPreferencesQuery();

  if (error) return null;
  if (!loading && !data?.allPreferences?.length) return null;
  return (
    <UncontrolledButtonDropdown nav>
      <DropdownToggle
        caret
        color="default"
        data-toggle="dropdown"
        id="illness-dropdown"
        nav
      >
        Categorias
      </DropdownToggle>
      <DropdownMenu aria-labelledby="illness-dropdown">
        {loading && <Spinner color="primary" type="grow" />}
        {data?.allPreferences?.length &&
          data.allPreferences.map((preference) => {
            if (!preference?.name) return null;
            return (
              <DropdownItem key={preference.id}>{preference.name}</DropdownItem>
            );
          })}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
}
