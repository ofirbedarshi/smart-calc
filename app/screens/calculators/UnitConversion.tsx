import { StyleSheet, Text, View } from 'react-native';
import { UnitConverter } from '../../../components/calculators/UnitConverter';
import { UnitConversionCalc } from '../../../services/calculators/UnitConversionCalc';

export default function UnitConversion() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>המרת יחידות</Text>

      <UnitConverter
        unit1Name="מעלות"
        unit2Name="אלפיות"
        unit1ToUnit2Calc={UnitConversionCalc.degreesToMils}
        unit2ToUnit1Calc={UnitConversionCalc.milsToDegrees}
      />

      <UnitConverter
        unit1Name="מטר"
        unit2Name="רגל"
        unit1ToUnit2Calc={UnitConversionCalc.metersToFeet}
        unit2ToUnit1Calc={UnitConversionCalc.feetToMeters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
}); 