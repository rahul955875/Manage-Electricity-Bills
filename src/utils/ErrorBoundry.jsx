import { Typography } from "@mui/material";
import { Component } from "react";

class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error) {
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Typography variant="subtitle2">Something went wrong</Typography>
        )
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundry;
