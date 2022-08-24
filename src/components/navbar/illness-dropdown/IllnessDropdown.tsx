import { useAllIllnessesQuery } from 'generated/graphql';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Spinner,
  UncontrolledButtonDropdown
} from 'reactstrap';

export default function IllnessDropdown() {
  const { data, error, loading } = useAllIllnessesQuery();

  if (error) return null;
  if (!loading && !data?.allIllnesses?.length) return null;
  return (
    <UncontrolledButtonDropdown nav>
      <DropdownToggle
        caret
        color="default"
        data-toggle="dropdown"
        id="illness-dropdown"
        nav
      >
        Apto Para
      </DropdownToggle>
      <DropdownMenu aria-labelledby="illness-dropdown">
        {!loading && <Spinner color="primary" />}
        {data?.allIllnesses?.length &&
          data.allIllnesses.map((illness) => {
            if (!illness?.name) return null;
            return <DropdownItem key={illness.id}>{illness.name}</DropdownItem>;
          })}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
}
