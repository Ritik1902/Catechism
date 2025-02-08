import React from "react";
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../Utils/LayoutMeasurement";
import { colors, fonts } from "../Constant";

const CategoryStyle = StyleSheet.create({
    selected: { borderColor: colors.Blue, borderWidth: 4 },
    CommonContainer: {
        marginTop: hp('15'),
        height: hp('70'),
        width: wp('90'),
        alignSelf: 'center',
        backgroundColor: colors.White,
        borderRadius: 15,
        position: 'absolute',
    },
    ActivityIndicator: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp('30'),
        position: 'absolute',
        color: colors.DarkBlue
    },
    Data: {
        left: hp('-1.5'),
        marginTop: hp('5'),
        alignItems: 'center',
        backgroundColor: colors.White,
        borderRadius: 15,
        height: hp('12'),
        width: wp('37'),
        shadowColor: colors.Black,
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.2,
        // borderWidth: 4,
    },
    Data1: {
        right: hp('-1.5'),
        alignItems: 'center',
        backgroundColor: colors.White,
        borderRadius: 15,
        marginTop: hp('6.5'),
        height: hp('12'),
        width: wp('37'),
        shadowColor: colors.Black,
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.2,
        // borderWidth: 4,
    },
    TextView: {
        textAlign: 'center',
        fontSize: fonts.FONT_14,
        marginTop: hp('61'),
        color: colors.Blue,
    },
    FlatList: {
        // paddingTop: hp('2'),
        marginBottom : hp('2')
    }

})


export default CategoryStyle;