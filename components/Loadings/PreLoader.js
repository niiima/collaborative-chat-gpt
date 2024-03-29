import styled from "styled-components";
// .preloader,
// .preloader:before,
// .preloader:after
const LoaderWrapper = styled.div`
  position: absolute;
  margin: -48px 0 0 -48px;
  display: block;
  position: relative;
  width: 90px;
  height: 90px;
  border: 3px solid #eb1777;
  border-radius: 50%;
  top: 70%;
  left: 50%;
  animation-delay: 0.2s;

  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 58px;
    height: 58px;
    border: 3px solid #3bb4e5;
    top: 70%;
    left: 50%;
    margin: -32px 0 0 -32px;
    border-radius: 50%;
    animation-delay: 0.4s;
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    border: 3px solid #ccdc25;
    width: 26px;
    height: 26px;
    top: 70%;
    left: 50%;
    margin: -16px 0 0 -16px;
    border-radius: 50%;
    animation-delay: 0.6s;
  }

  &,
  &:after,
  &:before {
    animation-name: Scale;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-direction: alternate;
    -webkit-animation-name: Scale;
    -webkit-animation-duration: 3s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: ease-in-out;
    -webkit-animation-direction: alternate;
  }

  @keyframes Scale {
    25% {
      transform: scale(-1.2, 1.2);
    }
    50% {
      transform: scale(-1, -1);
    }
    75% {
      transform: scale(1.2, -1.2);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  @-webkit-keyframes Scale {
    25% {
      -webkit-transform: scale(-1.2, 1.2);
    }
    50% {
      -webkit-transform: scale(-1, -1);
    }
    75% {
      -webkit-transform: scale(1.2, -1.2);
    }
  }
`;

export default LoaderWrapper;
