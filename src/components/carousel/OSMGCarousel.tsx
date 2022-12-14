import React from 'react';
import {ViewProps} from 'react-native';
import Carousel, {CarouselProperties} from 'react-native-snap-carousel';
import styled from 'styled-components/native';

import {getDeviceWidth} from 'src/utils/device';

export interface ICarousel {
  key: string;
}

export interface IProps<T> extends CarouselProperties<T> {
  style?: ViewProps['style'];
}

interface IStates {
  currentIndex: number;
}

const windowWidth = getDeviceWidth();

const CarouselView = styled.View``;

class OSMGCarousel<T> extends React.PureComponent<
  IProps<T & ICarousel>,
  IStates
> {
  public carouselRef = React.createRef<Carousel<T>>();

  constructor(props: IProps<T & ICarousel>) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  public snapToPrev = () => {
    this.carouselRef.current?.snapToPrev?.();
  };

  public snapToNext = () => {
    this.carouselRef.current?.snapToNext?.();
  };

  public snapToItem = (index: number): void => {
    this.carouselRef.current?.snapToItem?.(index);
  };

  public render() {
    const {style, ...rest} = this.props;
    return (
      <>
        <CarouselView style={style}>
          <Carousel
            {...rest}
            ref={this.carouselRef as any}
            data={this.props.data}
            sliderWidth={windowWidth}
            slideInterpolatedStyle={this.animatedStyles}
            onSnapToItem={this.onSnapToItem}
          />
        </CarouselView>
      </>
    );
  }

  private getTotalLength = () => {
    const {data} = this.props;
    return data.length;
  };

  private onSnapToItem = (index: number) => {
    this.setState(
      {
        currentIndex: index,
      },
      () => {
        this.props?.onSnapToItem?.(index);
      },
    );
  };

  private animatedStyles = () => {
    // NOTHING
    return {};
  };
}

export default OSMGCarousel;
