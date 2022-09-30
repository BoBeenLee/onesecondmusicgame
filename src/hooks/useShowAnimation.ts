import {useState, useEffect, useCallback} from 'react';

export interface IAnimationFuncParams {
  isShow: boolean;
  toValue: number;
  callback?: () => any;
}

interface IAnimationConfig {
  initialIsShow?: boolean;
  activeToValue: number;
  inActiveToValue: number;
  animationFunc: (params: IAnimationFuncParams) => void;
  onToggle?: (isShow: boolean) => void;
}

function useShowAnimation(config: IAnimationConfig) {
  const {activeToValue, inActiveToValue, animationFunc} = config;
  const [isShowAnimation, setIsShowAnimation] = useState(
    Boolean(config.initialIsShow),
  );

  useEffect(() => {
    if (isShowAnimation) {
      animationFunc({
        isShow: isShowAnimation,
        toValue: activeToValue,
      });
    }
  }, [activeToValue, animationFunc, isShowAnimation]);

  const onToggle = useCallback(
    (isShow: boolean) => {
      config.onToggle?.(isShow);
      if (isShow) {
        setIsShowAnimation(isShow);
        return;
      }
      animationFunc({
        isShow,
        toValue: inActiveToValue,
        callback: () => {
          setIsShowAnimation(isShow);
        },
      });
    },
    [animationFunc, config, inActiveToValue],
  );

  return {
    isShow: isShowAnimation,
    onToggle,
  };
}

export default useShowAnimation;
