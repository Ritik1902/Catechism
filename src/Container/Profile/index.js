import React from "react";
import { FlatList, SafeAreaView, Text, View, StatusBar, TouchableOpacity, BackHandler, ActivityIndicator, StyleSheet } from "react-native";
import { heightPercentageToDP, heightPercentageToDP as hp, widthPercentageToDP as wp } from "../../Utils/LayoutMeasurement";
import FastImage from "react-native-fast-image";
import { colors, images, fonts, commonstrings } from "../../Constant";
import { strings } from "../../Constant/LocalString/LocalizedStrings";
import ProfileStyle from "../../Theme/ProfileStyle";
import HomeStyle from "../../Theme/HomeStyle";
import ProfileImage from "../../Components/ProfileImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from '../../Components/Button';
import RouteName from '../../Config/RouteName';
import firestore from '@react-native-firebase/firestore';
import CommonStyle from "../../Theme/CommonStyle";
import BadgeComponent from "../../Components/BadgeComponent";
import HeaderOption from "../../Components/HeaderOption";

export default class Profile extends React.Component {
    constructor(props) {
        super(props),
        this.handleBackButtonClick =  this.handleBackButtonClick.bind(this);
            this.state = {
                Id :'',
                Profile : '',
                onLoad: true,
                Name : '',
                Score  :'',
            };
    }
    onProfileData = async () => {
        const name = await AsyncStorage.getItem(commonstrings.ASYNC_NAME);
        console.log(name,'name===>')
        

        await firestore()
            .collection('Users')
            .where('Name', '==', name)
            .get()
            .then(querySnapshot => {
                const size = querySnapshot.size;
                console.log(size, 'size')

                if (size >= 0) {
                    querySnapshot.forEach(documentSnapshot => {
                        console.log(documentSnapshot.data(),'console document data')
                        id = documentSnapshot.id;
                        
                        
                        console.log('hello');
                        id = documentSnapshot.id;
                        data = documentSnapshot.data();
                        
                        // console.log(data, 'data')

                        this.setState({
                            Id: documentSnapshot.data().id,
                            Email: documentSnapshot.data().Email,
                            Name: documentSnapshot.data().Name,
                            Profile: documentSnapshot.data().Profile,
                            Score: documentSnapshot.data().Score,
                            onLoad: false
                        });
                    })
                } else {
                    this.setState({
                        Id: [], Score: [], Email: [], Name: [], Password: [], Cfmpassword: [], Profile: [], onLoad: false
                    });
                }
            })
    }

    async componentDidMount() {
        console.log('Focus method Load','Profile aPage')
        // const { navigation } = this.props;
        const language = await AsyncStorage.getItem(commonstrings.ASYNC_LANG_SELECTED);
        const name = await AsyncStorage.getItem(commonstrings.ASYNC_NAME);
        // strings.setLanguage(language)
        this.focusListener = this.props.navigation.addListener("focus",  () => {
            console.log('called focus method profile page')
            this.onProfileData()   
        })
        this.onProfileData();
        return this.focusListener;
        

    }
    componentWillMount () {
        BackHandler.addEventListener('hardwareBackPress',this.handleBackButtonClick);
    }

    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
    }
    handleBackButtonClick () {
        this.props.navigation.goBack(null);
        return true;
    }
    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    // }

    // UNSAFE_componentWillMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // }

    // handleBackButtonClick() {
    //     this.props.navigation.goBack();
    //     return true;
    // }
    onBack = () => {
        this.props.navigation.goBack();
    }
    OnPressSetting = () => {
        this.props.navigation.navigate(RouteName.Setting);
    }
    onPressUpdateProfile = () => {

        this.props.navigation.navigate(RouteName.UpdateProfile)
    }
    render() {
        // let name = AsyncStorage.getItem(commonstrings.ASYNC_NAME);
        const { Name, Profile, onLoad, Score } = this.state;
        return (
            <View>
                <View>
                    <StatusBar barStyle="light-content" backgroundColor="blue" translucent={true} />
                    <View style={HomeStyle.Header1}>
                        <HeaderOption
                            lefticon={'isFocused'}
                            Title={'Profile'}
                        />
                    </View>

                    <View style={[ProfileStyle.ProfileView, style.Profile]}>
                        <ProfileImage
                            profile={true}
                            pointDown={true}
                            txt={ProfileStyle.txt}
                            Image={Profile}
                            ImageStyle={ProfileStyle.ImageView}
                            OutsideImage={ProfileStyle.LeaderBoard_OutsideImage}
                            InnerImage={ProfileStyle.LeaderBoard_InnerImage}
                        />
                        <Text style={ProfileStyle.UserName}>{Name}</Text>
                        <View style={{flexDirection : 'row', alignSelf : "center",
                             width : wp('60'),
                            justifyContent:'space-between'

                        }}>
                        <Button
                            activeOpacity={1}
                            TxtStyle={ProfileStyle.BtnTextStyle}
                            BtnStyle={ProfileStyle.BtnStyle}
                            title={strings.ProfileLabel_EditProfile}
                            customClick={() => this.onPressUpdateProfile()}
                        />
                        <Button
                            activeOpacity={1}
                            TxtStyle={ProfileStyle.BtnTextStyle}
                            BtnStyle={ProfileStyle.BtnStyle}
                            title={strings.SettingLabel_Setting}
                            customClick={() => this.OnPressSetting()}
                        />
                        </View>
                    </View>

                    <View style={ProfileStyle.Options}>
                        <View style={ProfileStyle.Badge}>
                            <Text style={ProfileStyle.BadgeText}>{strings.ProfileLabel_Badge}</Text>
                            <View style={ProfileStyle.Badge2}>
                                <BadgeComponent
                                    isFocused={this.state.Score >= 10 ? true : false}
                                    Source={images.SilverCup}
                                />
                                <BadgeComponent
                                    isFocused={this.state.Score >= 20 ? true : false}
                                    Source={images.Medal}
                                />
                                 <BadgeComponent
                                    isFocused={this.state.Score >= 30 ? true : false}
                                    Source={images.validity}
                                    Color={true}
                                />
                                {/* <View >
                                    <FastImage
                                        resizeMode={FastImage.resizeMode.contain}
                                        tintColor={colors.Blue}
                                        style={ProfileStyle.BadgeImage}
                                        source={images.Hexagon} >
                                        <FastImage
                                            resizeMode={FastImage.resizeMode.contain}
                                            style={ProfileStyle.BadgeTrophy}    
                                            source={images.SilverCup} />
                                    </FastImage>
                                </View> */}
                                {/* <FastImage
                                    resizeMode={FastImage.resizeMode.contain}
                                    tintColor={colors.Blue}
                                    style={ProfileStyle.BadgeImage}
                                    source={images.Hexagon} >
                                    <FastImage
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={ProfileStyle.BadgeTrophy}
                                        source={images.Medal} />
                                </FastImage> */}

                                {/* <FastImage
                                    resizeMode={FastImage.resizeMode.contain}
                                    tintColor={colors.Blue}
                                    style={ProfileStyle.BadgeImage}
                                    source={images.Hexagon}>
                                    <FastImage
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={ProfileStyle.BadgeTrophy}
                                        tintColor={colors.Yellow}
                                        source={images.validity} />
                                </FastImage> */}
                            </View>
                        </View>
                        {/* <View style={ProfileStyle.Badge1}> */}
                            {/* <View style={ProfileStyle.BannerView}> */}
                                {/* <FastImage
                                    tintColor={colors.Globe}
                                    style={ProfileStyle.BannerImage}
                                    resizeMode={FastImage.resizeMode.contain}
                                    source={images.Globe} />
                                <Text style={ProfileStyle.BannerLabel}>{strings.ProfileLabel_WorldRank}</Text> */}
                                {/* <Text style={ProfileStyle.BannerText}>7,373,025</Text> */}

                            {/* </View> */}
                            {/* <View style={ProfileStyle.BannerView}> */}
                                {/* <FastImage style={ProfileStyle.BannerImage}
                                    resizeMode={FastImage.resizeMode.contain}
                                    source={images.SoftBall} />
                                <Text style={ProfileStyle.BannerLabel}>{strings.ProfileLabel_LocalRank}</Text> */}
                                {/* <Text style={ProfileStyle.BannerText}>1,913</Text> */}
                            {/* </View> */}
                            {/* <View style={ProfileStyle.BannerView}> */}
                                {/* <FastImage style={ProfileStyle.BannerImage}
                                    resizeMode={FastImage.resizeMode.contain}
                                    source={images.Star} />
                                <Text style={ProfileStyle.BannerLabel}>{strings.ProfileLabel_Score}</Text>
                                <Text style={ProfileStyle.BannerText}>{Score}</Text> */}
                            {/* </View> */}
                        {/* </View> */}
                    </View>
                </View>
                {
                    onLoad
                        ?
                        <View style={CommonStyle.ActivityIndicator}>
                            <ActivityIndicator size={'large'} color={colors.Blue} />
                        </View>
                        :
                        null
                }
            </View>

        );
    }
}

const style = StyleSheet.create({
    Profile : {
        marginTop : heightPercentageToDP('15'),
    }
})