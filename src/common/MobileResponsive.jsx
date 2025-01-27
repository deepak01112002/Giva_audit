import React from "react";

import { config } from "config";

class MobileResponsive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isScreenTypeMobile: false,
    };
  }

  componentDidMount() {
    this.isMobileView();
    window.addEventListener("resize", () => this.isMobileView());
  }

  componentWillUnmount() {
    window.addEventListener("resize", null);
  }

  isMobileView() {
    if (window.innerWidth <= 900) {
      this.setState({ isScreenTypeMobile: true });
    } else {
      this.setState({ isScreenTypeMobile: false });
    }
  }

  render() {
    const { isScreenTypeMobile } = this.state;
    const { web, mobile, app } = this.props;

    // mobile and app
    if (config.isMobileApp && app) {
        return app();
    }

    if ((isScreenTypeMobile || config.isMobileApp) && mobile) {
        return mobile();
    }

    return web();
  }
}

export default MobileResponsive;
