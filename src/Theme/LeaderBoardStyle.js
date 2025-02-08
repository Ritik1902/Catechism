import React from "react";
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../Utils/LayoutMeasurement";
import { colors, fonts } from "../Constant";
import { Platform } from "react-native";
import FastImage from "react-native-fast-image";

const LeaderBoardStyle = StyleSheet.create({
    LeaderBoard_InnerImage: {	
        width: hp('13'),	
        height: hp('13'),	
        borderRadius: hp('13')/2,	
        alignSelf: 'center',	
    },
    MiddleImg: {
        height: hp('12.5'),
    },
    ScoreStyle: {
        color: colors.White,
        alignSelf: 'center',
        position: 'absolute',
        top: hp('20'),
        fontSize: fonts.FONT_14,
    },
    BtScoreStyle: {
        color: colors.White,
        alignSelf: 'center',
        position: 'absolute',
        top: hp('17.5'),
        fontSize: fonts.FONT_14,
        fontFamily: fonts.Inter_Medium
    },
    NameStyle: {
        color: colors.SkyBlue,
        fontWeight: 'bold',
        alignSelf: 'center',
        position: 'absolute',
        top: hp('26.5'),
        fontSize: fonts.FONT_14,
        fontFamily: fonts.Inter_Medium
    },
    ZicZacImg: {
        height: hp('11.5'),
        width: wp('27'),
        top: hp('13.5'),
    },
    ZicZacImg2: {
        height: hp('11.5'),
        width: wp('27'),
        top: hp('12'),
        position: 'absolute',
        alignSelf: 'center'
    },
    Header: {
        height: hp('45'),
        backgroundColor: colors.DarkBlue,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    Bell: {
        justifyContent: 'center',
        borderRadius: 11,
        height: hp('5.2'),
        width: wp('11'),
        backgroundColor: colors.HomeBtn,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('-0.7'),
        elevation: 24,

    },
    Options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('90'),
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: hp('6'),
    },
    BellImage: {
        height: hp(2.1),
        width: wp(5),
        alignSelf: 'center',
    },
    LeaderBoard_Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: hp('8'),
    },
    LeaderBoard_OutsideImage: {
        marginTop: hp('4'),
        position: 'absolute',
        backgroundColor: colors.Orange,
    },
    LeaderBoard_OutsideImage3: {
        marginTop: hp('4'),
        position: 'absolute',
        backgroundColor: colors.SkyBlue,
    },
    LeaderBoard_OutsideImage2: {
        height: hp('14'),
        width: hp('14'),
        backgroundColor: colors.Green,
        position: 'absolute',
    },
    LeaderBoard_Flatlist: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.White,
        height: hp('8'),
        width: wp('89'),
        alignSelf: 'center',
        borderRadius: wp('3.5'),
        marginTop: hp('1.8'),
        paddingHorizontal: wp('3.5')
    },
    Quiz_View: {
        flexDirection: 'row',
        backgroundColor: colors.Gray,
        height: hp('9'),
        width: wp('81'),
        alignSelf: 'center',
        borderRadius: wp('3.5'),
        marginTop: hp('1.3'),
        paddingHorizontal: wp('1'),
    },
    Quiz_View2: {
        flexDirection: 'row',
        backgroundColor: colors.ShadowGray,
        borderColor: colors.Gray,
        borderWidth: wp('0.1'),
        height: hp('18'),
        width: wp('81'),
        alignSelf: 'center',
        borderRadius: wp('3.5'),
        marginTop: hp('1.3'),
    },
    LeaderBoard_FlatlistImg: {
        height: hp('5'),
        width: hp('5'),
        borderRadius: hp('4'),
        backgroundColor: colors.Black,
        borderRadius: hp('4'),
        marginHorizontal: hp('1.7'),
    },

    LeaderBoard_Point: {
        color: colors.ToggleOn,
        fontSize: fonts.FONT_13,
        fontFamily: fonts.Inter_Medium
    },
    FlatlistName: {
        fontSize: fonts.FONT_13,
        fontFamily: fonts.Inter_Medium
    },
    LeaderBoard_ID: {
        color: colors.LightNavyBlue,
        fontSize: fonts.FONT_13,
        fontFamily: fonts.Inter_Medium
    },
    LeaderBoard_ProfileImg: {
        width: wp('20'),
        borderRadius: wp('4'),
        alignSelf: 'center',
    },
    Result_CrossIcon: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        borderRadius: 11,
        height: hp('5.2'),
        width: wp('11'),
        backgroundColor: colors.HomeBtn,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('-0.7'),
        elevation: 24,
        right: hp('3.5'),
    },
    Result_BoxContainer: {
        top: hp('17')
    },
    Result_Container: {
        backgroundColor: colors.Blue,
        height: hp('100')
    },
    Quiz_Title: {
        fontSize: fonts.FONT_20,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    Quiz_TitleV: {
        fontSize: fonts.FONT_15,
        alignSelf: 'center',
        fontWeight: 'bold',
        colors: colors.btncolor,
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
        marginVertical: hp('0.7'),
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
    ThumbIcon: {
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        height: hp('50'),
        width: wp('50'),
        top: hp('-26')
    },
    RibbionIcon: {
        alignSelf: 'center',
        height: hp('25'),
        width: wp('55'),
        position: 'absolute',
        top: hp('2')
    },
    Result_BoxText: {

    },
    Heading: {
        marginTop: hp('3'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('90'),
        alignSelf: 'center',
    },
    ChooseCategory: {
        color: colors.Black,
        fontSize: 18,
        fontWeight: 'bold',
    },

    SeeAll: {
        color: colors.BlueText,
        fontWeight: 'bold',
        fontSize: 15,
    },
    Data: {
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: wp('2'),
        backgroundColor: colors.White,
        borderRadius: 15,
        marginTop: hp('2.5'),
        height: hp('12'),
        width: wp('40'),
        shadowColor: colors.Black,
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.2,
    },
    Category: {
        width: wp('90'),
        marginLeft: wp('5'),
        marginRight: wp('5'),
        marginTop: hp('3'),
    },
    ListImage: {
        height: Platform.isPad ? hp('8.5') : hp('8.5'),
        width: Platform.isPad ? wp('13') : wp('18'),
        resizeMode: FastImage.resizeMode.contain,
        alignSelf: 'center',
        marginBottom: Platform.isPad ? hp('2') : hp('2')
    },
    Welcome: {
        marginTop: hp('5'),
        color: colors.White,
        fontSize: 15,
        marginLeft: wp('7')
    },
    UserName: {
        marginVertical: wp('0.5'),
        width: wp('50'),
        color: colors.White,
        marginLeft: wp('7'),
        fontSize: 20,
        fontWeight: 'bold'
    },
    ListText: {
        marginBottom: wp('10'),
        textAlign: 'center',
        color: 'green',
        fontWeight: 'bold',
    },
    ListText1: {
        marginBottom: wp('10'),
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold',
    },
    Data1: {
        justifyContent: "center",
        alignContent: 'center',
        marginLeft: wp('6'),
        backgroundColor: colors.White,
        borderRadius: 15,
        marginTop: hp('5.5'),
        height: hp('12'),
        width: wp('40'),
        shadowColor: colors.Black,
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.2,
    },
    Quiz_TitleView: {
        height: hp('6'),
        width: wp('75'),
        borderRadius: wp('3'),
        backgroundColor: colors.Purple,
        alignSelf: 'center',
        top: hp('2'),
        paddingVertical: hp('1.8'),
        marginBottom: hp('3')
    },
    Quiz_Header: {
        marginTop: hp('2.3'),
        paddingLeft: wp('4.5'),
    },
    Quiz_Text1: {
        fontSize: fonts.FONT_12,
        fontWeight: 'bold',
        paddingVertical: hp('1.5')
    },
    Quiz_Text2: {
        fontSize: fonts.FONT_12,
        paddingVertical: hp('1.5')
    },
    TextHeader: {
        color: colors.White,
        fontSize: fonts.FONT_22,
        alignItems: 'center'
    },
    flexDirection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default LeaderBoardStyle;