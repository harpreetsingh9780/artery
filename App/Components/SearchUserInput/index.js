/**
 *
 * SearchUserInput
 *
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';
import Img from '../Img';
import { InputField } from '../BaseInput';
import { PHONE_NUMBER_COUNTRY } from '../../utils/constants';

const Input = styled(InputField)`
  border: none;
  background-color: transparent;
  margin-left: 1.1rem;
  font-weight: 400;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  border: 0.5px solid #eaeaea;
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
  padding: 0.9rem 1.2rem;
  ${props =>
    props.active &&
    css`
      ${Input} {
        color: #1c7ac3;
      }
    `}
`;

function SearchUserInput({ value, onChange }) {
  const inputRef = useRef(null);

  const initValue = val => {
    if (!val) {
      return '';
    }
    return new AsYouType(PHONE_NUMBER_COUNTRY).input(val);
  };

  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const [parsedValue, setParsedValue] = useState(initValue(value));

  useEffect(() => {
    if (value === null || typeof value === 'undefined' || !value.length) {
      setFilled(false);
    } else {
      setFilled(true);
    }
  }, [value, onChange]);

  const onValueChange = useCallback(
    e => {
      setParsedValue(new AsYouType(PHONE_NUMBER_COUNTRY).input(e));
    },
    [setParsedValue],
  );

  const validateInput = useCallback(e => {
    try {
      return parsePhoneNumberFromString(e, PHONE_NUMBER_COUNTRY)?.isPossible();
    } catch (err) {
      return false;
    }
  }, []);

  useEffect(() => {
    try {
      if (
        parsedValue &&
        parsedValue.endsWith(')') &&
        parsedValue.length === inputRef.current.selectionEnd
      ) {
        const newPos = parsedValue.length - 1;
        inputRef.current.selectionStart = newPos;
        inputRef.current.selectionEnd = newPos;
      }
    } catch (e) {
      //
    }
  }, [parsedValue]);

  useEffect(() => {
    if (
      (onChange && value !== parsedValue && validateInput(parsedValue)) ||
      (onChange && !parsedValue && value !== parsedValue)
    ) {
      onChange(parsedValue);
    }
  }, [parsedValue, onChange]);

  return (
    <Wrapper active={focused || filled}>
      {focused} {filled}
      <Img
        name={`icons/Magnifying_Glass_Icon${
          focused || filled ? '' : '_-_Inactive'
        }`}
        srcSet={[2, 3, 4]}
        alt="Magnifying Glass"
      />
      <Input
        type="tel"
        ref={inputRef}
        value={parsedValue}
        onChange={e => onValueChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search by mobile number"
      />
    </Wrapper>
  );
}

SearchUserInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default SearchUserInput;
