import styled from "styled-components";

const Wrapper = styled.main`
  .page {
    min-height: 100vh;
    width: 80%;
    display: grid;
    align-items: center;
    position: relative;
    padding: 0 !important;
    margin-top: -5rem;
  }
  .page img {
    width: 40%;
    height: 100%;
    position: absolute;
    right: 0;
  }

  .logo-mobile img {
    width: 6rem;
    height: 6rem;
  }

  .logo-mobile {
    width: 80%;
    margin: 0 auto;
  }
  .auth-cta {
    margin-top: 2rem;
    max-width: 300px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

  .landing-span {
    font-size: 14px;
    color: #486581;
  }

  .feature-list {
    list-style: none;
    padding: 0;
    margin-top: 1.5rem;
    text-align: left;
    max-width: 450px;
  }

  .feature-list li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: #334155;
  }

  .feature-list .icon {
    margin-right: 15px;
    font-size: 1.2rem;
  }

  .landing-section {
    padding: 4rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .trusted-by-section {
    background: #f8fafc;
    padding-top: 2rem;
    padding-bottom: 2rem;
    margin-top: 3rem;
  }
  .trusted-by-section p {
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.9rem;
  }
  .logos {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
  }
  .logos span {
    font-size: 1.5rem;
    font-weight: 600;
    color: #9ca3af;
    font-family: "Poppins", sans-serif;
  }

  .how-it-works-section h2,
  .final-cta-section h2 {
    font-size: 2.25rem;
    margin-bottom: 1rem;
  }

  .steps-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 3rem;
  }
  .step {
    padding: 2rem;
    border-radius: 8px;
  }
  .step-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-500);
    color: #bbb8b8ff;
    display: grid;
    place-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 auto 1.5rem auto;
  }
  .step h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .stats-section {
    background: #1e293b;
    color: #fff;
    display: flex;
    justify-content: space-around;
    border-radius: 12px;
  }
  .stat-item h3 {
    font-size: 3rem;
    font-weight: 700;
    color: var(--primary-500);
  }
  .stat-item p {
    font-size: 1.1rem;
    color: #e2e8f0;
  }

  .final-cta-section p {
    margin-bottom: 2rem;
    font-size: 1.2rem;
  }

  .testimonial-section h2 {
    font-size: 2.25rem;
    margin-bottom: 3rem;
  }
  .testimonials-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  .testimonial-card {
    background: #fff;
    border-radius: 8px;
    padding: 2rem;
    text-align: left;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-top: 4px solid var(--primary-500);
  }
  .testimonial-card .quote {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-style: italic;
    color: #334155;
  }
  .author {
    display: flex;
    flex-direction: column;
  }
  .author .author-name {
    font-weight: 700;
  }
  .author .author-title {
    font-size: 0.9rem;
    color: #64748b;
  }

  @media screen and (min-width: 900px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
  }
  @media screen and (max-width: 900px) {
    .page {
      min-height: auto;
      text-align: center;
      margin-top: 2rem;
    }
    .logo-mobile {
      display: flex;
      justify-content: center;
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
    .steps-container,
    .stats-section,
    .testimonials-container {
      grid-template-columns: 1fr;
      flex-direction: column;
    }
  }

  @media screen and (max-width: 480px) {
    .logo-mobile img {
      width: 30%;
    }
    .trusted-by-section {
      margin-top: 5rem;
    }
  }
`;
export default Wrapper;
