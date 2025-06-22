import { UnitConverter } from '../../../components/calculators/UnitConverter';
import Header from '../../../components/common/Header';
import InputCard from '../../../components/common/InputCard';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import { UnitConversionCalc } from '../../../services/calculators/UnitConversionCalc';

export default function UnitConversion() {
  return (
    <ScreenWrapper>
      <Header title="המרת יחידות" />
      <InputCard>
        <UnitConverter
          title="זוויות"
          unit1Name="מעלות"
          unit2Name="אלפיות"
          unit1ToUnit2Calc={UnitConversionCalc.degreesToMils}
          unit2ToUnit1Calc={UnitConversionCalc.milsToDegrees}
        />
      </InputCard>
      <InputCard>
        <UnitConverter
          title="מרחקים"
          unit1Name="מטר"
          unit2Name="רגל"
          unit1ToUnit2Calc={UnitConversionCalc.metersToFeet}
          unit2ToUnit1Calc={UnitConversionCalc.feetToMeters}
        />
      </InputCard>
    </ScreenWrapper>
  );
} 