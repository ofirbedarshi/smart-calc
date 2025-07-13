import { useNavigation as useReactNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  MaskarOptions: undefined;
  KravOptions: undefined;
  Chemam: undefined;
  Lehat: undefined;
  OketzPlada: undefined;
  Artillery: undefined;
  Mortars: undefined;
  Maskar: undefined;
  MaskarLoal: undefined;
  KravLaserLoal: undefined;
  KravLine6: undefined;
  KravLaserLobl: undefined;
  KravSaduraLaser: undefined;
  KravBarkat: undefined;
  NadbarListRoute: undefined;
  TargetDetails: { targetId?: string };
  // Calculator routes
  CoordinateConversion: undefined;
  BackAzimuth: undefined;
  StainSizeCalculation: undefined;
  EfficiencyCalculation: undefined;
  UnitConversion: undefined;
};

export const useNavigation = () => {
  const navigation = useReactNavigation<StackNavigationProp<RootStackParamList>>();
  
  return {
    navigate: navigation.navigate,
    push: navigation.push,
    goBack: navigation.goBack,
    canGoBack: navigation.canGoBack,
    reset: navigation.reset,
  };
}; 