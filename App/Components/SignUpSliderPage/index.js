/* eslint-disable react/no-array-index-key */
/**
 *
 * SignUpSliderPage
 *
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Hammer from 'hammerjs';
import Header from '../../containers/Header';
import Img from '../Img';
import image1 from '../../images/signup-image-1.jpg';
import image2 from '../../images/signup-image-2.jpg';
import Container from '../Container';
import { FormPage } from '../styled/Form';

const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex: 1;
  border: 1px solid red;
  background: url(${image1}) center center no-repeat;
  background-size: cover;
  background-blend-mode: darken;
  transition: 0.3s;
`;

const MainContainer = styled(Container)`
  flex: 1;
`;

const Footer = styled.div`
  padding-bottom: 3.5rem;
`;

const FooterContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled(Link)`
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 2rem;
  text-align: center;
  border-radius: 0.4rem;
  background-color: #1c7ac3;
  display: block;
  padding: 1.7rem;
  text-decoration: none;
  width: 100%;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 2.6rem;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 3.1rem;
  text-align: center;
  margin-bottom: 0.4rem;
  max-width: 32.4rem;
`;

const SubTitle = styled.p`
  max-width: 22.3rem;
  color: #ffffff;
  font-size: 1.4rem;
  letter-spacing: 0;
  line-height: 2rem;
  text-align: center;
  margin-bottom: 2.4rem;
`;

const LogoWrapper = styled.div`
  width: 6rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
  margin-bottom: 1.2rem;
`;

const BulletList = styled.div`
  margin-bottom: 2.6rem;
`;

const Bullet = styled.button.attrs(() => ({ type: 'button' }))`
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  opacity: 0.3;
  background-color: #ffffff;
  margin: 0 9px;
  border: 0;
  cursor: pointer;
  ${props =>
    props.active &&
    css`
      opacity: 1;
    `}
`;

const items = [
  {
    title: 'Payments Simplified',
    text: 'Connect to your bank account for safe, easy, digital payments.',
    image: image1,
  },
  {
    title: 'Payments Simplified',
    text: 'Make purchases at your favorite retailers.',
    image: image2,
  },
  {
    title: 'Payments Simplified',
    text:
      'Earn cash back rewards and product discounts when you use Artery Pay.',
    image: image1,
  },
];

function SignUpSliderPage() {
  // eslint-disable-next-line no-unused-vars
  const [slides, setSlides] = useState(items);
  const [hammerCounter, setHammerCounter] = useState(0);
  const [slideIndex, setSlideIndex] = useState(hammerCounter);

  const elem = useRef(null);
  const hammer = useRef(null);

  useEffect(() => {
    // caching images.
    slides.forEach(({ image }) => {
      new Image().src = image;
    });
  }, []);

  useEffect(() => {
    let nextSlide = Math.abs(hammerCounter % slides.length);
    if (nextSlide < 0) {
      nextSlide = slides.length - 1;
    }
    if (nextSlide > slides.length - 1) {
      nextSlide = 0;
    }
    setSlideIndex(nextSlide);
  }, [hammerCounter]);

  useEffect(() => {
    hammer.current = new Hammer(elem.current, {
      touchAction: 'swipe-x',
    });

    hammer.current.on('swipeleft swiperight', ({ type }) =>
      setHammerCounter(
        prevState => prevState + (type === 'swipeleft' ? 1 : -1),
      ),
    );

    return () => {
      if (hammer.current) {
        hammer.current.destroy();
      }
    };
  }, []);

  const handleBulletClick = useCallback(value => {
    setSlideIndex(value);
  }, []);

  return (
    <FormPage>
      <Header title="Create Account" goBackTo="/" hideKeyLine />
      <SubWrapper
        ref={elem}
        style={{
          background: `url(${
            slides[slideIndex].image
          }) no-repeat center center fixed`,
        }}
      >
        <MainContainer />
        <Footer>
          <FooterContainer>
            <LogoWrapper>
              <Img
                name="icons/Artery_Pay_Icon"
                alt="Artery Pay"
                width={48}
                height={33}
                srcSet={[2, 3, 4]}
              />
            </LogoWrapper>
            <Title>{slides[slideIndex].title}</Title>
            <SubTitle>{slides[slideIndex].text}</SubTitle>
            <BulletList>
              {slides.map((item, index) => (
                <Bullet
                  key={index}
                  onClick={() => handleBulletClick(index)}
                  active={index === slideIndex}
                />
              ))}
            </BulletList>
            <Button to="/register/form">Get Started</Button>
          </FooterContainer>
        </Footer>
      </SubWrapper>
    </FormPage>
  );
}

SignUpSliderPage.propTypes = {};

export default SignUpSliderPage;
