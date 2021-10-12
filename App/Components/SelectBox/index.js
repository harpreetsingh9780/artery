/**
 *
 * SelectBox
 *
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InputGroup, InputWrapper, Placeholder } from '../BaseInput';

export const Select = styled.select`
  width: 100%;
  height: 2rem;
  border: none;
  background: transparent;
  outline: none;
  font-family: 'SF Pro Rounded';
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 2rem;
  color: #636466;
  cursor: text;
  &:focus {
    outline: none;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 500000000000s ease-in-out 0s;
    -webkit-text-fill-color: #636466 !important;
  }
`;

function SelectBox({ placeholder, value, name, items, onChange }) {
  const wrapperRef = useRef(null);
  const placeholderRef = useRef(null);
  const inputRef = useRef(null);

  const [focused, setFocused] = useState(false);

  const handleClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

  useEffect(() => {
    const { classList } = wrapperRef.current;
    if (focused) {
      classList.add('focused');
    } else {
      classList.remove('focused');
    }
  }, [focused]);

  return (
    <>
      <InputWrapper
        className="activated"
        ref={wrapperRef}
        onClick={handleClick}
      >
        <Placeholder ref={placeholderRef} htmlFor={name}>
          {placeholder}
        </Placeholder>
        <InputGroup>
          <Select
            ref={inputRef}
            value={value || ''}
            onChange={onChange}
            name={name}
            id={name}
            onBlur={handleBlur}
            onFocus={handleFocus}
          >
            <option value="" disabled>
              -- {placeholder}
            </option>
            {items.map(item => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </InputGroup>
      </InputWrapper>
    </>
  );
}

SelectBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  items: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
};

export default SelectBox;
