import { StyleSheet, Text, View } from 'react-native';
import { BillingYuLogo } from '../components';

export function LoadingScreen() {
  return (
    <View style={styles.container}>
      <BillingYuLogo />
      <Text style={styles.text}>Carregando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingVertical: 5,
    fontSize: 16,
    color: '#999',
  },
});
