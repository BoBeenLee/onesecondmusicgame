import React from 'react';
import {ViewProps} from 'react-native';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import styled from 'styled-components/native';

import colors from 'src/styles/colors';
import OSMGTextInput from 'src/components/input/OSMGTextInput';
import {Bold17, Bold18, Regular12} from 'src/components/text/Typographies';

interface IProps {
  style?: ViewProps['style'];
  nickname?: string;
  onConfirm: (data: IForm) => Promise<void>;
}

export interface IForm {
  nickname: string;
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
`;

const Content = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 76px;
`;

const Title = styled(Bold18)`
  color: ${colors.lightGrey};
  margin-bottom: 67px;
`;

const NicknameInput = styled.View`
  width: 100%;
  height: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 11px;
  border-bottom-width: 4px;
  border-bottom-color: ${colors.blueberry};
`;

const NicknameTextInput = styled(OSMGTextInput).attrs({
  focusStyle: {color: colors.paleGrey},
})`
  width: 100%;
  font-size: 16px;
  text-align: center;
  color: ${colors.brownishGrey};
`;

const ValidText = styled(Regular12)`
  color: ${colors.robinEggBlue};
`;

const ConfirmButton = styled.TouchableOpacity`
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  border: solid 3px ${colors.lightMagenta};
  background-color: ${colors.pinkyPurple};
`;

const ConfirmButtonText = styled(Bold17)`
  text-align: center;
  color: ${colors.white};
`;

const UserProfileForm = (props: IProps) => {
  const {style, onConfirm} = props;
  const {
    control,
    setError,
    handleSubmit,
    formState: {errors},
  } = useForm<IForm>({
    defaultValues: {
      nickname: '',
    },
  });

  const onSubmit: SubmitHandler<IForm> = async data => {
    try {
      await onConfirm(data);
    } catch (error: any) {
      setError('nickname', error.message);
    }
  };

  return (
    <Container style={style}>
      <Content>
        <Title>????????? ????????? ???????????? ??????????????????.</Title>
        <NicknameInput>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <NicknameTextInput
                onChangeText={onChange}
                placeholder="????????? ?????? (?????? 3?????? ??????, ?????? 15???)"
                maxLength={15}
                value={value}
              />
            )}
            name="nickname"
          />
        </NicknameInput>
        {errors.nickname?.message ? (
          <ValidText>{errors.nickname?.message}</ValidText>
        ) : null}
      </Content>
      <ConfirmButton onPress={handleSubmit(onSubmit)}>
        <ConfirmButtonText>??????</ConfirmButtonText>
      </ConfirmButton>
    </Container>
  );
};

export default UserProfileForm;
