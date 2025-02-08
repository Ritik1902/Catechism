import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { colors, fonts, images } from '../../Constant';
import { RFValue } from '../../Utils/RFValueData';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../Utils/LayoutMeasurement';

const Button = props => {
  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity}
      style={[styles.button, props.BtnStyle]} onPress={props.customClick} disabled={props.disable}>
      <Text style={[styles.text, props.TxtStyle]}>{props.title}</Text>
      <Text style={[styles.text, props.TxtStyle]}>{props.BtnText ? props.data : null}</Text>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  button: {
    width: wp('89'),
    alignItems: 'center',
    borderRadius: wp('3.5'),
    paddingVertical: hp('1.9'),
    marginVertical: hp('3.5'),
    backgroundColor: colors.DarkBlue,
    alignSelf: 'center',
    height: hp('6.3'),
  },
  text: {
    fontSize: fonts.FONT_14,
    fontWeight: 'bold',
    color: colors.White,
  },
});
export default Button;