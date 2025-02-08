import React from 'react'
import { StatusBar, BackHandler, View, Text, Alert } from 'react-native'
import { strings } from "../../../Constant/LocalString/LocalizedStrings";
import Button from '../../../Components/Button';
import CommonStyle from '../../../Theme/CommonStyle';
import RouteName from '../../../Config/RouteName';
import Quiz from '../../../Components/Quiz';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonstrings } from '../../../Constant';

export default class QuizQue extends React.Component {

    constructor(props) {
        super(props),
            this.state = {
                QuizQue: [],
                CategoryData: [],
                lang : '',
            };

    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    handleBackButtonClick() {
        this.props.navigation.navigate(RouteName.Home);
        // this.props.navigation.goBack(null);
        return true;
    }
    onPressQuizStart() {
        this.props.navigation.navigate(RouteName.QuizQue)
    }
    componentDidMount = async () => {
        const QuizQue = this.props.route.params.QuizData;
        console.log(QuizQue,'hello')
        const CategoryData = this.props.route.params.CategoryData;
        this.setState({ QuizQue: QuizQue, CategoryData: CategoryData })
        // console.log(QuizQue);
        const lang = await AsyncStorage.getItem(commonstrings.ASYNC_LANG_SELECTED);
        console.log(lang,'lang inside the componentdidmount of the QuizQue')
        this.setState({lang : lang})
        
    }
    render() {
        const { QuizQue, key, QuizData, CategoryData, lang } = this.state;
        return (
            <View>
                <StatusBar barStyle="light-content" translucent={true} />
                <View style={CommonStyle.HeaderHome}>
                </View>

                <View style={CommonStyle.CommonContainer}>
                    <Quiz
                        QuizData={QuizQue}
                        CategoryData={CategoryData}
                        lang={lang}
                        
                    />
                </View>

                <Button
                    customClick={() => this.handleBackButtonClick()}
                    TxtStyle={CommonStyle.BtnTextExitStyle}
                    BtnStyle={CommonStyle.BtnExitStyle}
                    title={strings.Label_Exit} />
                <View>
                </View>
            </View>
        );
    }
}


