import React from "react";
import { Alert, Space } from "antd";
import styled from "styled-components";
import useIsMobile from "../hooks/useIsMobile";

const Wrapper = styled.div`
  .anticon-close {
    padding: 0.5rem;
    background-color: white;
    color: black;
  }
`;

const AlertBox = ({ message, setError }) => {
  const isMobile = useIsMobile();
  const onClose = () => {
    setError("");
  };

  return (
    <Wrapper>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Alert
          message="Limited Access!"
          description={message}
          type="info"
          closable
          showIcon={!isMobile}
          onClose={onClose}
        />
      </Space>
    </Wrapper>
  );
};

export default AlertBox;
