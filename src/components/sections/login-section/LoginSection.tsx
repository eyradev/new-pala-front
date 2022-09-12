import LoginForm from 'components/login-form/LoginForm';
import { Spinner } from 'components/spinner';
import sections from 'constants/sections';
import { Formik } from 'formik';
import {
  CurrentUserDocument,
  useContentBySectionQuery,
  useLoginMutation
} from 'generated/graphql';
import useUser from 'hooks/useUser';
import { UserLogin } from 'models/user-login.mode';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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

  const router = useRouter();

  const user = useUser();

  useEffect(() => {
    if (user?.id) router.push('/');
  }, [user, router]);

  if (loading) return <Spinner />;
  if (error || !data?.allCustomContents?.length) return null;

  const backgroundImage =
    data.allCustomContents[0]?.image1?.publicUrlTransformed;
  if (!backgroundImage) return null;

  const handleUserLogin = async (userData: UserLogin) => {
    const { data: authUser } = await login({ variables: userData });
    if (authUser?.authenticateUserWithPassword) {
      router.push('/');
    }
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
