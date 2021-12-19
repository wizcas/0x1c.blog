import React from 'react';
import styled from 'styled-components';
import TuiEditor from './TuiEditor';

export default function Editor({
  onChange,
  name,
  value,
  required,
  intlLabel,
  labelAction,
  disabled,
}) {
  return (
    <div>
      <Header>
        <FieldLabel>
          {intlLabel.defaultMessage}
          {required && <Required>*</Required>}
        </FieldLabel>
        {labelAction}
      </Header>
      <TuiEditor
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

const FieldLabel = styled.p`
  font-weight: 600;
  color: #32324d;
  font-size: 0.75rem;
  line-height: 1.33;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  & > *:not(:first-child) {
    margin-left: 0.25rem;
  }
`;
const Required = styled.span`
  color: #d02b20;
  font-size: 0.875rem;
`;
