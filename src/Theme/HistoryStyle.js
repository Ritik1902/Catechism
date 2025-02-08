import React from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../Utils/LayoutMeasurement";
import { getBottomSpace } from "../Utils/RFValueData";
import { StyleSheet } from "react-native";
import { colors, fonts } from "../Constant";
import FastImage from "react-native-fast-image";

const HistoryStyle = StyleSheet.create({
    Flatlist: {
        marginTop: hp('15'),
        height: hp('90'),
        width: wp('90'),
        alignSelf: 'center',
        backgroundColor: colors.White,
        borderRadius: 15,
        position: 'absolute',
    },
    Text: {
        fontWeight: 'bold',
        fontSize: fonts.FONT_14,
        bottom: 2,
        color:colors.Black
    },
    Score: {
        top: 2,
        color: 'gray',
        fontSize: fonts.FONT_11,
    },
    Category: {
        height: hp('4'),
        width: hp('4'),
        alignSelf: 'center'
    },
    FlatlistData: {
        marginVertical: wp('1.5'),
        height: hp('10'),
        backgroundColor: colors.ProfileBadge,
        width: wp('80'),
        borderRadius: 15,
        flexDirection: 'row',
        alignSelf: 'center',
        // marginBottom : wp('1')
    },
    DataView: {
        height: hp('6'),
        width: wp('12'),
        backgroundColor: colors.Blue,
        alignSelf: "center",
        justifyContent: 'center',
        marginLeft: wp('5'),
        borderRadius: 10,
    },
    ImageContainer: {
        paddingLeft: wp('3'),
        alignSelf: 'center',
        textAlign: 'justify',
    },
    Flat: {
        marginTop: hp(4),
        marginBottom: hp('18'),
    }
});

export default HistoryStyle;

