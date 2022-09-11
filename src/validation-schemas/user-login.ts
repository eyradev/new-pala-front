import { UserLogin } from 'models/user-login.mode';
import { object, SchemaOf, string } from 'yup';

export const LoginSchema: SchemaOf<UserLogin> = object().shape({
  email: string().email('Correo Invalido').required('Se requiere el correo'),
  password: string().required('Se requiere la contraseña')
});
