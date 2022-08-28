/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from 'next/link';
import { CarouselItem, CarouselItemProps, Col, Row } from 'reactstrap';
import styles from './MediaCarouselItem.module.css';

export interface MediaCarouselItemProps extends CarouselItemProps {
  background: string;
  header: string;
  body?: string;
  redirectPath?: string;
}

export default function MediaCarouselItem({
  background,
  header,
  body,
  redirectPath,
  ...props
}: MediaCarouselItemProps) {
  const itemStyles = ['page-header header-filter', styles.header];
  if (redirectPath) {
    itemStyles.push(styles.clickable);
  }

  return (
    <CarouselItem {...props}>
      <div className={itemStyles.join(' ')}>
        <div
          className="page-header-image"
          style={{
            backgroundImage: `url(${background})`
          }}
        />
        <div className="content-center text-center">
          <Row>
            <Col className="ml-auto mr-auto" md="8">
              {redirectPath ? (
                <Link href={redirectPath}>
                  <a>
                    <h1 className="title">{header}</h1>
                  </a>
                </Link>
              ) : (
                <h1 className="title">{header}</h1>
              )}
              {body && <h4 className="description text-white">{body}</h4>}
            </Col>
          </Row>
        </div>
      </div>
    </CarouselItem>
  );
}
