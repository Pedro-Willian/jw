import React from 'react';
import { Row, Col } from 'antd';

export const PageOrganizer = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col sm={24} lg={Array.isArray(children) ? 12 : 24}>
          {Array.isArray(children) ? children[0] : children}
        </Col>
        {Array.isArray(children) && (
          <Col xs={24} lg={12}>
            {children[1]}
          </Col>
        )}
      </Row>
    </>
  );
};
