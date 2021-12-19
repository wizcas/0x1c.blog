import React from 'react';
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
} from '@strapi/design-system/ModalLayout';
import { Typography } from '@strapi/design-system/Typography';

export default function Flyout({ isOpen, onClose, header, children, name }) {
  return isOpen ? (
    <ModalLayout onClose={onClose} labelledBy={`${name}-flyout-title`}>
      <ModalHeader>
        <Typography
          fontWeight="bold"
          textColor="neutral800"
          as="h2"
          id="asset-dialog-title"
        >
          {header}
        </Typography>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
    </ModalLayout>
  ) : null;
}
