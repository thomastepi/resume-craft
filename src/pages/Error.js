import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrapper/ErrorPage";
import img from "../assets/images/page-not-found.svg";

export const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="page not found" />
        <h1>Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/">Back to Home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
