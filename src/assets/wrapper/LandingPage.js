import styled from "styled-components";

const Wrapper = styled.main`
  nav {
    width: 86%;
    max-width: var(--max-width);
    margin: 0 auto;
    height: 9rem;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  nav img {
    width: 10%;
    height: auto;
  }
  .page {
    min-height: calc(100vh - 6rem);
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
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
  @media (max-width: 992px) {
    nav img {
      display: none;
    }
  }
`;
export default Wrapper;
