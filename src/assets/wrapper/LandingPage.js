import styled from "styled-components";

const Wrapper = styled.div`
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .page {
    width: 80%;
    display: grid;
    align-items: center;
    /* margin-top: -9rem; */
    position: relative;
    padding: 0 !important;
  }
  .page img {
    width: 40%;
    height: 100%;
    position: absolute;
    right: 0;
  }
  .auth-child {
    margin-top: 2rem;
    max-width: 300px;
  }

  .landing-or-divider {
    margin: 5px 0;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: #486581;
  }
  .main-img {
    display: block;
  }

  .logo-mobile {
    /* display: none; */
    width: 80%;
    margin: 0 auto;
  }

  .logo-mobile img {
    width: 6rem;
    height: 6rem;
  }

  .guest-cta {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .disclaimer {
    font-size: 16px;
  }

  .sub-title {
    font-size: 18px;
    color: #64748b;
    font-weight: bold;
  }

  .landing-span {
    font-size: 14px;
    color: #486581;
  }

  @media screen and (min-width: 900px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
      margin-top: 2rem;
    }
  }
  @media screen and (max-width: 900px) {
    .logo-mobile {
      display: flex;
      justify-content: center;
    }
    .page {
      text-align: center;
      margin-top: 2rem;
    }
    .logo-mobile img {
      width: 30%;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
    .main-img {
      display: none;
    }
    .title {
      /* display: none; */
    }
  }

  @media screen and (max-width: 480px) {
    .logo-mobile img {
      width: 30%;
    }
  }
`;
export default Wrapper;
