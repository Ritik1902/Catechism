import React from 'react'
import { StatusBar, BackHandler, View, Text, Alert } from 'react-native'
import { commonstrings, images } from '../../../Constant';;
import { strings } from "../../../Constant/LocalString/LocalizedStrings";
import HomeStyle from '../../../Theme/HomeStyle';
import Button from '../../../Components/Button';
import CommonStyle from '../../../Theme/CommonStyle';
import RouteName from '../../../Config/RouteName';
import HeaderScreen from '../../../Components/HeaderScreen';
import SettingStyle from '../../../Theme/SettingStyle';
import firestore from '@react-native-firebase/firestore';
import QuizStyle from '../../../Theme/QuizStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Quiz extends React.Component {
    constructor(props) {
        super(props),
            this.state = {
                useArr: [],
            };
    }
    async componentDidMount() {
        this.getQuestionData();
    }
    getQuestionData = async () => {
        let CategoryData = this.props.route.params.CategoryData;
        let { useArr } = this.state;
        await firestore()
            .collection('Question')
            .where('SubCategory_Id', '==', CategoryData.SubCategory_Id)
            .get()
            .then((doc) => {
                doc.forEach((queryDocumentSnapshot) => {
                    useArr.push({
                        ...queryDocumentSnapshot.data(),
                    })
                    this.setState({ useArr: useArr })
                })
            })
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }
    onResult = async (querySnapshot) => {
        let { useArr } = this.state;
        querySnapshot.forEach((doc) => {
            useArr.push({
                ...doc.data(),
            })
            this.setState({ useArr: useArr },()=>{
                console.log(this.state.useArr,'state useArr')
            })
        })
    };
    onError = async (error) => {
        Alert.alert('data not found')
    }
    onPressQuizStart = async () => {
        const { useArr } = this.state;
        const finalArray = useArr.length > 0 && useArr?.map((item, index) => {
            return {
                flag: '',
                ...item
            }
        })
        this.props.navigation.navigate(RouteName.QuizQue, { QuizData: finalArray, })
    }

    render() {
        const { useArr } = this.state;
        return (
            <View>
                <StatusBar barStyle="light-content" translucent={true} />
                <View style={CommonStyle.HeaderHome}>
                    <HeaderScreen
                        LeftIcon={images.Arrow}
                        LeftStyle={SettingStyle.ArrowLogo}
                        LeftImgFlag={true}
                        LeftIconClick={() => this.handleBackButtonClick()}
                        TextFlag={true}
                        Text={strings.QuizLabel_JoinQuiz}
                    />
                </View>

                <View style={CommonStyle.CommonContainer}>
                    <Text style={QuizStyle.Quiz_Title}>{strings.QuizLabel_QuizFound}</Text>
                    <View style={QuizStyle.Quiz_TitleView}>
                        <Text style={QuizStyle.Quiz_TitleV}>{strings.QuizLabel_CollegeQuiz}</Text>
                    </View>
                    <Text style={QuizStyle.Quiz_Header}>{strings.QuizLabel_AboutThisQuiz}</Text>
                    <View style={QuizStyle.Quiz_View2}>
                        <View style={QuizStyle.Quiz}>
                            <Text style={QuizStyle.Quiz_Text1}>{strings.QuizLabel_QuizType}</Text>
                            <Text style={QuizStyle.Quiz_Text1}>{strings.QuizLabel_NOQ}</Text>
                            <Text style={QuizStyle.Quiz_Text1}>{strings.QuizLabel_QuizDuration}</Text>
                        </View>
                        <View style={QuizStyle.Quiz}>
                            <Text style={QuizStyle.Quiz_Text2}>{strings.QuizLabel_MCQ}</Text>
                            <Text style={QuizStyle.Quiz_Text2}>{useArr.length}</Text>
                            <Text style={QuizStyle.Quiz_Text2}>{useArr.length} {strings.QuizLabel_Minutes}</Text>
                        </View>
                    </View>
                    <Button
                        customClick={() => this.onPressQuizStart()}
                        BtnStyle={CommonStyle.BtnStyle}
                        title={strings.QuizLabel_Start} />
                </View>
            </View>
        );
    }
}


