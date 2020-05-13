import * as React from "react";
import PropTypes from "prop-types";
import Style from "../theme/Style";
import { PageHeader } from "antd";

const Header = ({ classes }) => {
  return <PageHeader title="This is the Header" ghost={false} />;
};

Header.propTypes = {
  classes: PropTypes.any,
};

const styles = (_theme) => ({});
export default Style(styles)(Header);
