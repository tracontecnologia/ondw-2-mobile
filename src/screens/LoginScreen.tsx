import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';

import { BillingYuLogo, Title, TextInput, Button } from '../components';
import { LoginResolver } from '../validations';
import { useAuthContext } from '../contexts';

type Form = {
  email: string;
  password: string;
};

export function LoginScreen() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Form>({ resolver: LoginResolver });
  const { login } = useAuthContext();

  async function onSubmit(values: Form) {
    await login(values.email, values.password);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        <ScrollView style={styles.content}>
          <View style={styles.logoContainer}>
            <BillingYuLogo />
          </View>
          <View style={{ marginBottom: 30 }}>
            <Title>Acesse sua conta</Title>
          </View>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, ...field } }) => (
              <TextInput
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errors={errors}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, ...field } }) => (
              <TextInput
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                errors={errors}
                {...field}
              />
            )}
          />

          <Button label="Conectar" onPress={handleSubmit(onSubmit)} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  logoContainer: {
    width: '100%',
    paddingVertical: 20,
  },
  content: {
    padding: 20,
  },
});
