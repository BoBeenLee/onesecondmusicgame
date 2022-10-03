import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import React from 'react';

import BackTopBar from 'src/components/topbar/BackTopBar';
import ModalTopBar from 'src/components/topbar/ModalTopBar';

storiesOf('TopBar', module)
  .add('ModalTopBar', () => (
    <ModalTopBar title="Hello World" onBackPress={action('onBackPress')} />
  ))
  .add('BackTopBar', () => (
    <BackTopBar title="Hello World" onBackPress={action('onBackPress')} />
  ));
