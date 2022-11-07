import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomerCard, Title, Header } from '../components';
import { ICustomer } from '../interfaces';
import { CustomerService } from '../services';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export function CustomersScreen({ navigation }: Props) {
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { status, data } = await CustomerService.findAll();
      if (status === 200) {
        setCustomers(data);
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
        <FlatList
          contentContainerStyle={styles.flatList}
          ListHeaderComponent={
            <>
              <Header />
              <Title>Clientes</Title>
            </>
          }
          data={customers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CustomerCard {...item} onPress={() => {}} />
          )}
        />
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
  flatList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
