import React from 'react'
import { View, BackHandler, Alert, StatusBar, ImagePickerIOS,Text,ActivityIndicator } from 'react-native';
import { commonstrings, images } from '../../../Constant';
import { strings } from "../../../Constant/LocalString/LocalizedStrings";
import RouteName from '../../../Config/RouteName';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../Constant';
import SettingStyle from '../../../Theme/SettingStyle';
import ProfileStyle from '../../../Theme/ProfileStyle';
import CommonStyle from '../../../Theme/CommonStyle';
import InputView from '../../../Components/TextInput';
import Button from '../../../Components/Button';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileImage from '../../../Components/ProfileImage';
import HeaderScreen from '../../../Components/HeaderScreen';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { heightPercentageToDP as hp } from '../../../Utils/LayoutMeasurement';


export default class UpdateProfile extends React.Component {
    constructor(props) {
        super(props),
            this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
            this.state = {
                email: '',
                name: '',
                Id: '',
                profile: '',
                Image: '',
                profile1: '',
                onLoad : false,
            };
    }
    componentDidMount = async () => {
        const e = await AsyncStorage.getItem(commonstrings.ASYNC_NAME)
        // const id = await AsyncStorage.getItem(commonstrings.ASYNC_ID);
        // console.log(id)

        await firestore()
            .collection('Users')
            .where('Name', '==', e)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    // console.log('hello');
                    id = documentSnapshot.id;
                    data = documentSnapshot.data();
                    console.log(data)
                    console.log(data, 'document data')
                    this.setState({
                        Id: id,
                        email: data.Email,
                        name: data.Name,
                        password: data.Password,
                        cfmpassword: data.ConfirmPassword,
                        profile: data.Profile
                    });
                    console.log(this.state.Id, documentSnapshot.data());
                })
            })
    }
    onUpdateImage = async () => {
        this.setState({onLoad : true})
        const name1 = await AsyncStorage.setItem(commonstrings.ASYNC_NAME, this.state.name);
        const { name, email, password, cfmpassword, Id, Image } = this.state;
        console.log(this.state.name)
        console.log(Image, 'Image Url')
        console.log(this.state.Image , '====')
        
        try {
            await firestore()
                .collection('Users')
                .doc(Id).update({
                    Name: name,
                    Email: email,
                    Profile: this.state.Image == ''? this.state.profile : this.state.Image,
                })
                this.setState({onLoad : false})
                // debugger
                this.props.navigation.navigate(RouteName.Profile)
                // .then(() => {
                //     this.setState({onLoad : false})
                //     Alert.alert('Update Successfully...')
                //     this.props.navigation.navigate(RouteName.Profile);
                // }).catch((error) => {
                //     console.error("Error adding document: ", error);
                // });
        }
         catch (error) {
            (error);
        }
    }

    SendImage = async (image) => {
        this.setState({onLoad : true})
        console.log(image, 'Send Imagesss====')
        let localPath = image.path.split("/")
        console.log(localPath[localPath.length - 1], 'localPath');
        await storage()
            .ref(`Catechism/${this.state.Id}/ProfileImage/${localPath[localPath.length - 1]}`)
            .putFile(image.path)
            .then(async (resp) => {
                let path = `Catechism/${this.state.Id}/ProfileImage/${localPath[localPath.length - 1]}`
                console.log(path, 'path')
                let data = await storage().ref(path).getDownloadURL()
                this.setState({onLoad : false})
                this.setState({ Image: data })
            })
    }
    UploadImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image?.sourceURL, 'Uploaded Image data');
            this.setState({ profile: image.sourceURL })
            this.SendImage(image);
        })
    }
    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    // }
    // UNSAFE_componentWillMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // }

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress',this.handleBackButtonClick);
    }
    
    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress',this.handleBackButtonClick);
    }

    onBack = () => {
        this.props.navigation.goBack();
    }
    handleBackButtonClick (){
        this.props.navigation.goBack(null);
        return true;
    }
    onPressProfilePage() {
        this.props.navigation.navigate(RouteName.Profile)
    }
    onPressLogout() {
        this.props.navigation.navigate(RouteName.SignIn)
    }
    // onPressChoosePhoto = () => {

    //     launchImageLibrary( (response) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.errorMessage) {
    //             console.log('ImagePicker Error: ', response.errorMessage);
    //         }
    //         else {
    //             console.log(response,'reponse---->')
    //            this.UploadImage(response);
    //             // console.log(response,'image uploaded response')
    //             // const uri = response.assets[0].uri;

    //             // this.setState({ profile: uri });
    //             // AsyncStorage.setItem(commonstrings.ASYNC_PROFILE, this.state.profile)
    //         }
    //     });
    // };
    render() {
        const { photo, name, email, password, cfmpassword, profile, profile1 } = this.state;
        return (
            <View>
                <StatusBar barStyle="light-content" backgroundColor="blue" translucent={true} />

                <View style={CommonStyle.HeaderHome}>
                    <HeaderScreen
                        LeftIcon={images.Arrow}
                        LeftStyle={SettingStyle.ArrowLogo}
                        LeftImgFlag={true}
                        LeftIconClick={() => this.handleBackButtonClick()}
                        TextFlag={true}
                        Text={strings.ProfileLabel_EditProfile}
                    />
                    <View style={ProfileStyle.InnerContainer}>
                    <TouchableOpacity
                                    onPress={() => this.UploadImage()}>
                                        
                                    <ProfileImage
                                        onPressTouchable={true}
                                        profile={true}
                                        txt={ProfileStyle.txt}
                                        Image={profile}
                                        ImageStyle={ProfileStyle.ImageView}
                                        OutsideImage={ProfileStyle.LeaderBoard_OutsideImage}
                                        InnerImage={ProfileStyle.LeaderBoard_InnerImage}
                                    />
                                    
                                </TouchableOpacity>
                        {/* {
                            
                            profile1 == '' ?
                                <>
                                    <TouchableOpacity
                                        onPress={() => this.UploadImage()}>
                                        <ProfileImage
                                            onPressTouchable={true}
                                            // onPress={() => this.onPressChoosePhoto()}
                                            profile={true}
                                            txt={ProfileStyle.txt}
                                            Image={profile1}
                                            ImageStyle={ProfileStyle.ImageView}
                                            OutsideImage={ProfileStyle.LeaderBoard_OutsideImage}
                                            InnerImage={ProfileStyle.LeaderBoard_InnerImage}
                                        />
                                    </TouchableOpacity>
                                </> : <TouchableOpacity
                                    onPress={() => this.UploadImage()}>
                                        
                                    <ProfileImage
                                        onPressTouchable={true}
                                        // onPress={() => this.onPressChoosePhoto()}
                                        profile={true}
                                        txt={ProfileStyle.txt}
                                        Image={profile == '' ? profile1 : profile}
                                        ImageStyle={ProfileStyle.ImageView}
                                        OutsideImage={ProfileStyle.LeaderBoard_OutsideImage}
                                        InnerImage={ProfileStyle.LeaderBoard_InnerImage}
                                    />
                                    
                                </TouchableOpacity>
                                
                        } */}

                        <View style={ProfileStyle.InputContainer}>
                            <InputView
                                TextInputLabel={strings.SignUpLabel_FullName}
                                OuterView={ProfileStyle.InputView}
                                innerRef={(input) => { this.name = input; }}
                                Placeholder={strings.Signup_FullName}
                                value={name}
                                leftImageView={true}
                                leftIcon={images.UserLogo}
                                onChangeText={(name) => this.setState({ name: name })}
                                returnKeyType="next"
                                returnKeyLabel="next"
                                onSubmitEditing={() => this.email.focus()}
                                keyboardType="default"
                            />
                            <InputView
                                TextInputLabel={strings.CommonLabel_Email}
                                OuterView={ProfileStyle.InputView}
                                innerRef={(input) => { this.email = input; }}
                                Placeholder={strings.CommonLabel_Email}
                                value={email}
                                leftImageView={true}
                                leftIcon={images.MessageLogo}
                                Editable={false}
                                onChangeText={(email) => this.setState({ email: email })}
                                returnKeyType="done"
                                returnKeyLabel="done"
                                // onSubmitEditing={() => this.password.focus()}
                                keyboardType="email-address"
                            />
                            <Button
                                title={strings.ProfileLabel_Save}
                                customClick={() => this.onUpdateImage()}
                                BtnStyle={ProfileStyle.ProfileBtn}
                            />
                        </View>
                    </View>
                </View>
                {
                    this.state.onLoad ? 
                    
                        <View style={{ justifyContent: 'center',
                        
                        alignSelf: 'center',
                        marginTop: hp('50'),
                        position: 'absolute',}}>
                            <ActivityIndicator size={'large'} color={colors.Blue} />
                        </View>
                    : null

                }
            </View>
        )
    }
}