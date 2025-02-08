import React from "react";
import { StyleSheet } from "react-native";
import ProfileStyle from "../../Theme/ProfileStyle";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../../Utils/LayoutMeasurement";
import { colors,images } from "../../Constant";
import { View } from "react-native";
import FastImage from "react-native-fast-image";

const BadgeComponent = (props) => {
    return (
        <View style={style.BadgeImage}>
            <FastImage
                resizeMode={FastImage.resizeMode.contain}
                // tintColor={colors.Blue}
                tintColor={props.isFocused? colors.Blue : colors.BadgeBackgr}
                style={ProfileStyle.BadgeImage}
                source={images.Hexagon} >
                    <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        tintColor={props.Color ? colors.Yellow : ''}
                        style={ProfileStyle.BadgeTrophy}
                        source={props.Source}
                    />
                {/* <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    style={ProfileStyle.BadgeTrophy}
                    source={images.SilverCup} /> */}
            </FastImage>
        </View>
    );
}

export default BadgeComponent;

const style = StyleSheet.create({
    BadgeTrophy: {
        alignSelf: 'center',
        top: hp('2'),
        height: hp('5'),
        width: wp('10'),
    },
    BadgeImage: {
        backgroundColor: '#00000000',
        alignItems: 'center',
        height: hp('9'),
        width: wp('19'),
        shadowColor: colors.ProfileBadge,
        shadowOffset: {
            width: wp('1'),
            height: hp('1'),
        },
        shadowOpacity: 3,
    },
    View: {
        backgroundColor: colors.Blue,

        alignItems: 'center',
        height: hp('9'),
        width: wp('19'),
        shadowColor: colors.ProfileBadge,
        shadowOffset: {
            width: wp('1'),
            height: hp('1'),
        },
        shadowOpacity: 3,
    }
})