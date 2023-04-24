import styled from "styled-components";
import { randomIntFromInterval } from "../../utils/helpers";
const LoadingWrapper = styled.div`
  height: 100px;
  /* left: 35k%; */
  /* margin: -30px 0 0 -20px; */
  position: absolute;
  top: 50%;
  width: 100%;

  @media screen and (min-width: 748px) {
    left: 38% !important;
  }

  @media screen and (max-width: 1024px) {
    left: 25% !important;
  }

  .bar {
    background: #b490ca;
    bottom: 1px;
    height: 6px;
    position: absolute;
    width: 6px;
    animation: sound 0ms -800ms linear infinite alternate;
  }

  @keyframes sound {
    0% {
      opacity: 0.35;
      height: 3px;
    }
    100% {
      opacity: 1;
      height: 88px;
    }
  }

  /* .bar:nth-child(1) {
    left: 1px;
    animation-duration: 474ms;
  }
  .bar:nth-child(2) {
    left: 5px;
    animation-duration: 433ms;
  }
  .bar:nth-child(3) {
    left: 9px;
    animation-duration: 407ms;
  }
  .bar:nth-child(4) {
    left: 13px;
    animation-duration: 458ms;
  }
  .bar:nth-child(5) {
    left: 17px;
    animation-duration: 400ms;
  }
  .bar:nth-child(6) {
    left: 21px;
    animation-duration: 427ms;
  }
  .bar:nth-child(7) {
    left: 25px;
    animation-duration: 441ms;
  }
  .bar:nth-child(8) {
    left: 29px;
    animation-duration: 419ms;
  }
  .bar:nth-child(9) {
    left: 33px;
    animation-duration: 487ms;
  }
  .bar:nth-child(10) {
    left: 37px;
    animation-duration: 442ms;
  } */
`;
export default function MusicBarLoading() {
  const indexArray = [...Array(30).keys()];

  return (
    <LoadingWrapper>
      {indexArray.map((i, index) => (
        <div
          key={`bar_${i}`}
          style={{
            left: `${index * 9}px`,
            animationDuration: `${randomIntFromInterval(400, 480)}ms`,
          }}
          className='bar'></div>
      ))}
    </LoadingWrapper>
  );
}
