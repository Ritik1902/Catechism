import React from 'react'
import { View, Text, BackHandler, Alert } from 'react-native';
import { images, } from '../../../Constant';
import { strings } from "../../../Constant/LocalString/LocalizedStrings";
import LoginStyle from '../../../Theme/LoginStyle';
import RouteName from '../../../Config/RouteName'
import Header from '../../../Components/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputView from '../../../Components/TextInput';
import CommonStyle from '../../../Theme/CommonStyle';
import Button from '../../../Components/Button';
import { firebase } from '@react-native-firebase/auth';



export default class ForgotPwd extends React.Component {
    constructor(props) {
        super(props);

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            email: '',
            error: null,
            submitted: false,
        };
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }
    onPressSignIn = () => {
        this.props.navigation.navigate(RouteName.SignIn)
    }
    onNaviagte = () => {
        this.props.navigation.navigate(RouteName.SignIn)
    }
    ForgotPwd = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
        .then((user,auth) =>{
            console.log(auth,'auth reposne')
            console.log(user,'email response')
            alert('Please check your email..')
            this.onNaviagte()
        }).catch(function (e) {
            console.log(e);
        });
    }   

    render() {
        const { email } = this.state;
        return (
            <View style={CommonStyle.MainContainer}>
                <Header
                    header={strings.ForgotPwdHeader_ForgotPassword}
                    text={strings.LoginLabel_ForgotPasswordDonTWorry}
                    presstext={strings.CommonBtn_SignIN}
                    onPress={() => this.onPressSignIn()}
                    Header={true}
                />
                <View style={CommonStyle.Container}>
                    <KeyboardAwareScrollView
                        bounces={false}
                        overScrollMode='never'
                        keyboardShouldPersistTaps={'handled'}
                        showsVerticalScrollIndicator={false}>
                        <View>
                            <InputView
                                TextInputLabel={strings.CommonLabel_Email}
                                innerRef={(input) => { this.email = input; }}
                                Placeholder={strings.CommonLabel_Email}
                                value={email}
                                leftImageView={true}
                                leftIcon={images.MessageLogo}
                                onChangeText={(email) => this.setState({ email: email })}
                                returnKeyType="next"
                                returnKeyLabel="next"
                                keyboardType="email-address"
                            />
                        </View>
                        <Button
                            BtnStyle={!email ? LoginStyle.BtnStyle : null}
                            disable={!email}
                            title={strings.ForgotLabel_RecoverPassword}
                            customClick={()=>this.ForgotPwd()}
                        />
                    </KeyboardAwareScrollView>
                </View>
            </View>
        )
    }
}



