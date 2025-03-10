import styled from "styled-components";

const Wrapper = styled.div`
  .page {
    min-height: 100vh;
    width: 65%;
    display: grid;
    align-items: center;
    margin-top: -9rem;
    position: relative;
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
    display: none;
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
    .main-img,
    .title {
      display: none;
    }
  }

  @media screen and (max-width: 480px) {
    .logo-mobile img {
      width: 30%;
    }
  }
`;
export default Wrapper;
