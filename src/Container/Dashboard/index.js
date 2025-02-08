import React from "react";
import SplashScreen from "react-native-splash-screen";
import RouteName from "../../Config/RouteName";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { commonstrings } from "../../Constant";
import { strings } from '../../Constant/LocalString/LocalizedStrings';
import { getLang, setLang } from '../../Config/changLang';

class Dashboard extends React.Component {

    async componentDidMount() {
        await AsyncStorage.setItem(commonstrings.ASYNC_LOGOUT, commonstrings.FALSE)
        const Status = await AsyncStorage.getItem(commonstrings.ASYNC_AUTH_LOGIN);
        const SignInData = await AsyncStorage.getItem(commonstrings.ASYNC_SIGNIN_DATA);
        const LogOut = await AsyncStorage.getItem(commonstrings.ASYNC_LOGOUT);
        console.log(LogOut,'logout data')
        const Lng = await AsyncStorage.getItem(commonstrings.ASYNC_LANG_SELECTED)
        this.setApplang(Lng)

        setTimeout(async () => {
            if (Status == null) {
                this.props.navigation.navigate(RouteName.Slider)
            } else {
                // if (LogOut == commonstrings.TRUE ) {
                    if (SignInData == null) {
                        this.props.navigation.navigate(RouteName.SignIn)
                    } else {
                        this.props.navigation.navigate(RouteName.Drawer);
                    }
                // }
            }
            SplashScreen.hide();
        }, 2000)
    }
    setApplang = async (lng) =>{
        strings.setLanguage(lng)
        setLang(lng)
        // const lngData = await getLang()
    }
    render() {
        return null;
    }
}

export default Dashboard;