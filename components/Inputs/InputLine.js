import React from "react";
import styled from "styled-components";
const InputWrapper = styled.div`
  --primary: #11998e;
  --secondary: #38ef7d;
  --white: #fff;
  --gray: #9b9b9b;

  /* background-color: red; */
  position: relative;
  /* padding: 15px 0 0; */
  /* margin-top: 10px; */
  width: 100%;

  .form__field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid var(--gray);
    outline: 0;
    color: var(--white);
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
    @media screen and (min-width: 748px) {
      font-size: 1.2rem;
    }
    @media screen and (max-width: 1024px) {
      font-size: 0.8rem;
    }

    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown ~ .form__label {
      /* font-size: 1.3rem; */
      @media screen and (min-width: 748px) {
        font-size: 1.2rem;
      }
      @media screen and (max-width: 1024px) {
        font-size: 0.8rem;
      }
      cursor: text;
      top: 20px;
    }
  }

  .form__label {
    position: absolute;
    top: -10px;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: rgba(60, 60, 60, 0.3);
  }
  .form__field:focus {
    ~ .form__label {
      position: absolute;
      top: -15px;
      margin-left: -5px;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: var(--primary);
      @media screen and (min-width: 748px) {
        font-weight: 700;
      }
      @media screen and (max-width: 1024px) {
        font-weight: 500;
      }
    }
    padding-bottom: 6px;
    border-width: 3px;
    border-image: linear-gradient(to right, var(--primary), var(--secondary));
    border-image-slice: 1;
    @media screen and (min-width: 748px) {
      font-weight: 700;
    }
    @media screen and (max-width: 1024px) {
      font-weight: 500;
    }
  }
  /* reset input */
  .form__field {
    &:required,
    &:invalid {
      box-shadow: none;
    }
  }
`;
export default function InputLine({ value, handleChange }) {
  return (
    <InputWrapper className='form__group'>
      <input
        type='input'
        className='form__field'
        placeholder='Name'
        name='playlist_description'
        id='playlist_description'
        required
        onChange={(e) => handleChange(e.currentTarget.value)}
        value={value}
      />
      <label htmlFor='playlist_description' className='form__label'>
        Describe your vibe!
      </label>
    </InputWrapper>
  );
}
