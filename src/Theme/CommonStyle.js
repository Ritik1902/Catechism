import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { colors, fonts } from "../Constant";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../Utils/LayoutMeasurement';
import { getBottomSpace, getStatusBarHeight, RFValue } from '../Utils/RFValueData';
const { height, width } = Dimensions.get('window');

const CommonStyle = StyleSheet.create({
    ActivityIndicator: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp('35'),
        position: 'absolute',
        color: colors.DarkBlue

    },
    Flatlist: {
        marginTop: hp('15'),
        height: hp('65'),
        width: wp('90'),
        alignSelf: 'center',
        // backgroundColor :'red',
        backgroundColor: colors.White,
        borderRadius: 15,
        position: 'absolute',
    },
    MainContainer: {
        backgroundColor: colors.White,
        flex: 1
    },
    Container: {
        top: hp('3'),
        flexGrow : 1,
    },
    flexDirection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    Container1: {
        width: wp('88'),
        height: hp('56'),
        alignSelf: 'center',
        backgroundColor: colors.LightNavyBlue,
        borderRadius: hp('2.1'),
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('-0.7'),
        elevation: 24,
    },
    Arrow: {
        justifyContent: 'center',
        borderRadius: 11,
        position: 'absolute',
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
        right: hp('22'),
    },
    Container2: {
        backgroundColor: colors.LightNavyBlue2,
        width: wp('78'),
        height: hp('57.8'),
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
        width: wp('68'),
        height: hp('59.6'),
        alignSelf: 'center',
        backgroundColor: colors.LightNavyBlue3,
        borderRadius: hp('2.1'),
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('-0.7'),
        elevation: 24,

    },

    HeaderHome: {
        height: hp('23'),
        backgroundColor: colors.DarkBlue,
    },
    CommonContainer: {
        height: hp('67'),
        width: wp('90'),
        backgroundColor: colors.White,
        position: 'absolute',
        marginTop: hp('16'),
        alignSelf: 'center',
        borderRadius: wp('4'),
        paddingVertical: hp('3.9')
    },
    BtnStyle: {
        width: wp('81'),
        top: hp('10')
    },
    BtnExitStyle: {
        position: 'absolute',
        top: hp('85'),
        backgroundColor: colors.LightPurple,
        width: wp('25'),
        height: hp('5.5'),
        paddingVertical: hp('1.5')
    },
    BtnTextExitStyle: {
        color: colors.DarkBlue,
    }
})

export default CommonStyle;
