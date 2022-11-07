import {
  StyleSheet,
  Text,
  TextInput as Input,
  TextInputProps,
} from 'react-native';

import { Theme } from '../../theme';

type Props = TextInputProps & { name: string; errors?: any };

export function TextInput({ name, errors, ...props }: Props) {
  const errorMessage = errors?.[name]?.message;
  return (
    <>
      <Input {...props} style={styles.input} />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    borderRadius: 4,
  },
  error: {
    paddingTop: -5,
    paddingBottom: 10,
    color: '#900',
    fontSize: 12,
  },
});
