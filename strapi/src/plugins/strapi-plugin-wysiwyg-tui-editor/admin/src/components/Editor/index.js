import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { useToggle } from 'react-use';
import TuiEditor from './TuiEditor';
import Flyout from './Flyout';

export default function Editor({
  onChange,
  name,
  value,
  required,
  intlLabel,
  labelAction,
  disabled,
}) {
  const { formatMessage } = useIntl();
  const [showFlyout, toggleFlyout] = useToggle(false);

  const title = (
    <FieldLabel id={(showFlyout && `${name}-flyout-title`) || undefined}>
      <label>{formatMessage(intlLabel)}</label>
      {required && <Required>*</Required>}
    </FieldLabel>
  );
  const editor = useMemo(
    () => (
      <TuiEditor
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFlyout={!showFlyout && (() => toggleFlyout(true))}
      />
    ),
    [showFlyout, name, value, onChange, disabled, toggleFlyout]
  );
  return (
    <div>
      <Header>
        {title}
        {labelAction}
      </Header>
      {showFlyout ? (
        <FlyoutWrapper>
          <Flyout
            name={name}
            isOpen={showFlyout}
            onClose={() => toggleFlyout(false)}
            header={title}
          >
            {editor}
          </Flyout>
        </FlyoutWrapper>
      ) : (
        editor
      )}
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
const FlyoutWrapper = styled.div`
  z-index: 50;
`;
