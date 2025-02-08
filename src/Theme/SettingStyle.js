import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { colors, fonts } from "../Constant";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../Utils/LayoutMeasurement';
import { getBottomSpace, getStatusBarHeight, RFValue } from '../Utils/RFValueData';
const { height, width } = Dimensions.get('window');

const SettingStyle = StyleSheet.create({
    RightIconStyle:{
        backgroundColor: colors.NavyBlue,
    },
  
    HeaderContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: hp('6.7'),
    },
    ArrowLogo: {
        height: hp('5'),
        width: wp('7'),
        transform: [{ rotate: '180deg' }],
        alignSelf: 'center'
    },
    Container: {
        backgroundColor: colors.NavyBlue,
        height: hp('200')
    },
    ArrowStyle: {
        backgroundColor: colors.LightNavyBlue,
        height: hp('5'),
        width: wp('10'),
        borderRadius: hp('1'),
        right: hp('20.3'),
        position: 'absolute'
    },
    BoxContainer: {
        top: hp('7')
    },
    BorderContainer: {
        borderBottomWidth: hp('0')
    },
    LeftIcon: {
        backgroundColor: colors.LightNavyBlue
    }
});

export default SettingStyle;
