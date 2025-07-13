import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useRef } from 'react';

type TabParamList = {
  Library: undefined;
  TargetPage: undefined;
  TargetsList: undefined;
  Calculator: undefined;
};

export const useTabNavigation = () => {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const route = useRoute();
  const lastTabRef = useRef<string | null>(null);

  useEffect(() => {
    const currentTab = route.name;
    
    // If we're switching to a different tab, reset the navigation stack
    if (lastTabRef.current && lastTabRef.current !== currentTab) {
      // Reset the navigation stack for the new tab
      navigation.reset({
        index: 0,
        routes: [{ name: currentTab as keyof TabParamList }],
      });
    }
    
    lastTabRef.current = currentTab;
  }, [route.name, navigation]);

  return {
    navigation,
    route,
  };
}; 