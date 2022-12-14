import React from 'react';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import xeiconSelection from './selection.json';

interface IProps {
  name: XEIconType;
  color: string;
  size: number;
}

// http://xpressengine.github.io/XEIcon/library-2.3.3.html
const XEIcon = createIconSetFromIcoMoon(
  xeiconSelection,
  'xeicon',
  'xeicon.ttf',
);

export type XEIconType =
  | 'close'
  | 'arrow-left'
  | 'star'
  | 'star-o'
  | 'basket'
  | 'alarm-o'
  | 'arrow-right'
  | 'angle-left'
  | 'angle-right'
  | 'angle-left-min'
  | 'angle-right-min'
  | 'angle-down-min'
  | 'angle-up-min'
  | 'ellipsis-v'
  | 'check-circle'
  | 'trash'
  | 'trash-o'
  | 'bell'
  | 'bell-o'
  | 'bell-off'
  | 'bell-off-o'
  | 'alarm'
  | 'alarm-o'
  | 'heart'
  | 'heart-o'
  | 'won'
  | 'sort-desc'
  | 'home'
  | 'check-circle'
  | 'check-circle-o'
  | 'radiobox-blank'
  | 'radiobox-checked'
  | 'checkbox-blank'
  | 'check-square-o'
  | 'check-square'
  | 'user'
  | 'long-arrow-down'
  | 'ellipsis-v'
  | 'thumbs-up'
  | 'emoticon-smiley'
  | 'emoticon-sad'
  | 'emoticon-neutral'
  | 'play'
  | 'pause'
  | 'stop'
  | 'search'
  | 'spinner-1'
  | 'plus'
  | 'cog'
  | 'play'
  | 'pause'
  | 'caret-up-min'
  | 'caret-down-min'
  | 'minus-min';

const Icon = (props: IProps) => <XEIcon {...props} />;

export default Icon;
