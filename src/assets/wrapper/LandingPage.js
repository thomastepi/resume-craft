import styled from "styled-components";

const Wrapper = styled.main`
  /* Hero Section */
  .page {
    min-height: calc(100vh - 5rem); 
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    align-items: center;
    padding: 2rem;
  }
  
  .info {
    max-width: 550px;
  }

  .title {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--neutral-900);
  }

  .feature-list {
    list-style: none;
    padding: 0;
    margin-top: 2rem;
    text-align: left;
  }

  .feature-list li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: var(--neutral-700);
  }

  .feature-list .icon {
    margin-right: 15px;
    font-size: 1.2rem;
  }
  
  .auth-cta {
    margin-top: 2.5rem;
  }

  .btn.btn-hero {
    background-color: var(--secondary-500);
    color: white;
    padding: 0.8rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .btn.btn-hero:hover {
    filter: brightness(110%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .guest-link {
    color: var(--primary-500);
    text-decoration: none;
    font-weight: 600;
  }

  .main-img {
    display: none;
  }
  
  /* Shared Section Styles */
  .landing-section {
    padding: 5rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .landing-section h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--neutral-900);
    margin-bottom: 3rem;
  }

  /* Trusted By Section */
  .trusted-by-section {
    background: var(--neutral-100);
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  .trusted-by-section p {
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.9rem;
    color: var(--neutral-700);
  }
  .logos {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem; 
  }
  .company-logo-text {
    font-size: 1.2rem; 
    font-weight: 700;
    color: var(--neutral-700);
    font-family: "Montserrat", sans-serif;
    background-color: #fff;
    padding: 0.75rem 1.5rem; 
    border-radius: 8px; 
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease-in-out;
    border: 1px solid var(--neutral-300);
  }
  
  .company-logo-text:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  }

  /* How It Works Section */
  .steps-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 3rem;
    text-align: left;
  }
  .step {
    padding: 2rem;
  }
  .step-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid var(--primary-500);
    color: var(--primary-500);
    display: grid;
    place-items: center;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
  }
  .step:hover .step-icon {
    background: var(--primary-500);
    color: white;
  }
  .step h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--neutral-900);
  }
  .step p {
    color: var(--neutral-700);
  }

  /* Stats Section */
  .stats-section {
    background: var(--neutral-900);
    color: #fff;
    display: flex;
    justify-content: space-around;
    border-radius: 12px;
  }
  .stat-item h3 {
    font-size: 3rem;
    font-weight: 700;
    color: var(--secondary-500);
  }
  .stat-item p {
    font-size: 1.1rem;
    color: var(--neutral-100);
  }
  
  /* Testimonial Section */
  .testimonials-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  .testimonial-card {
    background: #fff;
    border-radius: 8px;
    padding: 2.5rem;
    text-align: left;
    border-top: 4px solid var(--secondary-500);
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.07);
    transition: all 0.3s ease;
  }
  .testimonial-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  .testimonial-card .quote {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-style: italic;
    color: var(--neutral-700);
  }
  .author {
    display: flex;
    flex-direction: column;
  }
  .author .author-name {
    font-weight: 700;
    color: var(--neutral-900);
  }
  .author .author-title {
    font-size: 0.9rem;
    color: #64748b;
  }

  /* Final CTA Section */
  .final-cta-section p {
    margin-bottom: 2rem;
    font-size: 1.2rem;
    color: var(--neutral-700);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  /* Features Section */
  .features-section {
    background: var(--neutral-100);
  }

  .features-section p {
    font-size: 1.1rem;
    color: var(--neutral-700);
    max-width: 700px;
    margin: 1rem auto 3rem auto;
  }

  .features-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .feature-card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    border-top: 4px solid var(--primary-500);
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }

  .feature-icon {
    font-size: 3rem;
    color: var(--secondary-500);
    margin-bottom: 1rem;
    display: block;
  }

  .feature-card h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--neutral-900);
    margin-bottom: 0.75rem;
  }

  .feature-card p {
    color: var(--neutral-700);
    font-size: 1rem;
    line-height: 1.6;
  }

  /* Responsive Design */
  @media screen and (min-width: 900px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }

  @media screen and (max-width: 900px) {
    .page {
      min-height: auto;
      text-align: center;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .title {
      font-size: 2.5rem;
    }
    .steps-container,
    .stats-section,
    .testimonials-container {
      grid-template-columns: 1fr;
      flex-direction: column;
    }
  }
`;
export default Wrapper;
