import _ from 'lodash';
import React, {useState} from 'react';
import {ViewProps, TextInputProps} from 'react-native';
import styled from 'styled-components/native';

import OSMGTextInput from 'src/components/input/OSMGTextInput';
import colors from 'src/styles/colors';
import XEIconButton from 'src/components/button/XEIconButton';
import useDebouncedCallback from 'src/hooks/useDebouncedCallback';
import {onlyUpdateForKeys} from 'recompose';

interface IProps extends TextInputProps {
  style?: ViewProps['style'];
  onChangeInput: (text: string) => void;
  onSearch: (text: string) => void;
  onFocus?: () => void;
}

const Container = styled.View`
  width: 100%;
  min-width: 100px;
  height: 40px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 3px;
  border-bottom-color: ${colors.blueberry};
`;

const Input = styled(OSMGTextInput).attrs({
  focusStyle: {color: colors.paleGrey},
})`
  flex: 1;
  font-size: 16px;
  color: ${colors.paleGrey};
  margin-right: 3px;
`;

const SearchIcon = styled(XEIconButton).attrs({
  iconName: 'search',
  iconSize: 20,
  iconColor: colors.warmBlue,
})``;

function SearchTextInput(props: IProps) {
  const {style, onSearch, onFocus, ...rest} = props;
  const [text, setText] = useState('');

  const onChangeInput = useDebouncedCallback(props.onChangeInput, 500);

  const onChangeText = (changedText: string) => {
    setText(changedText);
    onChangeInput(changedText);
  };

  return (
    <Container style={style}>
      <Input
        {...rest}
        value={text}
        onChangeText={onChangeText}
        onFocus={onFocus}
      />
      <SearchIcon onPress={_.partial(onSearch, text)} />
    </Container>
  );
}

const updateKeys: Array<keyof IProps> = ['style'];
export default onlyUpdateForKeys(updateKeys)(SearchTextInput);
