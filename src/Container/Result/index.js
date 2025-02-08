import React from 'react'
import { View, Text, BackHandler, Alert, StatusBar } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, commonstrings, images } from '../../Constant';
import { strings } from "../../Constant/LocalString/LocalizedStrings";
import RouteName from '../../Config/RouteName';
import HomeStyle from '../../Theme/HomeStyle';
import Button from '../../Components/Button';
import HeaderScreen from '../../Components/HeaderScreen';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsed, useNavigation, } from '@react-navigation/native';
import ResultStyle from '../../Theme/ResultStyle';
import BottomTab from '../../Components/Drawer';


class Result extends React.Component {
    constructor(props) {
        super(props),
            this.state = {
                id: '',
                Email: '',
                Score: '',
                onClose : false,
            };
    }
    // async componentDidMount() {

    //     const email = await AsyncStorage.getItem(commonstrings.ASYNC_EMAIL)
    //     const Userid = await AsyncStorage.getItem(commonstrings.ASYNC_ID)

    //     this.setState({ id: Userid })
    //     this.setState({ Email: email })
    //     firestore()
    //         .collection('Users')
    //         .where('Email', '==', this.state.Email)
    //         .get()
    //         .then(QuerySnapshot => {
    //             QuerySnapshot.forEach(DocumentSnapshot => {
    //                 const userdata = DocumentSnapshot.data();
    //                 console.log(userdata,'userdata')
    //                 this.setState({ Score: userdata.Score },()=>{
    //                     console.log(this.state.Score,'score of the user')
    //                 })
    //             });
    //             // firestore()
    //             //     .collection('Users')
    //             //     .doc(this.state.id)
    //             //     .update({
    //             //         Score: this.state.Score + this.props.Score,
    //             //     })
    //                 // .then(() => {
    //                 //     // console.log('Score UpDated!')
    //                 // })
    //         });
    // }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }
    onPressLeaderBoard ()  {
        // const navigation = useNavigation();
        // navigation.navigate(RouteName.LeaderBoard)
        
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
    }
    
    render() {
        const { InCorrect, Correct, Question, Score, customClick, RightIconClick } = this.props
        return (
            <SafeAreaView style={ResultStyle.Result_Container}>
                <View>
                    <StatusBar barStyle="light-content" translucent={true} />
                    {/* <View> */}
                    <HeaderScreen
                        RightIcon={images.CrossIcon}
                        RightIconClick={RightIconClick}
                        RightImgFlag={true}
                    />
                    {/* </View> */}
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
                                            <Text style={ResultStyle.Result_BoxText}>{Score ? Score : 0}</Text>
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
                                            title={Question ? Question : 0}
                                            BtnStyle={ResultStyle.Result_BtnQueStyle}
                                        />
                                        <Button
                                            BtnText={true}
                                            data={strings.ResultLabel_Correct}
                                            title={Correct ? Correct : 0}
                                            BtnStyle={ResultStyle.Result_BtnCorrectStyle}
                                        />
                                        <Button
                                            BtnText={true}
                                            data={strings.ResultLabel_Incorrect}
                                            title={InCorrect ? InCorrect : 0}
                                            BtnStyle={ResultStyle.Result_BtnIncorrectStyle}
                                        />
                                    </View>

                                    <Button
                                        customClick={customClick}
                                        activeOpacity={1}
                                        title={strings.LeaderBoardLabel_LeaderBoard}
                                        BtnStyle={ResultStyle.Result_BtnStyleLeaderBoard}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View >
            </SafeAreaView>
        )
    }
}


export default Result;
