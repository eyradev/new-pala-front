import LoginForm from 'components/login-form/LoginForm';
import { Spinner } from 'components/spinner';
import sections from 'constants/sections';
import { Formik } from 'formik';
import {
  CurrentUserDocument,
  useContentBySectionQuery,
  useLoginMutation
} from 'generated/graphql';
import { UserLogin } from 'models/user-login.mode';
import { Card, Col, Container, Row } from 'reactstrap';
import { LoginSchema } from 'validation-schemas/user-login';
// import styles from './LoginSection.module.css';

export default function LoginSection() {
  const { data, error, loading } = useContentBySectionQuery({
    variables: {
      section: sections.loginBackground
    }
  });

  const [login] = useLoginMutation({
    refetchQueries: [
      {
        query: CurrentUserDocument
      }
    ]
  });

  if (loading) return <Spinner />;
  if (error || !data?.allCustomContents?.length) return null;

  const backgroundImage =
    data.allCustomContents[0]?.image1?.publicUrlTransformed;
  if (!backgroundImage) return null;

  const handleUserLogin = async (user: UserLogin) => {
    console.log(user);
    const { data: ee } = await login({ variables: user });
    console.log(ee);
  };

  return (
    <div className="page-header header-filter" filter-color="black">
      <div
        className="page-header-image"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      />
      <div className="content">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="5">
              <Card className="card-login card-plain">
                <Formik<UserLogin>
                  initialValues={{ email: '', password: '' }}
                  onSubmit={handleUserLogin}
                  validationSchema={LoginSchema}
                >
                  <LoginForm />
                </Formik>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
