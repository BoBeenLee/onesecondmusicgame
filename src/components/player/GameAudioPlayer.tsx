import _ from 'lodash';
import React, {useState} from 'react';
import {ViewProps} from 'react-native';
import styled from 'styled-components/native';

import {XEIconType} from 'src/components/icon/XEIcon';
import PlayButton from 'src/components/button/PlayButton';
import {AudioType} from 'src/components/player/interface';
import {onlyUpdateForKeys} from 'recompose';

interface IProps {
  style?: ViewProps['style'];
  size: number;
  onPlay: () => Promise<void> | void;
  onToggle?: (playType: AudioType) => void;
}

const AudioView = styled(PlayButton)`
  background-color: #b7b7b7;
`;

function GameAudioPlayer(props: IProps) {
  const {style, size, onPlay, onToggle} = props;
  const [playType, setPlayType] =
    useState<Extract<XEIconType, AudioType>>('stop');

  const stop = async () => {
    setPlayType('stop');
    onToggle?.('stop');
  };

  const play = async () => {
    setPlayType('play');
    onToggle?.('play');
    await onPlay();
    stop();
  };

  return (
    <AudioView
      style={style}
      size={size}
      playType={playType}
      onPress={playType === 'play' ? _.identity : play}
    />
  );
}

const updateKeys: Array<keyof IProps> = ['style', 'size'];
export default onlyUpdateForKeys(updateKeys)(GameAudioPlayer);
