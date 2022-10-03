import {storiesOf} from '@storybook/react-native';
import React from 'react';
import styled from 'styled-components/native';

import HeartGroup from 'src/components/icon/HeartGroup';
import CircleCheckGroup from 'src/components/icon/CircleCheckGroup';
import SkipIcon from 'src/components/icon/SkipIcon';

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

storiesOf('Icon', module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('SkipIcon', () => {
    return <SkipIcon />;
  })
  .add('HeartGroup', () => {
    return <HeartGroup hearts={['active', 'inactive']} />;
  })
  .add('CircleCheckGroup', () => {
    return (
      <CircleCheckGroup
        circles={[
          {
            check: 'o',
            active: false,
          },
          {
            check: 'x',
            active: false,
          },
          {
            check: '?',
            active: true,
          },
          {
            check: 'x',
            active: true,
          },
          {
            check: 'o',
            active: true,
          },
        ]}
      />
    );
  });
