/*
 * About Messages
 *
 * This contains all the text for the About component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.About';

export default defineMessages({
  about: {
    id: `${scope}.about`,
    defaultMessage: 'About',
  },
  license: {
    id: `${scope}.license`,
    defaultMessage: 'license',
  },
  copyright: {
    id: `${scope}.copyright`,
    defaultMessage: 'Copyright (c) 2020',
  },
  technologies: {
    id: `${scope}.technologies`,
    defaultMessage: 'Technologies',
  },
  sourceCode: {
    id: `${scope}.sourceCode`,
    defaultMessage: 'Source code',
  },
});
