import { Input, InputGroup, InputGroupText } from 'reactstrap';
import styles from './SearchBox.module.css';

export default function SearchBox() {
  return (
    <div className={styles.container}>
      <form style={{ width: '100%' }}>
        <div>
          <InputGroup className="input-group-focus">
            <div className="input-group-prepend">
              <InputGroupText>
                <i className="fas fa-search" />
              </InputGroupText>
            </div>

            <Input />
          </InputGroup>
        </div>
      </form>
    </div>
  );
}
