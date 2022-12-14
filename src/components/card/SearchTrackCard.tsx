import React from 'react';
import {ViewProps} from 'react-native';
import styled from 'styled-components/native';

import {Bold16, Regular14, Regular12} from 'src/components/text/Typographies';
import colors from 'src/styles/colors';
import XEIcon from 'src/components/icon/XEIcon';
import {AudioType} from 'src/components/player/interface';
import {onlyUpdateForKeys} from 'recompose';

interface IProps {
  style?: ViewProps['style'];
  thumnail: string;
  title: string;
  author: string;
  isRegistered: boolean;
  audioType: AudioType;
  onSelected: () => void;
  onPlayToggle: () => void;
}

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-vertical: 11px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.blueberry};
`;

const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const ThumnailView = styled.View`
  width: 61px;
  height: 61px;
  border-radius: 8px;
  margin-right: 13px;
  overflow: hidden;
`;

const Thumnail = styled.Image`
  width: 100%;
  height: 100%;
`;

const TrackView = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding-vertical: 0px;
`;

const Title = styled(Bold16)`
  color: ${colors.lightGrey};
`;

const SingerName = styled(Regular14)`
  color: ${colors.lightGrey};
`;

const RegisteredSongText = styled(Regular14)`
  color: ${colors.brightMagenta};
`;

const PlayIcon = styled(XEIcon)``;

const GroupButton = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
`;

const ButtonText = styled(Regular12)`
  color: ${colors.lightGrey};
`;

function SearchTrackCard(props: IProps) {
  const {
    style,
    thumnail,
    title,
    author,
    isRegistered,
    audioType,
    onSelected,
    onPlayToggle,
  } = props;
  return (
    <Container style={style} onPress={onSelected}>
      <Content>
        <ThumnailView>
          <Thumnail source={{uri: thumnail}} />
        </ThumnailView>
        <TrackView>
          <Title>{title}</Title>
          <SingerName>{author}</SingerName>
          {isRegistered ? (
            <RegisteredSongText>
              ?????? ???????????? ?????? ??? ?????????.
            </RegisteredSongText>
          ) : null}
        </TrackView>
        {isRegistered ? null : (
          <>
            <GroupButton onPress={onPlayToggle}>
              <PlayIcon
                name={audioType === 'play' ? 'pause' : 'play'}
                size={36}
                color={colors.lightGrey}
              />
              <ButtonText>????????????</ButtonText>
            </GroupButton>
          </>
        )}
      </Content>
    </Container>
  );
}

const updateKeys: Array<keyof IProps> = [
  'style',
  'thumnail',
  'title',
  'author',
  'isRegistered',
  'audioType',
];
export default onlyUpdateForKeys(updateKeys)(SearchTrackCard);
