import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground, View } from 'react-native';
import { colors, fonts, images, strings } from '../../Constant';
import { RFValue } from '../../Utils/RFValueData';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../Utils/LayoutMeasurement';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = props => {
    return (
        <View style={[styles.Container3, props.Container3]}>
            <View style={[styles.Container2, props.Container2]}>
                <SafeAreaView style={[styles.Container1, props.Container1]}>
                    <View style={[styles.flexDirection, styles.header]}>
                        <Text style={styles.Header}>{props.Header ? strings.LoginHeader_Catechism : null}</Text>
                        <Text style={styles.Headerjoint}>{props.Header ? strings.LoginHeader_Chism : null}</Text>
                    </View>
                    <Text style={styles.TextSignIn}>{props.header}</Text>
                    <View style={styles.flexDirection}>
                        <Text style={styles.TextDontAccount}>{props.text}</Text>
                        <TouchableOpacity onPress={props.onPress}>
                            <Text style={styles.TextSignUp}>{props.presstext}</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    flexDirection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        marginTop: hp('1'),
    },
    Container1: {
        width: wp('101'),
        height: hp('27'),
        backgroundColor: colors.DarkBlue,
        borderBottomLeftRadius: hp('2.8'),
        borderBottomRightRadius: hp('2.8'),
        alignSelf: 'center',
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('-0.7'),
        elevation: 24,
        paddingHorizontal: hp('3.7'),
        paddingVertical: hp('0.5')
    },
    Container2: {
        width: wp('89'),
        height: hp('29'),
        backgroundColor: colors.Blue,
        borderBottomLeftRadius: hp('2.3'),
        borderBottomRightRadius: hp('2.3'),
        alignSelf: 'center',
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('-0.7'),
        elevation: 24,
    },
    Container3: {
        width: wp('76'),
        height: hp('31'),
        alignSelf: 'center',
        backgroundColor: colors.LightBlue,
        borderBottomLeftRadius: hp('2.1'),
        borderBottomRightRadius: hp('2.1'),
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('-0.7'),
        elevation: 24,

    },
    Header: {
        color: colors.SkyBlue1,
        fontSize: fonts.FONT_32,
        fontFamily: fonts.Inter_Bold
    },
    Headerjoint: {
        color: colors.SkyBlue2,
        fontSize: fonts.FONT_30,
        fontFamily: fonts.Inter_Bold
    },
    TextSignIn: {
        paddingTop: hp('3'),
        color: colors.White,
        fontSize: fonts.FONT_22,
        paddingBottom: hp('1'),
        fontFamily:fonts.Inter_Medium
    },
    TextDontAccount: {
        color: colors.White,
        fontSize: fonts.FONT_13,
        fontFamily:fonts.Inter_Regular
    },
    TextSignUp: {
        color: colors.BlueText,
        fontSize: fonts.FONT_13,
        fontFamily:fonts.Inter_SemiBold
    }
});
export default Header;