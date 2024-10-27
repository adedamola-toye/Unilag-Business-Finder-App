import React, { Component } from "react";

// this component is meant to control any errors that we might not know of
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-black">
          <h1 className="text-xl">Oops! Something went wrong</h1>
          <p>Try refreshing the page</p>
          <p>Or go back to another page</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
