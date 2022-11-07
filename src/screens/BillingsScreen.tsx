import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BillingCard, Header, Title } from '../components';
import { IBilling } from '../interfaces';
import { BillingService } from '../services';

type Props = {
  navigation: NativeStackNavigationProp<any>
}

export function BillingsScreen({ navigation }: Props) {
  const [billings, setBillings] = useState<IBilling[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { status, data } = await BillingService.findAll();
      if (status === 200) {
        setBillings(data);
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
              <Title>Cobranças</Title>
            </>
          }
          data={billings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <BillingCard {...item} />}
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
