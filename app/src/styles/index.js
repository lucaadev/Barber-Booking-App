import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from './theme';
import util from '../utils/util';

import {
  Text as TextPaper,
  Title as TitlePaper,
  Button as ButtonPaper,
  TextInput as TextInputPaper,
  Badge as BadgePaper,
} from 'react-native-paper';

export const Cover = styled.ImageBackground.attrs((props) => ({
  source: props.source,
}))`
  width: ${(props) => `${props.width}%` || '60px'};
  height: ${(props) => `${props.height}px` || '70px'};
  margin: ${(props) => props.margin || '0 10px 0 0'};
  border-radius: ${(props) => (props.circle ? props.width : '3px')};
  border-width: ${(props) => props.borderWidth || '0'};
  border-color: ${(props) => props.borderColor || 'transparent'};
  background-color: ${theme.colors.muted};
  opacity: ${(props) => props.opacity || '1'};
  align-self: ${(props) => props.align || 'center'};
`;

export const GradientView = styled(LinearGradient).attrs((props) => ({
  colors: props.colors || [theme.colors.blue, theme.colors.blueLight],
}))`
  flex: 1;
  padding: ${(props) => props.hasPadding ? '20px' : '0'};
  justify-content: ${(props) => props.justify || 'flex-start'};
`;

export const Container = styled.View`
  flex: 1;
  flex-wrap: ${(props) => props.wrap || 'nowrap'};
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align || 'flex-start'};
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'auto'};
  max-height: ${(props) => props.maxHeight || 'auto'};
  padding: ${(props) => props.padding ? '20px' : '0'};
  padding-bottom: ${(props) => props.removePaddingBottom ? '0' : props.hasPadding ? '20px' : '0'};
  margin: ${(props) => props.margin || '0'};
  border-radius: ${(props) => props.radius || 0};
  border: ${(props) => props.border || 'none'};
  background: ${(props) => theme.colors[props.background] || props.backgroundColor || 'transparent'};
  `;

export const TextInput = styled(TextInputPaper).attrs((props) => ({
  mode: 'flat',
  theme: {
    colors: {
      placeholder: util.toAlpha(theme.colors.muted, 30),
    }
  }
}))`
  height: 45px;
  width: 90%;
  font-size: 15px;
  background-color: 'transparent';
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.black};
  align-self: center;
  `;
