import React, { Component } from "react";
import styled from "styled-components";

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px 0;
`;

const ErrorText = styled.span`
  font-size: 24px;
  font-family: ${({ theme }) => theme.openSans};
  font-weight: ${({ theme }) => theme.fontNormal};
`;

const RetryButton = styled.button`
  font-size: 20px;
  border: none;
  background: #535558;
  outline: none;
  color: #fff;
  width: 85px;
  margin: 20px auto;
  border-radius: 4px;
  font-weight: lighter;
`;

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    const reload = window.location.reload.bind(window.location);
    if (hasError) {
      return (
        <ErrorWrapper>
          <ErrorText className="text-center">Something went wrong!</ErrorText>
          {/* eslint-disable-next-line */}
          <RetryButton type="submit" onClick={reload}>
            Retry
          </RetryButton>
        </ErrorWrapper>
      );
    }
    return children;
  }
}

export { ErrorBoundary };
