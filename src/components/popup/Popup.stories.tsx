import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import styled from 'styled-components/native';

import ConfirmPopup from 'src/components/popup/ConfirmPopup';
import ChargeSkipItemPopup from 'src/components/popup/ChargeSkipItemPopup';
import InviteFriendsPopup from 'src/components/popup/InviteFriendsPopup';
import UseFullHeartPopup from 'src/components/popup/UseFullHeartPopup';
import ChargeFullHeartPopup from 'src/components/popup/ChargeFullHeartPopup';
import ExhaustFullHeartPopup from 'src/components/popup/ExhaustFullHeartPopup';
import LogoutConfirmPopup from 'src/components/popup/LogoutConfirmPopup';
import Heart from 'src/stores/model/Heart';

const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

storiesOf('Popup', module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('ConfirmPopup', () => {
    return (
      <ConfirmPopup
        message="정말 그만두시겠어요?"
        cancelText="취소"
        onCancel={action('onCancel')}
        confirmText="확인"
        onConfirm={action('onConfirm')}
      />
    );
  })
  .add('SkipItemPopup', () => {
    return (
      <ChargeSkipItemPopup
        count={3}
        onCancel={action('onCancel')}
        onInvite={action('onConfirm')}
      />
    );
  })
  .add('InviteFriendsPopup', () => {
    return (
      <InviteFriendsPopup
        onCancel={action('onCancel')}
        onConfirm={action('onConfirm')}
      />
    );
  })
  .add('ChargeFullHeartPopup', () => {
    return (
      <ChargeFullHeartPopup
        heart={Heart.create({heartCount: 3})}
        onCancel={action('onCancel')}
        onChargeFullHeart={action('onChargeFullHeart')}
      />
    );
  })
  .add('UseFullHeartPopup', () => {
    return (
      <UseFullHeartPopup
        count={3}
        onCancel={action('onCancel')}
        onConfirm={action('onConfirm')}
        onAD={action('onChargeFullHeart')}
      />
    );
  })
  .add('ExhaustFullHeartPopup', () => {
    return (
      <ExhaustFullHeartPopup
        onInvite={action('onInvite')}
        onCancel={action('onCancel')}
      />
    );
  })
  .add('LogoutConfirmPopup', () => {
    return (
      <LogoutConfirmPopup
        onConfirm={action('onConfirm')}
        onCancel={action('onCancel')}
      />
    );
  });
