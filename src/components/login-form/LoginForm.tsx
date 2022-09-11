/* eslint-disable react/jsx-no-undef */
import { Logo } from 'components/logo';
import { Form, useFormikContext } from 'formik';
import { UserLogin } from 'models/user-login.mode';
import Link from 'next/link';
import { useState } from 'react';
import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  InputGroup,
  InputGroupText,
  Label
} from 'reactstrap';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const { values, errors, touched, handleChange, handleSubmit } =
    useFormikContext<UserLogin>();

  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);

  return (
    <Form onSubmit={handleSubmit}>
      <CardHeader
        className="text-center"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className={`logo-container ${styles.logoContainer}`}>
          <Logo variant="full" />
        </div>
      </CardHeader>
      <CardBody>
        {errors.email && touched.email && errors.email}
        <InputGroup
          className={`no-border input-lg${
            firstFocus ? ' input-group-focus' : ''
          }`}
        >
          <div className="input-group-prepend">
            <InputGroupText>
              <i className="now-ui-icons ui-1_email-85" />
            </InputGroupText>
          </div>

          <Input
            placeholder="Correo ..."
            name="email"
            type="email"
            value={values.email}
            onFocus={() => setFirstFocus(true)}
            onBlur={() => setFirstFocus(false)}
            onChange={handleChange}
          />
        </InputGroup>
        {errors.password && touched.password && errors.password}
        <InputGroup
          className={`no-border input-lg${
            lastFocus ? ' input-group-focus' : ''
          }`}
        >
          <div className="input-group-prepend">
            <InputGroupText>
              <i className="now-ui-icons ui-1_lock-circle-open" />
            </InputGroupText>
          </div>
          <Input
            placeholder="Contraseña ..."
            type="password"
            name="password"
            onFocus={() => setLastFocus(true)}
            onBlur={() => setLastFocus(false)}
            onChange={handleChange}
          />
        </InputGroup>
      </CardBody>
      <CardFooter className="text-center">
        <Button
          block
          type="submit"
          className={`btn-round ${styles.boton}`}
          color="primary"
          size="lg"
        >
          Iniciar Sesión
        </Button>
      </CardFooter>
      <Link href="/forgot-password">
        <Label style={{ cursor: 'pointer' }}>Olvidé mi contraseña</Label>
      </Link>
    </Form>
  );
}
