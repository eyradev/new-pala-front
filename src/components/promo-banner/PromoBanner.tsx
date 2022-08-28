import { CustomContent } from 'generated/graphql';
import Link from 'next/link';
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Container,
  Row
} from 'reactstrap';

interface Props {
  content: Partial<CustomContent>;
}

export default function PrommoBanner({ content }: Props) {
  if (!content?.image1?.publicUrlTransformed || !content?.heading1) return null;

  const img1 = content.image1.publicUrlTransformed;
  const img2 =
    content.image2?.publicUrlTransformed || content.image1.publicUrlTransformed;

  return (
    <Container fluid>
      <Row>
        <Col className="px-0" md="6">
          <Card
            className="card-fashion card-background"
            style={{
              backgroundImage: `url(${img1})`
            }}
          >
            <CardBody>
              {content.heading1 && (
                <CardTitle className="text-left" tag="div">
                  <h2>
                    {content.path ? (
                      <Link href={content.path}>
                        <a>{content.heading1}</a>
                      </Link>
                    ) : (
                      <>{content.heading1}</>
                    )}
                  </h2>
                </CardTitle>
              )}
              {content.heading2 && (
                <CardFooter className="text-left">
                  <div className="stats">{content.heading2}</div>
                </CardFooter>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col className="px-0" md="6">
          <div className="card-container">
            <Card className="card-fashion">
              {content.body && (
                <CardTitle tag="div">
                  <h4>
                    {content.path ? (
                      <Link href={content.path}>
                        <a>{content.body}</a>
                      </Link>
                    ) : (
                      <>{content.body}</>
                    )}
                  </h4>
                </CardTitle>
              )}
            </Card>
            <Card
              className="card-fashion card-background"
              style={{
                backgroundImage: `url(${img2})`
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
