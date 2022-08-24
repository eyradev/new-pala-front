import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';

export default function IllnessDropdown() {
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
        <DropdownItem>Sickness 1</DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
}
