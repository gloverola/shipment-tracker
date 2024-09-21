import React from 'react';
import { View, StyleSheet} from 'react-native';
import Button from '@/components/Button';
import Logo from '@/assets/icons/logo-full.svg';
import { useRouter } from 'expo-router';
import SafeAreaProviderComponent from '@/providers/SafeAreaProvider';
import { colors } from '@/constants/Colors';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/login' as any); 
  };

  return (
    <SafeAreaProviderComponent style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={150} height={150} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={handleContinue}
          backgroundColor={colors?.white}
          textColor={colors?.primary}
        />
      </View>
    </SafeAreaProviderComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.primary,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});
