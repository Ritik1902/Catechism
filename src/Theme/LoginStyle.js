import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { colors, fonts } from "../Constant";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../Utils/LayoutMeasurement';
import { getBottomSpace, getStatusBarHeight, RFValue } from '../Utils/RFValueData';
const { height, width } = Dimensions.get('window');

const LoginStyle = StyleSheet.create({
    ActivityIndicator: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp('20'),
        position: 'absolute',
    },
    RememberMe: {
        fontSize: fonts.FONT_12,
        color:colors.Black
    },
    BtnStyle: {
        backgroundColor: colors.Disable
    },
    ForgotpwdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: hp('2.6'),
        paddingTop: hp('2.5'),
        paddingBottom: hp('1.5')
    },
    OrText: {
        color:colors.Black,
        width: wp('35'),
        textAlign: 'center',
        fontSize: fonts.FONT_14,
        fontFamily: fonts.Inter_Regular
    },
    OR: {
        marginVertical: hp('2.5'),
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: hp('4'),
    },
    OrWidth: {
        flex: 1,
        height: 1,
        backgroundColor: 'black'
    },
    GoogleLogo: {
        height: hp('10'),
        width: wp('8'),
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowOpacity: 0.1,
    },

    CheckBox: {
        height: hp('2.2'),
    },
    TextForgotpwd: {
        fontSize: fonts.FONT_14,
        color: colors.TextForgotpwd,
    },
    CheckBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    OrSignUpWithContainer: {
        flexDirection: 'row',
        justifyContent : 'space-evenly',
        marginHorizontal: hp('9')
    },
});

export default LoginStyle;
