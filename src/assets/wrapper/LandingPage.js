import styled from "styled-components";

const Wrapper = styled.main`
  nav {
    width: 64%;
    max-width: var(--max-width);
    margin: 0 auto;
    /* height: 9rem; */
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  nav img {
    width: 10%;
    height: auto;
  }
  @media (max-height: 500px) {
    nav img {
      display: none;
    }
    nav {
      height: 4rem;
    }
  }
  .page {
    min-height: calc(100vh - 6rem);
    width: 65%;
    display: grid;
    align-items: center;
    margin-top: -3rem;
    position: relative;
  }
  .page img {
    width: 40%;
    height: 100%;
    position: absolute;
    right: 0;
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
    display: none;
  }
  .btn {
    background-color: rgba(47, 43, 43, 0.818);
    color: white;
  }

  .logo-mobile {
    display: none;
  }
  @media screen and (min-width: 768px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
  @media screen and (max-width: 768px) {
    nav img {
      display: none;
    }
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
  }

  @media screen and (max-width: 480px) {
    .logo-mobile img {
      width: 40%;
    }
  }
`;
export default Wrapper;
