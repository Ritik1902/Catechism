import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Alert, StyleSheet, ScrollView } from 'react-native'
import { colors, commonstrings, fonts, images, strings } from '../../Constant';;
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../Utils/LayoutMeasurement';
import FastImage from 'react-native-fast-image';
import Result from '../../Container/Result';
import RouteName from '../../Config/RouteName';
import { useNavigation } from '@react-navigation/native';
import CountDown from 'react-native-countdown-component';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResultView from '../../Utils/ResultView';


export default Quiz = (props) => {
    const navigation = useNavigation();
    // const { navigation } = useNavigation();
    var allQuestions = props.QuizData;
    console.log(allQuestions,'allQuestions =====----')
    var lang = props.lang;
    console.log(lang,'== props Quizzs')


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)
    const [Timer, setTimer] = useState(false)

    const validateAnswer = (selectedOption) => {
        let CorrectOption;
        {
            
            lang == 'hi' ?
                CorrectOption = allQuestions[currentQuestionIndex]['CorrectOption_Hi'] :
                CorrectOption = allQuestions[currentQuestionIndex]['CorrectOption_En'];
        }

        setCurrentOptionSelected(selectedOption);
        setCorrectOption(CorrectOption);
        setIsOptionsDisabled(true);

        if (selectedOption == CorrectOption) {
            setScore(score + 1)
            allQuestions[currentQuestionIndex].flag = true
        }
        else if (selectedOption != currentOptionSelected) {
            allQuestions[currentQuestionIndex].flag = false
        }
        allQuestions = allQuestions
        setShowNextButton(true)
    }
    const renderProgressBar = () => {
        return (
            <FlatList
                bounces={false}
                horizontal={true}
                style={styles.ProgressFlatlist}
                contentContainerStyle={{ justifyContent: 'space-between', alignItems: 'center' }}
                data={allQuestions}
                renderItem={(item) => {
                    return (
                        <View style={{
                            backgroundColor: item.item.flag === ''
                                ? colors.White
                                : item.item.flag
                                    ? colors.success
                                    : colors.error,

                            height: hp('0.2'),
                            marginHorizontal: hp('0.1'),
                            width: wp('82') / allQuestions.length
                        }}>
                        </View>
                    )
                }}
            />
        )
    }
    const redirectHistory = async () => {
        var Uscore = score * 4;
        const User_id = await AsyncStorage.getItem(commonstrings.ASYNC_ID);
        const email = await AsyncStorage.getItem(commonstrings.ASYNC_EMAIL);
        var Dscore;
        var SubCategory_Id = '';
        var Category_Id = '';
        for (let i = 0; i <= allQuestions.length - 1; i++) {
            Category_Id = allQuestions[i].Category_Id;
            SubCategory_Id = allQuestions[i].SubCategory_Id;
        }
        // debugger
        await firestore()
            .collection('History')
            .add({
                TotalScore: allQuestions.length * 4,
                CorrectScore: score * 4,
                Category_Id: Category_Id,
                SubCategory_Id: SubCategory_Id,
                User_ID: User_id,
            }).then(async ()=>{
                await firestore()
                        .collection('Users')
                        .where('Email', '==', email)
                        .get()
                        .then(QuerySnapshot => {
                            QuerySnapshot.forEach(DocumentSnapshot => {
                                const userdata = DocumentSnapshot.data();
                                Dscore = userdata.Score; 
                                console.log(Dscore,'database score ')
                            })
                        });
                        console.log(Dscore)
                        firestore()
                            .collection('Users')
                            .doc(User_id)
                            .update({
                                Score : Dscore + Uscore,
                            }).then(()=>{
                                console.log('USer Score is Updated')
                            })
            })
    }
    const handleNext = () => {
        setTimer((i) => !i);
        // debugger
        if (currentQuestionIndex == allQuestions.length - 1) {
            // debugger
            redirectHistory()
            // navigation.navigate(RouteName.Result,{ InCorrect : {allQuestions.length - score},
            //     Correct : {score}
            //     Question : {allQuestions.length},
            //     Score : {score * 4}})
            setShowScoreModal(true)
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
    }
    const renderTimer = () => {
        return (
            <View style={styles.Timer}>
                <View style={styles.flex}>
                    <Text style={styles.Question}>{strings.Label_Question} {currentQuestionIndex + 1}</Text>
                </View>
                <View style={styles.renderTimer}>
                    <FastImage
                        style={styles.ClockIcon}
                        source={images.ClockIcon}
                        tintColor={colors.White}
                    />

                    <CountDown
                        id={Timer}
                        size={12}
                        until={10 * 5 + 10}
                        onFinish={handleNext}
                        digitStyle={{ backgroundColor: colors.Blue, }}
                        digitTxtStyle={{ color: colors.White }}
                        separatorStyle={{ color: colors.White }}
                        timeToShow={['M', 'S']}
                        timeLabels={{ m: null, s: null }}
                        showSeparator
                    />
                </View>
            </View>

        )
    }
    const renderQuestion = () => {
        console.log(lang,'language inside the renderQuestions')
        return (
            <View >
                <View style={{ height: hp('10.5'), }}>
                    <ScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                    >
                        {lang == 'hi' ?

                            <Text style={styles.QuestionContainer}>
                                {allQuestions[currentQuestionIndex]?.Question_Hi}
                            </Text>

                            :
                            <Text style={styles.QuestionContainer}>
                                {allQuestions[currentQuestionIndex]?.Question_En}
                            </Text>}
                    </ScrollView>
                </View>
            </View>
        )
    }
    const renderOptions = () => {
        return (
            <View>
                {lang == 'hi' ?
                    <View>
                        {
                            allQuestions[currentQuestionIndex]?.Options_Hi.map(option => (
                                <TouchableOpacity
                                    onPress={() => validateAnswer(option)}
                                    disabled={isOptionsDisabled}
                                    key={option}
                                    style={{
                                        borderWidth: 2,
                                        borderColor: option == correctOption
                                            ? colors.success
                                            : option == currentOptionSelected
                                                ? colors.error
                                                : colors.Gray + '40',

                                        backgroundColor: option == correctOption
                                            ? colors.White
                                            : option == currentOptionSelected
                                                ? colors.error
                                                : colors.White + '20',
                                        height: hp('7'),
                                        width: wp('77'),
                                        borderRadius: wp('4'),
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: hp('2'),
                                        marginVertical: hp('1'),
                                        marginHorizontal: hp('1'),
                                    }}
                                >
                                    <Text style={{
                                        fontSize: fonts.FONT_15,
                                        
                                        color: option == correctOption
                                            ? colors.success
                                            : option == currentOptionSelected
                                                ? colors.White
                                                : colors.Black,
                                    }}>
                                        {option}
                                    </Text>

                                    {
                                        option == correctOption ? (
                                            <View style={styles.correctOption}>
                                                <FastImage
                                                    source={images.RightIcon}
                                                    style={styles.RightIcon}
                                                    tintColor={colors.White}
                                                    // resizeMode={FastImage.resizeMode.contain}
                                                />
                                            </View>
                                        ) : option == currentOptionSelected ? (
                                            <View style={styles.currentOptionSelected}>
                                                <FastImage
                                                    source={images.CrossIcon}
                                                    style={styles.CrossIcon}
                                                    tintColor={colors.error}
                                                />
                                            </View>
                                        ) : null
                                    }
                                </TouchableOpacity>
                            ))
                        }
                    </View> :
                    <View>
                        {
                            allQuestions[currentQuestionIndex]?.Options_En.map(option => (
                                <TouchableOpacity
                                    onPress={() => validateAnswer(option)}
                                    disabled={isOptionsDisabled}
                                    key={option}
                                    style={{
                                        borderWidth: 2,
                                        borderColor: option == correctOption
                                            ? colors.success
                                            : option == currentOptionSelected
                                                ? colors.error
                                                : colors.Gray + '40',

                                        backgroundColor: option == correctOption
                                            ? colors.White
                                            : option == currentOptionSelected
                                                ? colors.error
                                                : colors.White + '20',
                                        height: hp('7'),
                                        width: wp('77'),
                                        borderRadius: wp('4'),
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: hp('2'),
                                        marginVertical: hp('1'),
                                        marginHorizontal: hp('1'),
                                    }}
                                >
                                    <Text style={{
                                        fontSize: fonts.FONT_15,
                                        // backgroundColor : colors.Black,
                                        width : wp('60'),
                                        color: option == correctOption
                                            ? colors.success
                                            : option == currentOptionSelected
                                                ? colors.White
                                                : colors.Black,
                                    }}>
                                        {option}
                                    </Text>

                                    {
                                        option == correctOption ? (
                                            <View style={styles.correctOption}>
                                                <FastImage
                                                    source={images.RightIcon}
                                                    style={styles.RightIcon}
                                                    tintColor={colors.White}
                                                />
                                            </View>
                                        ) : option == currentOptionSelected ? (
                                            <View style={styles.currentOptionSelected}>
                                                <FastImage
                                                    source={images.CrossIcon}
                                                    style={styles.CrossIcon}
                                                    tintColor={colors.error}
                                                />
                                            </View>
                                        ) : null
                                    }
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                }
            </View>
        )
    }
    const renderNextButton = () => {
        if (showNextButton) {
            return (
                <TouchableOpacity
                    onPress={handleNext}
                    style={styles.button}>
                    <Text style={styles.text}>{strings.Label_Next}</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    disabled={true}
                    style={styles.BtnStyle}>
                    <Text style={styles.text}>{strings.Label_Next}</Text>
                </TouchableOpacity >
            )
        }
    }
    const renderSkipButton = () => {
        if (!showNextButton) {
            return (
                <TouchableOpacity
                    onPress={handleNext}
                    style={styles.button}>
                    <Text style={styles.text}>{strings.Label_Skip}</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    disabled={true}
                    style={styles.BtnStyle}>
                    <Text style={styles.text}>{strings.Label_Skip}</Text>
                </TouchableOpacity >
            )
        }

    }

    const navigateHome = () => {
        console.log('navigation Home called')
        navigation.navigate(RouteName.Home)
    }
    const navigateLeaderBoard = () => {
        console.log('Navigation leaderboard called')
        navigation.navigate(RouteName.LeaderBoard)
    }
    console.log(showScoreModal, 'showScoreModal--->')
    return (
        
        <SafeAreaView style={{
            flex: 1
        }}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
            <View style={styles.Container}>
                {renderTimer()}
                {renderProgressBar()}
                {renderQuestion()}
                <View style={styles.renderQuestion}>
                    {renderOptions()}
                    <View style={styles.renderOptions}>
                        {renderSkipButton()}
                        {renderNextButton()}
                    </View>


                    {/* <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showScoreModal}
                        
                    >
                        <Result
                            InCorrect={allQuestions.length - score}
                            Correct={score}
                            Question={allQuestions.length}
                            Score={score * 4}
                            // ModalValue={showScoreModal}
                            RightIconClick={() => {
                                console.log('called home')
                                setShowScoreModal(false)
                                navigation.navigate(RouteName.Home)
                            }}
                            // customClick={() => navigateLeaderBoard()}
                        />
                    </Modal> */}
                   
                    <ResultView
                        visible={showScoreModal}
                        visiblemode={false}
                        InCorrect={allQuestions.length - score}
                        Correct={score}
                        Question={allQuestions.length}
                        Score={score * 4}
                        crossClick={()=>{
                            setShowScoreModal(false)
                            navigation.navigate(RouteName.Home)
                        }}
                        customClick={()=>{
                            setShowScoreModal(false)
                            navigation.navigate(RouteName.LeaderBoard)
                        }}

                    />
                    


                </View>
            </View>
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    ClockIcon: {
        height: hp('2'),
        width: wp('4'),
    },
    Container: {
        alignItems: 'center',
        paddingHorizontal: 16,
        position: 'relative',
        bottom: hp('3')
    },
    renderTimer: {
        paddingLeft: hp('1'),
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: colors.White,
        borderWidth: 1.2,
        backgroundColor: colors.Blue,
        borderRadius: wp('1.5')
    },
    Question: {
        fontWeight: 'bold',
        color: colors.White,
        fontSize: fonts.FONT_18,

    },
    flex: { flex: 1 },
    Timer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: hp('10'),
        width: wp('87')
    },
    CrossIcon: {
        height: hp('1.5'), width: wp('2.5')
    },
    renderQuestion: {
        position: 'absolute',
        marginTop: hp('15')
    },
    ProgressFlatlist: {
        width: wp('87'),
        bottom: hp('8'),
    },
    text: {
        fontSize: fonts.FONT_14,
        fontWeight: 'bold',
        color: colors.White,
        textAlign: 'center'
    },
    button: {
        height: hp('6.5'),
        marginTop: hp('4'),
        width: '45%',
        backgroundColor: colors.Blue,
        paddingVertical: hp('2'),
        borderRadius: wp('3')
    },
    RightIcon: {
        height: hp('2.5'),
        width: wp('3'),
        // resizeMode :'contain',
    },
    BtnStyle: {
        height: hp('6.5'),
        marginTop: hp('4'),
        width: '45%',
        backgroundColor: colors.Disable,
        paddingVertical: hp('2'),
        borderRadius: wp('3')
    },
    renderOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: hp('1.1')
    },
    QuestionContainer: {
        // marginTop : wp('-3'),
        textAlign: 'center',
        alignSelf: 'center',
        color: colors.Black,
        fontSize: fonts.FONT_15,
        fontWeight: 'bold',
        paddingHorizontal: wp('7'),
        lineHeight: hp('3.5'),
        // backgroundColor : "red",
    },
    correctOption: {
        width: hp('4'),
        height: hp('4'),
        borderRadius: hp('4') / 2,
        backgroundColor: colors.success,
        justifyContent: 'center', alignItems: 'center'
    },
    currentOptionSelected: {
        width: hp('4'),
        height: hp('4'),
        borderRadius: hp('4') / 2,
        backgroundColor: colors.White,
        justifyContent: 'center', alignItems: 'center'
    }
});

