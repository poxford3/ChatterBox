import { StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { TextInput, type TextInputProps } from 'react-native-paper';

export type ThemedTextProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function TextField({
  style,
  lightColor,
  darkColor,
  value,
  placeholder,
  onChangeText,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'textField')

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
        style={[
          { color },
          { backgroundColor },
          type === 'default' ? styles.default : undefined,
          type === 'title' ? styles.title : undefined,
          type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
          type === 'subtitle' ? styles.subtitle : undefined,
          type === 'link' ? styles.link : undefined,
          style,
        ]}
        {...rest}
      />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
