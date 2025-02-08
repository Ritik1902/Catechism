import React from "react";
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../Utils/LayoutMeasurement";
import { colors, fonts } from "../Constant";
import { Platform } from "react-native";
import FastImage from "react-native-fast-image";

const ResultStyle = StyleSheet.create({
    Result_CrossIcon: {
        marginLeft: hp('35.5'),
    },
    Result_BoxContainer: {
        top: hp('5')
    },
    Result_Container: {
        backgroundColor: colors.DarkBlue,
        height: hp('100'),
    },
    Result_BoxText: {
        fontSize: fonts.FONT_32,
        alignSelf: 'center',
        paddingVertical: hp('3'),
        color: colors.White,
        fontWeight: 'bold',
    },
    Container1: {
        width: wp('87'),
        height: hp('63'),
        alignSelf: 'center',
        backgroundColor: colors.White,
        borderRadius: hp('2.1'),
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('-0.7'),
        elevation: 24,
    },
    Container2: {
        backgroundColor: colors.DarkWhite,
        width: wp('77'),
        height: hp('65'),
        alignSelf: 'center',
        borderRadius: hp('2.1'),
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('-0.7'),
        elevation: 24,
    },
    Container3: {
        width: wp('67'),
        height: hp('67'),
        alignSelf: 'center',
        backgroundColor: colors.LightWhite,
        borderRadius: hp('2.1'),
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('-0.7'),
        elevation: 24,

    },
    Result_BtnStyleLeaderBoard: {
        width: wp('67'),
        height: hp('7'),
        marginTop: hp('14'),
        backgroundColor: colors.SkyBlue,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('0.1'),
        elevation: 24,
        shadowColor: colors.BorderBottom,
        paddingVertical: hp('2.3')
    },
    Result_BtnStyleChallengesFrd: {
        width: wp('67'),
        height: hp('7'),
        marginVertical: hp('0.7'),
        backgroundColor: colors.btncolor,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('0.1'),
        elevation: 24,
        shadowColor: colors.BorderBottom,
        paddingVertical: hp('2.3')
    },
    Result_BtnQueStyle: {
        width: wp('23.8'),
        height: hp('8'),
        marginVertical: hp('0.7'),
        backgroundColor: colors.Orange,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('0.1'),
        elevation: 24,
    },
    Result_BtnCorrectStyle: {
        width: wp('23.8'),
        height: hp('8'),
        marginVertical: hp('0.7'),
        backgroundColor: colors.Green,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('0.1'),
        elevation: 24,
    },
    Result_BtnIncorrectStyle: {
        width: wp('23.8'),
        height: hp('8'),
        marginVertical: hp('0.7'),
        backgroundColor: colors.Tomato,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('0.1'),
        elevation: 24,
    },
    Result_BtnQue: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: hp('3'),
    },
    Result_BoxResultContainer: {
        height: hp('12'),
        width: wp('38'),
        backgroundColor: colors.Blue,
        alignSelf: 'center',
        marginTop: hp('13'),
        marginBottom: hp('4')
    },
    Result_BoxInnerContainer: {
        height: hp('11'),
        width: wp('36'),
        backgroundColor: colors.Blue,
        borderWidth: hp('0.5'),
        borderColor: colors.Gray,
        alignSelf: 'center',
        top: hp('0.5')
    },
})

export default ResultStyle;