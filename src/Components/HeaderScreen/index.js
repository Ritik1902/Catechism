import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { colors, fonts, images, strings } from '../../Constant';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../Utils/LayoutMeasurement';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HeaderScreen = props => {
    return (
        <View style={styles.Container}>
            {props.LeftImgFlag ?
                <TouchableOpacity activeOpacity={1} style={[styles.ImgContainer, props.LeftIconStyle]} onPress={props.LeftIconClick}>
                    <FastImage
                        tintColor={colors.White}
                        source={props.LeftIcon}
                        style={[styles.Img, props.LeftStyle]}
                        resizeMode={FastImage.resizeMode.contain} />
                </TouchableOpacity> :
                <TouchableOpacity style={styles.ImgContainer2} disabled={true} >

                </TouchableOpacity>}

            {props.TextFlag ?
                <Text style={[styles.TextHeader, props.TextStyle]}>
                    {props.Text}
                </Text> : null}

            {props.RightImgFlag ?
                <TouchableOpacity activeOpacity={true} style={[styles.ImgContainer, props.RightIconStyle]} onPress={props.RightIconClick} >
                    <FastImage
                        tintColor={colors.White}
                        source={props.RightIcon}
                        style={[styles.Img, props.RightStyle]}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </TouchableOpacity> :
                <TouchableOpacity style={[styles.ImgContainer2, props.RightIconStyle]} disabled={true} >

                </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        width: wp('88'),
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: hp('6'),
    },
    Img: {
        height: hp(2.1),
        width: wp(5),
        alignSelf: 'center',
    },
    ImgContainer: {
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
    ImgContainer2: {
        height: hp('5.2'),
        width: wp('11'),
        backgroundColor: colors.DarkBlue,
    },
    TextHeader: {
        fontFamily: fonts.Inter_SemiBold,
        color: colors.White,
        fontSize: fonts.FONT_18,
        alignItems: 'center',

    },

});
export default HeaderScreen;