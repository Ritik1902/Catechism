import React from "react";
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../Utils/LayoutMeasurement";
import { colors, fonts } from "../Constant";
import { Platform } from "react-native";
import FastImage from "react-native-fast-image";

const QuizStyle = StyleSheet.create({

    Quiz: {
        flex: 1,
        paddingLeft: hp('1'),
        justifyContent:'space-between',
    },
    Quiz_Title: {
        fontSize: fonts.FONT_20,
        alignSelf: 'center',
        fontWeight: 'bold',
        color:colors.Black
    },
    Quiz_TitleV: {
        fontSize: fonts.FONT_15,
        alignSelf: 'center',
        fontWeight: 'bold',
        color:colors.Black

    },
    Quiz_View2: {
        flexDirection: 'row',
        backgroundColor: colors.ShadowGray,
        borderColor: colors.Gray,
        borderWidth: wp('0.1'),
        width: wp('81'),
        alignSelf: 'center',
        borderRadius: wp('3.5'),
        marginTop: hp('1.3'),
        height:hp('15'),
        paddingVertical: hp('2')
    },
    Quiz_TitleView: {
        height: hp('6'),
        width: wp('75'),
        borderRadius: wp('3'),
        backgroundColor: colors.Purple,
        alignSelf: 'center',
        top: hp('2.5'),
        paddingVertical: hp('1.8'),
        marginBottom: hp('3')
    },
    Quiz_Header: {
        marginTop: hp('3'),
        paddingLeft: wp('4.5'),
        fontSize: fonts.FONT_13,
        fontWeight:'400',
        color:colors.Black
    },
    Quiz_Text1: {
        fontSize: fonts.FONT_12,
        fontWeight: 'bold',
        color:colors.Black
    },
    Quiz_Text2: {
        fontSize: fonts.FONT_12,
        color:colors.Black
    },
    Quiz_TextStyle: {
        paddingRight: hp('13')
    }
})

export default QuizStyle;