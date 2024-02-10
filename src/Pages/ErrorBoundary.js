import React, { Component, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorBoundaryCommonLogic = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const loginStatus = localStorage.getItem('login');
    if (loginStatus !== "Success") navigate("/")
  }, [])
  return null
}
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidMount() {
    this.setState({ hasError: false });
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      const componentName = this.props.componentName || "Unknown Component";
      return (
        <div>
          <p>Error occurred in {componentName}. Please try again later.</p>
        </div>
      );
    }
    return (
      <>
        <ErrorBoundaryCommonLogic />
        {this.props.children}
      </>
    )
  }
}

export default ErrorBoundary;

