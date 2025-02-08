import React from 'react'
import { View, Text, BackHandler, Alert, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, fonts, images, commonstrings } from '../../../Constant';
import { strings } from "../../../Constant/LocalString/LocalizedStrings";
import LoginStyle from '../../../Theme/LoginStyle';
import RouteName from '../../../Config/RouteName'
import Header from '../../../Components/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputView from '../../../Components/TextInput';
import CheckBox from '@react-native-community/checkbox';
import CommonStyle from '../../../Theme/CommonStyle';
import Button from '../../../Components/Button';
import auth, { firebase } from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import appleAuth from '@invertase/react-native-apple-authentication';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager, Profile } from 'react-native-fbsdk-next';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            email: '',
            password: '',
            isSelected: false,
            useArr: [],
            signIn: [],
            onLoad: true,
            showPassword: true,
            username: '',
            // Question : [
            //     {
            //         "Category_Id": "PPfSv47GNkZn3E7k8kKe",
            //         "SubCategory_Id": "jUcC4nbJ0NH7Zs1IOfm8",
            //         "Question_En": "What is the sum of the interior angles of a triangle?",
            //         "Options_En": [
            //             "90 degrees",
            //             "180 degrees",
            //             "270 degrees",
            //             " 360 degrees"
            //         ],
            //         "CorrectOption_En": "180 degrees",
            //        "Question_Hi": "त्रिभुज के आंतरिक कोणों का योग क्या होता है?",
            //         "Options_Hi": [
            //         "90 डिग्री",
            //         "180 डिग्री",
            //         "270 डिग्री",
            //         "360 डिग्री"
            //         ],
            //         "CorrectOption_Hi": "180 डिग्री"
            //     },
            //     {
            //         "Category_Id": "PPfSv47GNkZn3E7k8kKe",
            //         "SubCategory_Id": "jUcC4nbJ0NH7Zs1IOfm8",
            //         "Question_En": "What is the formula to calculate the area of a circle?",
            //         "Options_En": [
            //             "A = πr",
            //             "A = πr^2",
            //             "A = 2πr",
            //             "A = 2πr^2"
            //         ],
            //         "CorrectOption_En": "A = πr^2",
            //         "Question_Hi": "वृत्त के क्षेत्रफल की गणना करने के लिए कौन सी सूत्र इस्तेमाल की जाती है?",
            //         "Options_Hi": [
            //         "A = πr",
            //         "A = πr^2",
            //         "A = 2πr",
            //         "A = 2πr^2"
            //         ],
            //         "CorrectOption_Hi": "A = πr^2"
            //     },
            //     {
            //         "Category_Id": "PPfSv47GNkZn3E7k8kKe",
            //         "SubCategory_Id": "jUcC4nbJ0NH7Zs1IOfm8",
            //         "Question_En": "What is the name of a polygon with seven sides?",
            //         "Options_En": [
            //             "Hexagon",
            //             "Octagon",
            //             "Heptagon",
            //             "Nonagon"
            //         ],
            //         "CorrectOption_En": "Heptagon",
            //         "Question_Hi": "सात सिरों वाले बहुभुज का नाम क्या है?",
            //         "Options_Hi": [
            //         "हेक्सागन",
            //         "ऑक्टागन",
            //         "हेप्टागन",
            //         "नोनागन"
            //         ],
            //         "CorrectOption_Hi": "हेप्टागन"
            //     },
            //     {
            //         "Category_Id": "PPfSv47GNkZn3E7k8kKe",
            //         "SubCategory_Id": "jUcC4nbJ0NH7Zs1IOfm8",
            //         "Question_En": "What is the measure of each interior angle of a regular hexagon?",
            //         "Options_En": [
            //             "90 degrees",
            //             "120 degrees",
            //             "135 degrees",
            //             "180 degrees"
            //         ],
            //         "CorrectOption_En": "120 degrees",
            //         "Question_Hi": "एक नियमित हेक्सागन के प्रत्येक आंतरिक कोण का माप क्या होता है?",
            //         "Options_Hi": [
            //         "90 डिग्री",
            //         "120 डिग्री",
            //         "135 डिग्री",
            //         "180 डिग्री"
            //         ],
            //         "CorrectOption_Hi": "120 डिग्री"
            //     },
            //     {
            //         "Category_Id": "PPfSv47GNkZn3E7k8kKe",
            //         "SubCategory_Id": "jUcC4nbJ0NH7Zs1IOfm8",
            //         "Question_En": "What is the formula to calculate the perimeter of a rectangle?",
            //         "Options_En": [
            //             " P = 2(l + w)",
            //             "P = l + w",
            //             "P = lw",
            //             "P = 4s"
            //         ],
            //         "CorrectOption_En": " P = 2(l + w)",
            //        "Question_Hi": "आयत के परिधि की गणना करने के लिए कौन सा सूत्र इस्तेमाल किया जाता है?",
            //         "Options_Hi": [
            //         "P = 2(l + w)",
            //         "P = l + w",
            //         "P = lw",
            //         "P = 4s"
            //         ],
            //         "CorrectOption_Hi": "P = 2(l + w)"
            //     },
            //     {
            //         "Category_Id": "PPfSv47GNkZn3E7k8kKe",
            //         "SubCategory_Id": "jUcC4nbJ0NH7Zs1IOfm8",
            //         "Question_En": "What is the relationship between the diagonals of a rectangle?",
            //         "Options_En": [
            //             "They are perpendicular bisectors of each other.",
            //             "They are parallel",
            //             "They are equal in length.",
            //             "They are congruent"
            //         ],
            //         "CorrectOption_En": "They are equal in length.",
            //         "Question_Hi": "आयत के विपरीत बाहुओं के बीच क्या संबंध होता है?",
            //         "Options_Hi": [
            //         "वे एक-दूसरे के लंबकोण विभाजक होते हैं।",
            //         "वे समांतर होते हैं।",
            //         "वे लंबाई में समान होते हैं।",
            //         "वे समान होते हैं"
            //         ],
            //         "CorrectOption_Hi": "वे लंबाई में समान होते हैं।"
            //     },
            //     {
            //         "Category_Id": "PPfSv47GNkZn3E7k8kKe",
            //         "SubCategory_Id": "jUcC4nbJ0NH7Zs1IOfm8",
            //         "Question_En": " What is the formula to calculate the volume of a sphere?",
            //         "Options_En": [
            //             " V = (4/3)πr",
            //             "V = (4/3)πr^2",
            //             "V = 2πr",
            //             " V = (4/3)πr^3"
            //         ],
            //         "CorrectOption_En": " V = (4/3)πr^3",          
            //         "Question_Hi": "गोला के आयाम की गणना करने के लिए कौन सा सूत्र इस्तेमाल किया जाता है?",
            //         "Options_Hi": [
            //         "V = (4/3)πr",
            //         "V = (4/3)πr^2",
            //         "V = 2πr",
            //         "V = (4/3)πr^3"
            //         ],
            //         "CorrectOption_Hi": "V = (4/3)πr^3"
            //     },
            //     {
            //         "Category_Id": "PPfSv47GNkZn3E7k8kKe",
            //         "SubCategory_Id": "jUcC4nbJ0NH7Zs1IOfm8",
            //         "Question_En": "What is the name of a three-dimensional figure with six congruent square faces?",
            //         "Options_En": [
            //             "Pyramid",
            //             "Cylinder",
            //             "Cube",
            //             "Prism"
            //         ],
            //         "CorrectOption_En": "Cube",
            //         "Question_Hi": "छह समान वर्गों वाले त्रिआयामी आकार का नाम क्या होता है?",
            //         "Options_Hi": [
            //         "पिरामिड",
            //         "सिलिंडर",
            //         "क्यूब",
            //         "प्रिज्म"
            //         ],
            //         "CorrectOption_Hi": "क्यूब"
            //     },
            //     {
            //         "Category_Id": "PPfSv47GNkZn3E7k8kKe",
            //         "SubCategory_Id": "jUcC4nbJ0NH7Zs1IOfm8",
            //         "Question_En": "What is the formula to calculate the area of a triangle?",
            //         "Options_En": [
            //             " A = lw",
            //             "A = (1/2)bh",
            //             "A = πr^2",
            //             "A = 2πr"
            //         ],
            //         "CorrectOption_En": "A = (1/2)bh",          
            //         "Question_Hi": "त्रिभुज के क्षेत्रफल की गणना करने के लिए कौन सा सूत्र इस्तेमाल किया जाता है?",
            //         "Options_Hi": [
            //         "A = lw",
            //         "A = (1/2)bh",
            //         "A = πr^2",
            //         "A = 2πr"
            //         ],
            //         "CorrectOption_Hi": "A = (1/2)bh"
            //     },
            //     {
            //         "Category_Id": "PPfSv47GNkZn3E7k8kKe",
            //         "SubCategory_Id": "jUcC4nbJ0NH7Zs1IOfm8",
            //         "Question_En": "What is the sum of the exterior angles of any polygon?",
            //         "Options_En": [
            //             "90 degrees",
            //             "180 degrees",
            //             "270 degrees",
            //             "360 degrees"
            //         ],
            //         "CorrectOption_En": "360 degrees",            
            //         "Question_Hi": "किसी भी बहुभुज के बाह्य कोणों का योग क्या होता है?",
            //         "Options_Hi": [
            //         "90 डिग्री",
            //         "180 डिग्री",
            //         "270 डिग्री",
            //         "360 डिग्री"
            //         ],
            //         "CorrectOption_Hi": "360 डिग्री"
            //     }
            // ]
        };
    }
    async componentDidMount() {
        const { Question } = this.state;
        // Question.map(async(item)=>{
        //     await firestore().collection('Question').add(item)
        // })

        const { navigation, password } = this.props;
        this.focusListener = navigation.addListener("focus", async () => {
            const email = await AsyncStorage.getItem(commonstrings.ASYNC_EMAIL)
            const password = await AsyncStorage.getItem(commonstrings.ASYNC_PASSWORD)
            const isChecked = await AsyncStorage.getItem(commonstrings.ASYNC_REMEMBER_ME) || false
            if (isChecked) {
                this.setState({ isSelected: isChecked })
            }
            this.setState({ email: email })
            this.setState({ password: password })
        })
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        BackHandler.exitApp()
    }
    onPressSignUP = () => {
        this.props.navigation.navigate(RouteName.SignUp)
    }
    onPressForgotPWD = () => {
        this.props.navigation.navigate(RouteName.ForgotPwd)
    }
    checkEmailValidity = (value) => {
        let re = strings.Label_Reg;
        let regex = strings.Label_RegEx;

        if (re.test(value) || regex.test(value)) {
            return
        } else {
            return strings.Label_InvalidEmail;
        }
    }
    checkPasswordValidity = (value) => {
        const isContainNull = strings.Label_IsNull;

        if (!isContainNull.test(value)) {
            return strings.Label_InvalidPassword;
        }
    }
    Capital = (str) => {
        const s = str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        return s;
    }
    onResult = async (querySnapshot) => {
        let { useArr, email, password, signIn } = this.state;

        signIn.push(email, password)
        const SignData = JSON.stringify(signIn)

        await AsyncStorage.setItem(commonstrings.ASYNC_SIGNIN_DATA, SignData);
        const size = querySnapshot.size;

        if (size >= '0') {
            querySnapshot.forEach((doc) => {
                useArr.push({
                    ...doc.data(),
                    key: doc.id
                })
                this.setState({ useArr: useArr, })

                useArr.map((item) => {
                    AsyncStorage.setItem(commonstrings.ASYNC_ID, item.key)
                    AsyncStorage.setItem(commonstrings.ASYNC_NAME, item.Name)
                })
                this.props.navigation.navigate(RouteName.Drawer, { data: useArr })
            })
        }
    };
    onError = async (error) => {

    }
    onPressShow = () => {
        const { showPassword } = this.state;
        this.setState({ showPassword: !showPassword });
    }
    onPressSignIN = async (item) => {
        const { email, password, } = this.state;
        const checkPassword = this.checkPasswordValidity(password);
        const checkEmail = this.checkEmailValidity(email);
        this.setState({ onLoad: false })

        if (checkEmail) {
            Alert.alert(checkEmail)
            this.setState({ onLoad: true })
        } else if (checkPassword) {
            Alert.alert(checkPassword)
            this.setState({ onLoad: true })
        } else {
            const Email = email.charAt(0).toLowerCase() + email.slice(1)
            auth().signInWithEmailAndPassword(Email, password)
                .then(async (userCredential) => {
                    AsyncStorage.setItem(commonstrings.ASYNC_EMAIL, Email)
                    AsyncStorage.setItem(commonstrings.ASYNC_PASSWORD, password)
                    const user = userCredential.user;
                    firestore().collection('Users')
                        .where('Email', '==', user.email)
                        .onSnapshot(this.onResult, this.onError);


                }).catch((error) => {
                    this.setState({ onLoad: true })
                    console.log(error);
                    if (error.code === strings.Auth_PassError) {
                        Alert.alert(strings.Validate_PassNotMatch)
                    }
                    if (error.code === strings.Auth_TooManyReq) {
                        Alert.alert(strings.Validate_UserNotFound)
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
                })

        }
    }
    onAppleButtonPress = async () => {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        const id = appleAuthRequestResponse.user;
        const documentSnapshot = await firestore()
            .collection('Users')
            .where('User_uid', '==', id)
            .get()
        const fname = appleAuthRequestResponse.fullName.familyName + ' ' + appleAuthRequestResponse.fullName.givenName;
        if (documentSnapshot.docs.length == 0) {
            await firestore().collection('Users').add({
                Name: fname,
                Email: appleAuthRequestResponse.email,
                User_uid: appleAuthRequestResponse.user,
                Profile: '',
                Score: 0,
            }).then((doc) => {
                AsyncStorage.setItem(commonstrings.ASYNC_ID, doc.id)
                AsyncStorage.setItem(commonstrings.ASYNC_EMAIL, appleAuthRequestResponse.email)
                AsyncStorage.setItem(commonstrings.ASYNC_NAME, fname)
                this.props.navigation.navigate(RouteName.Category, { navigateFrom: RouteName.SignUp })
            })
        }
        else {
            documentSnapshot.forEach(doc => {
                AsyncStorage.setItem(commonstrings.ASYNC_ID, doc.id)
                AsyncStorage.setItem(commonstrings.ASYNC_EMAIL, doc.data().Email)
                AsyncStorage.setItem(commonstrings.ASYNC_NAME, doc.data().Name)
            })
            this.props.navigation.navigate(RouteName.Drawer, { navigateFrom: RouteName.SignUp })
        }
        if (!appleAuthRequestResponse.identityToken) {
            throw new Error('Apple Sign-In failed - no identify token returned');
        }
        const { identityToken, nonce } = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
        console.log(appleCredential, 'data');
        return auth().signInWithCredential(appleCredential);
    }
    onGoogleButtonPress = async () => {
        GoogleSignin.configure({
            scopes: [],
            webClientId: '762199644363-ev7lukcbm5v6jhp6ge28b0m87o3dguja.apps.googleusercontent.com',
            offlineAccess: true,
        });
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { idToken } = userInfo;
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
            await firebase.auth().signInWithCredential(credential);
            const currentUser = firebase.auth().currentUser;
            const fname = this.Capital(currentUser.displayName);
            const Email = currentUser.email.charAt(0).toLowerCase() + currentUser.email.slice(1)
            const id = currentUser.uid;
            const documentSnapshot = await firestore()
                .collection('Users')
                .where('User_uid', '==', id)
                .get()
            if (documentSnapshot.docs.length == 0) {
                await firestore().collection('Users').add({
                    Name: fname,
                    Email: Email,
                    User_uid: currentUser.uid,
                    Profile: currentUser.photoURL,
                    Score: 0,
                }).then((doc) => {
                    AsyncStorage.setItem(commonstrings.ASYNC_ID, doc.id)
                    AsyncStorage.setItem(commonstrings.ASYNC_EMAIL, Email)
                    AsyncStorage.setItem(commonstrings.ASYNC_NAME, fname)
                    this.props.navigation.navigate(RouteName.Category, { navigateFrom: RouteName.SignUp })
                })
            }
            else {
                documentSnapshot.forEach(doc => {
                    AsyncStorage.setItem(commonstrings.ASYNC_ID, doc.id)
                    AsyncStorage.setItem(commonstrings.ASYNC_EMAIL, doc.data().Email)
                    AsyncStorage.setItem(commonstrings.ASYNC_NAME, doc.data().Name)
                })
                this.props.navigation.navigate(RouteName.Drawer, { navigateFrom: RouteName.SignUp })
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {

            } else if (error.code === statusCodes.IN_PROGRESS) {

            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {

            } else {

            }
        }
    }
    async RememberMe(value) {
        this.setState({ isSelected: value })
        await AsyncStorage.setItem(commonstrings.ASYNC_REMEMBER_ME, JSON.stringify(value))
    }
    getProfile = async () => {
        return new Promise((resolve, reject) => {
            const infoRequest = new GraphRequest('/me?fields=name,email', null, (error, result) => {
                resolve(result)
                reject(error)
            })
            new GraphRequestManager().addRequest(infoRequest).start()
        })
    }
    async onFacebookButtonPress() {
        try {
            console.log('inside the function--->>>>')
            let currentProfile = Profile.getCurrentProfile();
            if(currentProfile != null){
                LoginManager.logOut()
                this.loginFB()
            }else {
                this.loginFB()
            }
            // console.log(currentProfile,'currentprofile')
            // return Profile.getCurrentProfile().then(async currentProfile => {
            //     console.log('profile')
            //     if (currentProfile != null) {
            //         LoginManager.logOut()
            //         this.loginFB()
            //     } else {
            //         this.loginFB()
            //     }
            // }).catch((error) => {
            //     alert(error)
            // })
        } catch (e) {
            console.log(e);
        }
    }
    async loginFB() {
        try{
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }
        let credential;
        let _responseInfoCallback = async (error, result) => {
            if (error) {
                this.setState({ isLoading: false })
                console.log(error, 'error');
            } else {
                var res = await auth().signInWithCredential(credential);
                console.log(res, 'result');
                const id = res?.additionalUserInfo?.profile?.id;
                const fname = res?.additionalUserInfo?.profile?.name;
                const email = res?.additionalUserInfo?.profile?.email;
                const profile = res?.additionalUserInfo?.profile?.picture?.data?.url;

                const documentSnapshot = await firestore()
                    .collection('Users')
                    .where('User_uid', '==', id)
                    .get()
                if (documentSnapshot.docs.length == 0) {
                    await firestore().collection('Users').add({
                        Name: fname,
                        Email: email,
                        User_uid: id,
                        Profile: profile,
                        Score: 0,
                    }).then((doc) => {
                        AsyncStorage.setItem(commonstrings.ASYNC_ID, doc.id)
                        AsyncStorage.setItem(commonstrings.ASYNC_EMAIL, email)
                        AsyncStorage.setItem(commonstrings.ASYNC_NAME, fname)
                        this.props.navigation.navigate(RouteName.Category, { navigateFrom: RouteName.SignUp })
                    })
                }
                else {
                    documentSnapshot.forEach(doc => {
                        AsyncStorage.setItem(commonstrings.ASYNC_ID, doc.id)
                        AsyncStorage.setItem(commonstrings.ASYNC_EMAIL, email)
                        AsyncStorage.setItem(commonstrings.ASYNC_NAME, fname)
                    })
                    this.props.navigation.navigate(RouteName.Drawer, { navigateFrom: RouteName.SignUp })
                }
            }
        }
        let token = await AccessToken.getCurrentAccessToken();
        if (!token) {
            this.setState({ isLoading: false })
        }
        credential = auth.FacebookAuthProvider.credential(token.accessToken);
        const infoRequest = new GraphRequest('/me?fields=name,email', null, _responseInfoCallback);
        new GraphRequestManager().addRequest(infoRequest).start();
        }catch(error){
            console.log(error,'on facebook login--->')
        }
        
    }
    render() {
        const { email, onLoad, password, isSelected, showPassword } = this.state;

        return (
            <View style={CommonStyle.MainContainer}>
                <Header
                    header={strings.CommonBtn_SignIN}
                    text={strings.LoginLabel_DonTHaveAccount}
                    presstext={strings.CommonBtn_SignUP}
                    onPress={() => this.onPressSignUP()}
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
                                onChangeText={(email) => this.setState({ email: email, })}
                                returnKeyType="next"
                                returnKeyLabel="next"
                                onSubmitEditing={() => this.password.focus()}
                                keyboardType="email-address"
                            />
                            <InputView
                                TextInputLabel={strings.CommonLabel_Password}
                                innerRef={(input) => { this.password = input; }}
                                Placeholder={strings.CommonLabel_Password}
                                value={password}
                                leftImageView={true}
                                leftIcon={password ? images.UnlockLogo : images.LockLogo}
                                onChangeText={(password) => this.setState({ password: password, })}
                                secureTextEntry={showPassword}
                                returnKeyType="done"
                                returnKeyLabel="done"
                                keyboardType="default"
                                rightImageView={true}
                                rightIcon={!showPassword ? images.EyeView : images.EyeHide}
                                onTouchPwdView={() => this.onPressShow()}
                            />
                        </View>
                        <View style={LoginStyle.ForgotpwdContainer}>
                            <View style={LoginStyle.CheckBoxContainer}>
                                <CheckBox
                                    style={LoginStyle.CheckBox}
                                    disabled={false}
                                    value={isSelected}
                                    boxType={'square'}
                                    onValueChange={(value) => this.RememberMe(value)}
                                />
                                <Text style={LoginStyle.RememberMe}>{strings.LoginLabel_RememberMe}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.onPressForgotPWD()}>
                                <Text style={LoginStyle.TextForgotpwd}>{strings.LoginLabel_ForgotPassword}</Text>
                            </TouchableOpacity>
                        </View>

                        <Button
                            BtnStyle={!email && !password ? LoginStyle.BtnStyle : null}
                            disable={!email && !password}
                            title={strings.CommonBtn_SignIN}
                            customClick={() => this.onPressSignIN()}
                        />
                        {!onLoad &&
                            <View style={LoginStyle.ActivityIndicator}>
                                <ActivityIndicator size={'large'} color={colors.Blue} />
                            </View>
                        }

                        <View style={LoginStyle.OR}>
                            <View style={LoginStyle.OrWidth} />
                            <View>
                                <Text style={LoginStyle.OrText}>{strings.SignInLabel_OrSign}</Text>
                            </View>
                            <View style={LoginStyle.OrWidth} />
                        </View>
                        <View style={LoginStyle.OrSignUpWithContainer}>

                            <TouchableOpacity onPress={() => this.onGoogleButtonPress()}>
                                <FastImage
                                    source={images.Google}
                                    style={LoginStyle.GoogleLogo}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.onFacebookButtonPress()}>
                                <FastImage
                                    source={images.Facebook}
                                    style={LoginStyle.GoogleLogo}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            </TouchableOpacity>
                            {/* {Pla} */}
                            {
                                Platform.OS === 'ios' ? <TouchableOpacity
                                onPress={() => this.onAppleButtonPress()}>
                                <FastImage
                                    source={images.Apple}
                                    style={LoginStyle.GoogleLogo}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            </TouchableOpacity> : null
                            }
                            
                        </View>
                    </KeyboardAwareScrollView>
                </View >
            </View>
        )
    }
}



