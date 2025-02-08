import React from 'react'
import { View, Text, BackHandler, Platform, Alert, ScrollView } from 'react-native';
import { commonstrings, images, colors } from '../../../Constant';
import { strings } from "../../../Constant/LocalString/LocalizedStrings";
import LoginStyle from '../../../Theme/LoginStyle';
import Header from '../../../Components/Header'
import CommonStyle from '../../../Theme/CommonStyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputView from '../../../Components/TextInput';
import Button from '../../../Components/Button';
import RouteName from '../../../Config/RouteName';
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { Base64 } from 'js-base64';
import { heightPercentageToDP, widthPercentageToDP } from '../../../Utils/LayoutMeasurement';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            email: '',
            password: '',
            name: '',
            cfmpassword: '',
            showPassword: true,
            showcfrmPassword: true,
            useArr: [],
            signIn: [],
            onLoad: true,
            user_id: '',
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
    onPressSignIn() {
        this.props.navigation.navigate(RouteName.SignIn)
    }
    checkEmailValidity = (value) => {
        let re = /\S+@\S+\.\S+/;
        const isContainNull = /^(?=.*\S).*$/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!isContainNull.test(value)) {
            return strings.Validate_EmailEmpty;
        } else if (re.test(value) || regex.test(value)) {
            return
        } else {
            return strings.Validate_Email;
        }
    };

    checkPasswordValidity = (value) => {
        const isContainNull = /^(?=.*\S).*$/;
        if (!isContainNull.test(value)) {
            return strings.Validate_PassEmpty;
        }
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {
            return strings.Validate_Password;
            // return strings.Validate_PassNotContainWhiteSpace;
        }

        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(value)) {
            return strings.Validate_Password;
            // return strings.Validate_PassMustUpperCase;
        }

        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(value)) {
            return strings.Validate_Password;
            // return strings.Validate_PassMustLowerCase;
        }

        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(value)) {
            return strings.Validate_Password;
            // return strings.Validate_PassAtleastOneDigit;
        }

        const isValidLength = /^.{6,10}$/;
        if (!isValidLength.test(value)) {
            return strings.Validate_Password;
            // return strings.Validate_PassMust6to8;
        }
        const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        if (!isContainsSymbol.test(value)) {
            return strings.Validate_Password;
            // return strings.Validate_PassAtleastOneSpecial;
        }
    }
    onPressShow = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }
    onPressShowPass = () => {
        this.setState({ showcfrmPassword: !this.state.showcfrmPassword });
    }
    Capital = (str) => {
        const s = str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        return s;
    }
    onResult = async (querySnapshot) => {
        const Category = await AsyncStorage.getItem(commonstrings.ASYNC_CATEGORY_SELECTED);
        let { useArr, email, password, signIn } = this.state;

        signIn.push(email, password)
        const SignData = JSON.stringify(signIn)
        await AsyncStorage.setItem(commonstrings.ASYNC_SIGNIN_DATA, SignData);
        const size = querySnapshot.size;
        if (size > 0) {
            try {
                querySnapshot.forEach((doc) => {

                    useArr.push({
                        ...doc.data(),
                        key: doc.id
                    })
                    this.setState({ useArr: useArr })

                    console.log('====================================');
                    console.log('data2');
                    console.log('====================================');
                    useArr.map((item) => {
                        AsyncStorage.setItem(commonstrings.ASYNC_ID, item.key)
                        AsyncStorage.setItem(commonstrings.ASYNC_NAME, item.Name)
                    }
                    )
                    this.setState({ onLoad: false })
                    this.props.navigation.navigate(RouteName.Category, { navigateFrom: RouteName.SignUp },)
                    console.log('====================================');
                    console.log('data3');
                    console.log('====================================');

                })
            } catch (error) {
                console.log(error);
            }
        }
    };
    onError = async (error) => {
      console.log(error,'error')
    }
    onPressSignUP = () => {

        const { name, email, password, cfmpassword, onLoad, user_id } = this.state;
        const fname = this.Capital(name);
        const checkPassword = this.checkPasswordValidity(password);
        const checkEmail = this.checkEmailValidity(email);
        this.setState({ onLoad: false })

        if (name === '' && email === '' && password === '' && cfmpassword === '') {
            Alert.alert(strings.Validate_Empty);
            this.setState({ onLoad: true })
        } else if (!fname) {
            Alert.alert(fname)
            this.setState({ onLoad: true })
        } else if (checkEmail) {
            Alert.alert(checkEmail)
            this.setState({ onLoad: true })
        } else if (checkPassword) {
            Alert.alert(checkPassword)
            this.setState({ onLoad: true })
        } else if (password.length !== cfmpassword.length) {
            Alert.alert(strings.Validate_PassCfrmpassMatch);
            this.setState({ onLoad: true })
        } else {
            const Email = email.charAt(0).toLowerCase() + email.slice(1)
            auth().createUserWithEmailAndPassword(Email, password).then(user => {
                this.setState({ user_id: user.user._user.uid }, () => {
                    console.log(this.state.user_id)
                });
                firestore().collection('Users').add({
                    Name: fname,
                    Email: Email,
                    User_uid: this.state.user_id,
                    Score: 0,
                    Profile: '',
                    Interest : [],
                }).then(async () => {
                    await AsyncStorage.setItem(commonstrings.ASYNC_EMAIL, email)
                    await AsyncStorage.setItem(commonstrings.ASYNC_PASSWORD, password)
                    this.setState({ onLoad: true })
                    await firestore().collection('Users')
                        .where('Email', '==', Email)
                        .onSnapshot(this.onResult, this.onError);
                });
            }).catch(error => {
                if (error.code === strings.Auth_PassError) {
                    Alert.alert(strings.Validate_PassNotMatch)
                }
                if (error.code === strings.Auth_UserNotFound) {
                    Alert.alert(strings.Validate_UserNotFound)
                }
                if (error.code === strings.Auth_EmailUseError) {
                    Alert.alert(strings.Validate_EmailUse)
                }
                if (error.code === strings.Auth_EmaiError) {
                    Alert.alert(strings.Validate_EmailNotMatch)
                }
            });
        }
    }
    // onPressSignUP = () => {

    //     const { name, email, password, cfmpassword, onLoad, user_id } = this.state;
    //     const fname = this.Capital(name);
    //     const checkPassword = this.checkPasswordValidity(password);
    //     const checkEmail = this.checkEmailValidity(email);
    //     this.setState({ onLoad: false })

    //     if (name === '' && email === '' && password === '' && cfmpassword === '') {
    //         Alert.alert(strings.Validate_Empty);
    //         this.setState({ onLoad: true })
    //     } else if (!fname) {
    //         Alert.alert(fname)
    //         this.setState({ onLoad: true })
    //     } else if (checkEmail) {
    //         Alert.alert(checkEmail)
    //         this.setState({ onLoad: true })
    //     } else if (checkPassword ) {
    //         Alert.alert(checkPassword)
    //         this.setState({ onLoad: true })
    //     } 
    //     else if (password.length !== cfmpassword.length) {
    //         Alert.alert(strings.Validate_PassCfrmpassMatch);
    //         this.setState({ onLoad: true })
    //     } 
    //     else {
    //         auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(user => {
    //             this.setState({ user_id: user.user._user.uid }, () => {
    //                 console.log(this.state.user_id,'user_id')
    //             });
    //             firestore().collection('Users').add({
    //             // firestore().collection('Users_Catechism').add({
    //                 Name: fname,
    //                 Email: email,
    //                 User_uid: this.state.user_id,
    //                 Score : 0,
    //                 profile : '',
    //             }).then(() => {
    //                 AsyncStorage.setItem(commonstrings.ASYNC_EMAIL, email)
    //                 console.log(AsyncStorage.getItem(commonstrings.ASYNC_EMAIL,'async data'))
    //                 firestore().collection('Users')
    //                     .where('Email', '==', email)
    //                     .onSnapshot(this.onResult, this.onError);
    //             });
    //         }).catch(error => {
    //             if (error.code === strings.Auth_PassError) {
    //                 Alert.alert(strings.Validate_PassNotMatch)
    //             }
    //             if (error.code === strings.Auth_UserNotFound) {
    //                 Alert.alert(strings.Validate_UserNotFound)    
    //             }
    //             if (error.code === strings.Auth_EmailUseError) {
    //                 Alert.alert(strings.Validate_EmailUse)
    //             }
    //             if (error.code === strings.Auth_EmaiError) {
    //                 Alert.alert(strings.Validate_EmailNotMatch)
    //             }
    //         });



    //     }



    // }
    // onPressSignUP = async () => {
    //     const { name, email, password, cfmpassword, onLoad } = this.state;

    //     const fname = this.Capital(name);
    //     const checkPassword = this.checkPasswordValidity(password);
    //     const checkEmail = this.checkEmailValidity(email);
    //     this.setState({ onLoad: false })

    //     if (name === '' && email === '' && password === '' && cfmpassword === '') {
    //         Alert.alert(strings.Validate_Empty);
    //         this.setState({ onLoad: true })
    //     } else if (!fname) {
    //         Alert.alert(fname)
    //         this.setState({ onLoad: true })
    //     } else if (checkEmail) {
    //         Alert.alert(checkEmail)
    //         this.setState({ onLoad: true })
    //     } else if (checkPassword) {
    //         Alert.alert(checkPassword)
    //         this.setState({ onLoad: true })
    //     } else if (password.length !== cfmpassword.length) {
    //         Alert.alert(strings.Validate_PassCfrmpassMatch);
    //         this.setState({ onLoad: true })
    //     } else {
    //         auth().createUserWithEmailAndPassword(email, Base64.encode(password))
    //             .then((response) => {
    //                 console.log(response);
    //                 firestore().collection('Users_Catechism').add({
    //                     Name: fname,
    //                     Email: email,
    //                     Password: Base64.encode(password),
    //                     ConfirmPassword: Base64.encode(cfmpassword),
    //                 }).then(() => {
    //                     AsyncStorage.setItem(commonstrings.ASYNC_EMAIL, email)
    //                     firestore().collection('Users_Catechism')
    //                         .where('Email', '==', email)
    //                         .onSnapshot(this.onResult, this.onError);
    //                 });
    //             }).catch((error) => {
    //                 if (error.code === strings.Auth_PassError) {
    //                     Alert.alert(strings.Validate_PassNotMatch)
    //                 }
    //                 if (error.code === strings.Auth_UserNotFound) {
    //                     Alert.alert(strings.Validate_UserNotFound)
    //                 }
    //                 if (error.code === strings.Auth_EmailUseError) {
    //                     Alert.alert(strings.Validate_EmailUse)
    //                 }
    //                 if (error.code === strings.Auth_EmaiError) {
    //                     Alert.alert(strings.Validate_EmailNotMatch)
    //                 }
    //             });
    //     }
    // }

    onPressSign = () =>{
        this.props.navigation.navigate(RouteName.Category, { navigateFrom: RouteName.SignUp },);
    }
    render() {
        const { email, password, name, cfmpassword, showPassword, showcfrmPassword, onLoad } = this.state;
        return (
            <View style={CommonStyle.MainContainer}>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    // style={{marginBottom : widthPercentageToDP('5')}}
                    scrollEnabled={true}
                    enableAutomaticScroll={true}
                    extraHeight={30}
                    keyboardShouldPersistTaps='handled'
                    // contentContainerStyle={{marginBottom: widthPercentageToDP('20')}}
                >
                    <Header
                        header={strings.LoginLabel_RegisterAccount}
                        text={strings.LoginLabel_AlreadyHaveAccount}
                        presstext={strings.CommonBtn_SignIN}
                        onPress={() => this.onPressSignIn()}
                        Header={true}
                    />

                    {/* <ScrollView
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        scrollEnabled={true}

                    > */}

                        <View style={CommonStyle.Container}>
                            <View>
                                <InputView
                                    TextInputLabel={strings.SignUpLabel_FullName}
                                    innerRef={(input) => { this.name = input; }}
                                    Placeholder={strings.Signup_FullName}
                                    value={name}
                                    leftImageView={true}
                                    leftIcon={images.UserLogo}
                                    onChangeText={(name) => this.setState({ name: name })}
                                    returnKeyType="next"
                                    returnKeyLabel="next"
                                    onSubmitEditing={() => this.email.focus()}
                                    blurOnSubmit={true}
                                    keyboardType="default"
                                />
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
                                    onSubmitEditing={() => this.password.focus()}
                                    blurOnSubmit={true}
                                    keyboardType="email-address"
                                />
                                <InputView
                                    TextInputLabel={strings.CommonLabel_Password}
                                    innerRef={(input) => { this.password = input; }}
                                    Placeholder={strings.CommonLabel_Password}
                                    value={password}
                                    leftImageView={true}
                                    leftIcon={password ? images.UnlockLogo : images.LockLogo}
                                    onChangeText={(password) => this.setState({ password: password })}
                                    keyboardType="default"
                                    returnKeyType="next"
                                    returnKeyLabel="next"
                                    secureTextEntry={showPassword}
                                    onSubmitEditing={() => this.cfmpassword.focus()}
                                    blurOnSubmit={true}
                                    rightImageView={true}
                                    rightIcon={!showPassword ? images.EyeView : images.EyeHide}
                                    onTouchPwdView={() => this.onPressShow()}
                                />
                                <InputView
                                    TextInputLabel={strings.CommonLabel_CfPassword}
                                    innerRef={(input) => { this.cfmpassword = input; }}
                                    Placeholder={strings.CommonLabel_CfPassword}
                                    value={cfmpassword}
                                    leftImageView={true}
                                    leftIcon={cfmpassword ? images.UnlockLogo : images.LockLogo}
                                    onChangeText={(cfmpassword) => this.setState({ cfmpassword: cfmpassword })}
                                    returnKeyType="done"
                                    returnKeyLabel="done"
                                    secureTextEntry={showcfrmPassword}
                                    keyboardType="default"
                                    rightImageView={true}
                                    rightIcon={!showcfrmPassword ? images.EyeView : images.EyeHide}
                                    onTouchPwdView={() => this.onPressShowPass()}
                                    blurOnSubmit={true}
                                />

                            </View>

                            <Button
                                BtnStyle={!email && !password ? LoginStyle.BtnStyle : null}
                                disable={!email && !password}
                                title={strings.CommonBtn_SignUP}
                                // customClick={() => this.onPressSign()}
                                customClick={() => this.onPressSignUP()}
                            />
                            {!onLoad &&
                                <View style={LoginStyle.ActivityIndicator}>
                                    <ActivityIndicator size={'large'} color={colors.Blue} />
                                </View>
                            }

                        </View>
                    {/* </ScrollView> */}

                </KeyboardAwareScrollView>
            </View>
        );
    }
}



export default SignUp;