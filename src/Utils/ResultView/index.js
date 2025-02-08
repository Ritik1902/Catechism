import React from "react";
import { Modal, View, StatusBar, TouchableOpacity, StyleSheet, Text } from "react-native";
import { colors, images } from "../../Constant";
import { SafeAreaView } from "react-native";
import FastImage from "react-native-fast-image";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../LayoutMeasurement";
import ResultStyle from "../../Theme/ResultStyle";
import HomeStyle from "../../Theme/HomeStyle";
import Button from "../../Components/Button";
import strings from "../../Constant/LocalString/en";


function ResultView(props) {
    return (    
        <SafeAreaView>
            <View>
                <Modal
                    animationType="fade"
                    transparent={props.visiblemode}
                    visible={props.visible}
                    onRequestClose={props.visibleClose}
                >
                    <StatusBar barStyle="light-content" backgroundColor="blue" translucent={true} />

                    <View style={{ flex: 1, backgroundColor: colors.Blue, alignItems: "center" }}>
                        <View style={{ height: hp('6'), width: wp('12'), marginVertical: hp('6'), marginLeft: hp('35') }}>
                            <TouchableOpacity activeOpacity={1} onPress={props.crossClick}>
                                <View style={style.Menu1}>
                                    <FastImage
                                        source={images.CrossIcon}
                                        tintColor={colors.White}
                                        style={style.Image}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={ResultStyle.Result_BoxContainer}>
                            <View style={ResultStyle.Container3}>
                                <View style={ResultStyle.Container2}>
                                    <View style={ResultStyle.Container1}>
                                        <FastImage
                                            style={HomeStyle.ThumbIcon}
                                            resizeMode={FastImage.resizeMode.contain}
                                            source={images.ThumbIcon} />

                                        <View style={ResultStyle.Result_BoxResultContainer}>
                                            <View style={ResultStyle.Result_BoxInnerContainer}>
                                                <Text style={ResultStyle.Result_BoxText}>{props.Score ? props.Score : 0}</Text>
                                            </View>
                                        </View>
                                        <FastImage
                                            style={HomeStyle.RibbionIcon}
                                            resizeMode={FastImage.resizeMode.contain}
                                            source={images.RibbonIcon} />
                                        <View style={ResultStyle.Result_BtnQue}>
                                            <Button
                                                BtnText={true}
                                                data={strings.ResultLabel_Question}
                                                title={props.Question ? props.Question : 0}
                                                BtnStyle={ResultStyle.Result_BtnQueStyle}
                                            />
                                            <Button
                                                BtnText={true}
                                                data={strings.ResultLabel_Correct}
                                                title={props.Correct ? props.Correct : 0}
                                                BtnStyle={ResultStyle.Result_BtnCorrectStyle}
                                            />
                                            <Button
                                                BtnText={true}
                                                data={strings.ResultLabel_Incorrect}
                                                title={props.InCorrect ? props.InCorrect : 0}
                                                BtnStyle={ResultStyle.Result_BtnIncorrectStyle}
                                            />
                                        </View>

                                        <Button
                                            customClick={props.customClick}
                                            activeOpacity={1}
                                            title={strings.LeaderBoardLabel_LeaderBoard}
                                            BtnStyle={ResultStyle.Result_BtnStyleLeaderBoard}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

export default ResultView;

const style = StyleSheet.create({
    Image: {
        height: hp('2.1'),
        width: wp('5')
    },
    Menu1: {
        height: hp('5.2'),
        width: wp('11'),
        backgroundColor: colors.Blue,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('-0.7'),
        elevation: 24,
    },
    Menu: {
        height: hp('5.2'),
        width: wp('11'),
        backgroundColor: colors.HomeBtn,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',


    },
    Container: {
        height: hp('6'),
        width: wp('90'),
        flexDirection: "row",
        marginTop: wp('12'),
        alignSelf: 'center',
        justifyContent: "space-between",
        alignItems: 'center'

    },
})