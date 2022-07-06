import React from "react";
import { MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter
      color="stylish-color-dark"
      className="text-center font-small darken-2 fixed-bottom"
    >
      <p className="footer-copyright mb-0 py-3 text-center">
        &copy; {new Date().getFullYear()} Copyright: B308
      </p>
    </MDBFooter>
  );
};

export default Footer;
