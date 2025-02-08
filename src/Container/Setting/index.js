import React, { useContext } from 'react'
import { View, Text, BackHandler, Alert, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import ViewData from '../../Components/ViewData';
import { colors, commonstrings, images, } from '../../Constant';
import { strings } from '../../Constant/LocalString/LocalizedStrings';
import CommonStyle from '../../Theme/CommonStyle';
import SettingStyle from '../../Theme/SettingStyle';
import RouteName from '../../Config/RouteName';
import HeaderScreen from '../../Components/HeaderScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { getLang, setLang } from '../../Config/changLang';
import callAlert from '../../Utils/Alert';

export default class Setting extends React.Component {
    constructor(props) {
        super(props),
            this.state = {
                locallng : '',
                data: [
                    { label: 'English', value: 'en' },
                    { label: 'Hindi', value: 'hi' }
                ]
            };
    }

    async componentDidMount () {
        this.focusListener = this.props.navigation.addListener('focus', async() => {
            const lang = await AsyncStorage.getItem(commonstrings.ASYNC_LANG_SELECTED);
            console.log(lang,'component Did mount')
            this.Detech(lang)
        })
    }

     async Detech  (lang) {
        if(lang == null){
            this.setState({locallng : 'Select Item'})
            const lng1 = await AsyncStorage.getItem(commonstrings.ASYNC_LANG_SELECTED);
            console.log(lng1,'lng1')
        }else { 
            if(lang == 'en'){
                this.setState({locallng : 'English'})
            }else if(lang == 'hi'){
                this.setState({locallng : 'Hindi'})
            }else {
                console.log(lang)
            }
        }
    }
    async UNSAFE_componentWillMount () {
        
        // await AsyncStorage.setItem(commonstrings.ASYNC_LANG_SELECTED, lngData)
        const lng = await AsyncStorage.getItem(commonstrings.ASYNC_LANG_SELECTED);
        this.setState({lng : this.state.locallng},()=>{
            console.log(this.state.locallng,'inside componentWillUNMount')
        })
        console.log(lng, 'setting page')

    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
    }
    onPressProfilePage() {
        this.props.navigation.navigate(RouteName.Profile)
    }
    async onPressDeleteAccount() {
        const navigation = useNavigation();
        const ID = await AsyncStorage.getItem(commonstrings.ASYNC_ID);

        firestore()
            .collection('Users')
            .doc(ID)
            .delete()
            .then(async () => {
                console.log('User deleted!');
                try {
                    await AsyncStorage.getItem(commonstrings.ASYNC_SIGNIN_DATA);
                    await AsyncStorage.removeItem(commonstrings.ASYNC_EMAIL);
                    await AsyncStorage.removeItem(commonstrings.ASYNC_NAME);
                    await AsyncStorage.removeItem(commonstrings.ASYNC_PROFILE);
                    await AsyncStorage.removeItem(commonstrings.ASYNC_AUTH_LOGIN);
                    const SDATA = await AsyncStorage.removeItem(commonstrings.ASYNC_SIGNIN_DATA);

                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [
                                { name: RouteName.SignIn },
                            ],
                        })
                    );
                } catch (e) {
                    return false;
                }
            });
    }
    async onPressLogout() {
        try {
            const SignInData = await AsyncStorage.getItem(commonstrings.ASYNC_SIGNIN_DATA);
            const data = await AsyncStorage.getItem(commonstrings.ASYNC_REMEMBER_ME);

            await AsyncStorage.setItem(commonstrings.ASYNC_LOGOUT, commonstrings.TRUE);      
            await AsyncStorage.removeItem(commonstrings.ASYNC_NAME);
            await AsyncStorage.removeItem(commonstrings.ASYNC_PROFILE);
            await AsyncStorage.removeItem(commonstrings.ASYNC_ID)
            const SDATA = await AsyncStorage.removeItem(commonstrings.ASYNC_SIGNIN_DATA);
            
            if (data != 'true') {
                await AsyncStorage.removeItem(commonstrings.ASYNC_EMAIL);
                await AsyncStorage.removeItem(commonstrings.ASYNC_PASSWORD);
            }

            callAlert(strings.Logout_Label, 3, strings.YES_ONLY, async () => {
                const resetAction = CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: RouteName.SignIn },
                    ],
                })
                this.props.navigation.dispatch(resetAction)
            }, strings.NO, true, () => { })
        } catch (e) {
            return false;
        }
    }
    onChangeLang = async (lang) => {
        const language = await AsyncStorage.setItem('local_language', lang)
        console.log(AsyncStorage.getItem('local_language'), 'local')
        console.log(lang, 'language==')
        strings.setLanguage(lang)
        setLang(lang)
        const lngData = await getLang()
        console.log(lngData, 'lngData===-')
        await AsyncStorage.setItem(commonstrings.ASYNC_LANG_SELECTED, lngData)
            this.Detech(lang)
        this.forceUpdate()
    }
    render() {
        console.log(strings.SettingLabel_Profile, 'strings===')
        return (
            <View style={SettingStyle.Container}>
                <StatusBar barStyle="light-content" translucent={true} />

                <HeaderScreen
                    LeftIcon={images.Arrow}
                    LeftStyle={SettingStyle.ArrowLogo}
                    LeftIconStyle={{ backgroundColor: colors.LightNavyBlue }}
                    LeftImgFlag={true}
                    LeftIconClick={() => this.handleBackButtonClick()}
                    TextFlag={true}
                    Text={strings.SettingLabel_Setting}
                    RightIconStyle={SettingStyle.RightIconStyle}
                />
                <View style={SettingStyle.BoxContainer}>
                    <View style={CommonStyle.Container3}>
                        <View style={CommonStyle.Container2}>
                            <SafeAreaView style={CommonStyle.Container1}>
                                {/* <ViewData
                                    images={images.Avatar}
                                    Text={strings.SettingLabel_Profile}
                                    arrow={images.Arrow}
                                    onPress={() => this.onPressProfilePage()}
                                /> */}
                                <ViewData
                                    images={images.Notification}
                                    Text={strings.SettingLabel_Notification}
                                    arrow={images.Arrow}
                                    Toggle={true}
                                />

                                <ViewData
                                    Placeholder={this.state.locallng}
                                    dropdown={true}
                                    Visible={true}
                                    onChangeLang={(item) => {
                                        console.log(item, 'item-------->')
                                        this.onChangeLang(item)
                                    }}
                                    images={images.Globe}
                                    Text={strings.SettingLabel_Language}
                                />
                                <TouchableOpacity activeOpacity={1} onPress={()=>this.onPressLogout()}>
                                    <ViewData
                                        images={images.OnOff}
                                        onPress={() => this.onPressLogout()}
                                        BorderContainer={SettingStyle.BorderContainer}
                                        Text={strings.Label_Logout}
                                        arrow={images.Arrow}
                                    />
                                </TouchableOpacity>
                            </SafeAreaView>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
