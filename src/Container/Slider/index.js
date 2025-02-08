import React from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { SafeAreaView, StatusBar, StyleSheet, Image, TouchableOpacity, View, Text } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../Utils/LayoutMeasurement'
import FastImage from "react-native-fast-image";
import { images, colors, commonstrings, fonts } from "../../Constant";
import { strings } from "../../Constant/LocalString/LocalizedStrings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RouteName from "../../Config/RouteName";
import CommonStyle from "../../Theme/CommonStyle";

const slides = [
    {
        key: 1,
        title: strings.Label_CreateOwnGame,
        text: strings.Label_SliderText1,
        image: images.Book,
    },
    {
        key: 2,
        title: strings.Label_Challenge,
        text: strings.Label_SliderText2,
        image: images.HighFive,
    },
    {
        key: 3,
        title: strings.Label_WatchLeaderBoard,
        text: strings.Label_SliderText3,
        image: images.SilverCup,
    },
]

class Slider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showRealApp: false,
        }
    }

    renderNext = () => {
        return (
            <View style={style.Next}>
                <FastImage
                    tintColor={colors.White}
                    style={style.ArrowLogo}
                    source={images.Arrow} />
            </View>
        )
    }

    renderDone = () => {
        return (
            <TouchableOpacity onPress={() => this.onGetStarted()} style={style.Done}>
                <Text style={style.Start}>{strings.Label_GetStarted}</Text>
            </TouchableOpacity>
        );
    }


    onGetStarted = async () => {
        await AsyncStorage.setItem(commonstrings.ASYNC_AUTH_LOGIN, commonstrings.TRUE).then(async () => {
            const time = await AsyncStorage.getItem(commonstrings.ASYNC_AUTH_LOGIN);
            this.props.navigation.navigate(RouteName.SignIn);
        })
    };


    onSkip = async () => {
        await AsyncStorage.setItem(commonstrings.ASYNC_AUTH_LOGIN, commonstrings.TRUE).then(async () => {
            const time = await AsyncStorage.getItem(commonstrings.ASYNC_AUTH_LOGIN);
            this.props.navigation.navigate(RouteName.SignIn);
        })
    }

    renderItem = ({ item }) => {
        return (
            <View style={style.Container}>
                <StatusBar barStyle="light-content" translucent={true} />
                <View style={style.InnerContainer}>
                    <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        style={style.Image}
                        source={item.image} />
                </View>
                <Text style={style.Label}>{item.title}</Text>
                <Text style={style.Text}>{item.text}</Text>
            </View>
        )
    }
    render() {

        return (
            <AppIntroSlider
                data={slides}
                renderItem={this.renderItem}
                renderDoneButton={this.renderDone}
                renderNextButton={this.renderNext}
                showSkipButton={true}
                onSkip={()=>this.onSkip()}
            />
        )
    }
}
export default Slider;


const style = StyleSheet.create({
    InnerContainer: {
        marginTop: hp('16'),
        backgroundColor: colors.LightBlue,
        height: hp('27'),
        width: hp('27'),
        borderRadius: hp('13'),
        justifyContent: 'center',
    },
    Container: {
        backgroundColor: colors.DarkBlue,
        height: hp('50'),
        borderBottomLeftRadius: 55,
        borderBottomRightRadius: 55,
        alignItems: 'center'
    },
    Circle: {
        color: 'red',
        height: hp('25'),
        width: wp('25'),
        marginTop: hp('5'),
    },
    Label: {
        marginTop: hp('13'),
        textAlign: 'center',
        fontSize: 25,
        fontFamily: fonts.Inter_SemiBold,
        color: colors.Black
    },

    Text: {
        marginVertical: wp('4'),
        textAlign: 'center',
        fontSize: fonts.FONT_16,
        fontFamily: fonts.Inter_Light,
        color: colors.Black
    },
    Next: {
        alignSelf :"center",
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
        paddingVertical: hp('0.7'),
        alignItems: 'center'
    },
    Done: {
        backgroundColor: colors.DarkBlue,
        height: hp('5.2'),
        width: wp('40'),
        borderRadius: 10,
        justifyContent: 'center',
    },
    Start: {
        textAlign: 'center',
        color: colors.White,
        fontSize: fonts.FONT_14,
        fontFamily: fonts.Inter_Medium,

    },
    Image: {
        height: hp('35'),
        width: wp('40'),
        transform: [{ rotate: '3deg' }],
        position: 'absolute',
        alignSelf: 'center',
    },
    ArrowLogo: {
        height: hp('4'),
        width: wp('4'),
    },
})
