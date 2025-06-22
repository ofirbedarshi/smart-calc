import { Slot } from 'expo-router';
import RootLayoutWrapper from '../components/common/RootLayoutWrapper';

export default function RootLayout() {
  return (
    <RootLayoutWrapper>
      <Slot />
    </RootLayoutWrapper>
  );
}
