import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  BigCurrencyCard,
  Header,
  IconButton,
  MenuIcon,
  Title,
} from '../components';
import { IBillingDashboard } from '../interfaces';
import { BillingService } from '../services';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export function DashboardScreen({ navigation }: Props) {
  const [dashboard, setDashboard] = useState<IBillingDashboard>({
    customers: 0,
    paid: 0,
    pending: 0,
    late: 0,
    history: [],
  });

  useEffect(() => {
    async function fetchData() {
      const { status, data } = await BillingService.dashboard();
      if (status === 200) {
        setDashboard(data);
      }
    }
    navigation.addListener('focus', () => {
      fetchData();
    });
    return () => {
      navigation.removeListener('focus', () => {});
    };
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        <ScrollView style={styles.content}>
          <Header
            right={
              <IconButton onPress={() => navigation.push('Menu')}>
                <MenuIcon height={18} />
              </IconButton>
            }
          />
          <Title>Dashboard</Title>
          <BigCurrencyCard label="Receita" value={dashboard.paid} />
          <BigCurrencyCard label="Pendentes" value={dashboard.pending} />
          <BigCurrencyCard label="Atrasos" value={dashboard.late} />
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
  content: {
    padding: 20,
  },
});
