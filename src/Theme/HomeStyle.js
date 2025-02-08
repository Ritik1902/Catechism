import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors, fonts } from "../Constant";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../Utils/LayoutMeasurement';
import { getBottomSpace, getStatusBarHeight, RFValue } from '../Utils/RFValueData';
const { height, width } = Dimensions.get('window');

const HomeStyle = StyleSheet.create({
    FlatList: {  alignSelf:"center", },
    BellImage: {
        position: 'absolute',
        height: hp(2),
        width: wp(5),
        alignSelf: 'center',

    },
    CategoryName: {
        textAlign : "center",
        fontSize: fonts.FONT_12,
        color: 'red',
        fontWeight: 'bold',
        top: hp('8'),
        fontFamily: fonts.Inter_Medium,
    },
    CategoryName2: {
        textAlign : "center",
        color: 'green',
        fontSize: fonts.FONT_12,
        fontWeight: 'bold',
        top: hp('8'),
        fontFamily: fonts.Inter_Medium,
    },

    ArrowIcon: {
        height: hp(5),
        width: wp(6.5),
        alignSelf: 'center',
        transform: [{ rotateY: '180deg' }],
        flexDirection: 'row',
    },
    Heading1: {
        textAlign: 'center',
        marginLeft: wp('6'),
        fontSize: fonts.FONT_20,
        fontWeight: 'bold',
        color: colors.White,
    },
    Bell: {
        justifyContent: 'center',
        borderRadius: 15,
        alignItems: 'flex-end',
        height: hp('6.5'),
        width: wp('14'),
        backgroundColor: colors.HomeBtn,
    },
    Header: {
        height: hp('30'),
        backgroundColor: colors.DarkBlue,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    HeaderHome: {
        height: hp('20'),
        backgroundColor: colors.DarkBlue,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    Header1: {
        height: hp('20'),
        backgroundColor: colors.DarkBlue,
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
    Heading: {
        marginTop: hp('3'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('90'),
        alignSelf: 'center',

    },
    ChooseCategory: {
        color: colors.Black,
        fontSize: fonts.FONT_18,
        fontWeight: 'bold',
    },
    SeeAll: {
        color: colors.BlueText,
        fontWeight: 'bold',
        fontSize: fonts.FONT_12,
        top: hp('0.7')

    },
    Data: {
        // backgroundColor:'red',
        marginTop :wp('6'),
        alignItems: 'center',
        // backgroundColor : 'red',
        backgroundColor: colors.White,
        borderRadius: 15,
        height: hp('12'),
        width: wp('40'),
        shadowColor: colors.Black,
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.2,
    },
    // Data: {
    //     // flex:1,
    //     // backgroundColor:'black',
    //     left: Platform.OS === 'ios' ? hp('0') : hp('0'), 
    //     marginTop: hp('5'),
    //     alignItems: 'center',
    //     // backgroundColor :'red',
    //     backgroundColor: colors.White,
    //     borderRadius: 15,
    //     height: hp('12'),
    //     width: wp('40'),
    //     shadowColor: colors.Black,
    //     shadowOffset: {
    //         width: 2,
    //         height: 4,
    //     },
    //     shadowOpacity: 0.2,
    //     // marginBottom : wp('15')
    // },
    // Data1: {
    //     right: Platform.OS === 'ios' ? hp('-1') : hp('0'), 
    //     alignItems: 'center',
    //     backgroundColor: colors.White,
    //     borderRadius: 15,
    //     marginTop: hp('6.5'),
    //     height: hp('12'),
    //     width: wp('40'),
    //     shadowColor: colors.Black,
    //     shadowOffset: {
    //         width: 2,
    //         height: 4,
    //     },
    //     shadowOpacity: 0.2,
    //     // marginBottom : wp('-25')
    // },
    Data1: {
        alignItems: 'center',

        marginLeft: wp('6'),
        backgroundColor: colors.White,
        borderRadius: 15,
        // flexDirection: 'row',
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
    ListImage: {
        height: hp('10'),
        width: wp('20'),
        position: 'absolute',
        top: hp('-3'),
    },

    Welcome: {
        // marginTop: hp('9'),
        color: colors.White,
        fontSize: fonts.FONT_14,
        marginLeft: wp('7')
    },
    UserName: {
        marginVertical: wp('0.8'),
        width: wp('50'),
        color: colors.White,
        marginLeft: wp('7'),
        fontSize: fonts.FONT_20,
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
    

})

export default HomeStyle;
