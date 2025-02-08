import React from "react";
import { Text, View, StatusBar, FlatList, ActivityIndicator } from "react-native";
import HistoryStyle from '../../Theme/HistoryStyle'
import FastImage from "react-native-fast-image";
import { colors, commonstrings, } from "../../Constant";
import { strings } from "../../Constant/LocalString/LocalizedStrings";
import HomeStyle from "../../Theme/HomeStyle";
import firestore from '@react-native-firebase/firestore';
import CommonStyle from "../../Theme/CommonStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshControl } from "react-native-gesture-handler";
import HeaderOption from "../../Components/HeaderOption";
import { useRoute } from "@react-navigation/native";

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            useArr: [],
            onLoad: true,
            refresh: false,
            lang: '',
        }
    }
    renderItem = (item) => {
        const { lang } = this.state;
        console.log(item, 'history screem')
        return (
            <View style={HistoryStyle.FlatlistData}>
                <View style={HistoryStyle.DataView}>
                    <FastImage
                        style={HistoryStyle.Category}
                        resizeMode={FastImage.resizeMode.contain}
                        source={{ uri: item.item.Image }}

                    />
                </View>
                <View style={HistoryStyle.ImageContainer}>
                    {
                        lang == 'hi' ?
                            <Text style={HistoryStyle.Text}>{item.item.Category_Hi}</Text>
                            :
                            <Text style={HistoryStyle.Text}>{item.item.Category_En}</Text>

                    }
                    {
                        lang == 'hi' ?
                            <Text style={HistoryStyle.Score}>{strings.Label_Scored}{item.item.TotalScore}{strings.Label_OutOf}{item.item.CorrectScore}</Text>
                            :
                            <Text style={HistoryStyle.Score}>{strings.Label_Scored}{item.item.CorrectScore}{strings.Label_OutOf}{item.item.TotalScore}</Text>
                    }


                </View>
            </View>
        );
    }
    async GetHistoryData() {
        const Catarr = [];
        const lang = await AsyncStorage.getItem(commonstrings.ASYNC_LANG_SELECTED);
        // strings.setLanguage(lang)
        this.setState({ lang: lang })
        const User_id = await AsyncStorage.getItem(commonstrings.ASYNC_ID);
        firestore()
            .collection('History')
            .where('User_ID', '==', User_id)
            .get()
            .then(querySnapshot => {
                const size = querySnapshot.size;
                console.log(size, 'data lenght')
                if (size == 0) {
                    this.setState({ useArr: null, onLoad: false, noRecord: true }, () => {
                    })
                } else {
                    querySnapshot.forEach(async DocumentSnapshot => {
                        // console.log(DocumentSnapshot.data(),'data')
                        let cat_id = DocumentSnapshot.data().Category_Id;
                        let Subcat_id = DocumentSnapshot.data().SubCategory_Id;
                        let TotalScore = DocumentSnapshot.data().TotalScore;
                        let CorrectScore = DocumentSnapshot.data().CorrectScore;
                        console.log(cat_id, Subcat_id, TotalScore, CorrectScore)
                        await firestore()
                            .collection('SubCategory')
                            // .where('Category','==',Subcat_id)
                            .get()
                            .then(querySnapshot => {
                                const size = querySnapshot.size;
                                console.log(size, 'SubCategory_Id')
                                if (size == 0) {
                                    this.setState({ useArr: null, onLoad: false, noRecord: true }, () => {
                                    })
                                } else {
                                    querySnapshot.forEach(async DocumentSnapshot => {
                                        if (DocumentSnapshot.id == Subcat_id) {
                                            console.log(DocumentSnapshot.data().Category_Hi, 'particular data')
                                            Catarr.push({
                                                Category_En: DocumentSnapshot.data().Category_En,
                                                Category_Hi: DocumentSnapshot.data().Category_Hi,
                                                Image: DocumentSnapshot.data().Image,
                                                TotalScore: TotalScore,
                                                CorrectScore: CorrectScore,

                                            })
                                            this.setState({ useArr: Catarr, onLoad: false, noRecord: false }, () => {
                                                console.log(this.state.useArr,'console log')
                                            })
                                        }

                                    })
                                }

                            })
                    })
                }
            })
    }
    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.GetHistoryData()
        })
    }
    // componentDidMount = async () => {
    //     console.log('History Page')
    //     const language =  await AsyncStorage.getItem(commonstrings.ASYNC_LANG_SELECTED);
    //     console.log(language,'language')
    //     // strings.setLanguage(language);
    //     const { navigation } = this.props;
    //     // this.focusListener = navigation.addListener('focus', async () => {
    //         console.log('History Page')
    //         const Catarr = [];
    //     const { useArr } = this.state;
    //     const User_id = await AsyncStorage.getItem(commonstrings.ASYNC_ID);

    //     firestore()
    //         // .collection("History_Catechism")
    //         .collection('History')
    //         .where('User_ID', '==', User_id)
    //         .get()
    //         .then(querySnapshot => {
    //             const size = querySnapshot.size;
    //             console.log(size,'history screen')

    //             if (size == 0) {
    //                 this.setState({ useArr: null, onLoad: false, noRecord: true }, () => {
    //                 })

    //             } else {
    //                 querySnapshot.forEach(async DocumentSnapshot => {
    //                     let cat_id = DocumentSnapshot.data().Category_id;
    //                     let Correct = DocumentSnapshot.data().CorrectScore;
    //                     let Total = DocumentSnapshot.data().TotalScore;

    //                     const lang = await AsyncStorage.getItem(commonstrings.ASYNC_LANG_SELECTED)
    //                     if (lang === 'hi') {
    //                         firestore()
    //                             .collection('Category_Catechism')
    //                             .doc('hi')
    //                             .collection('hi')
    //                             .where('Category_id', '==', cat_id)
    //                             .get()
    //                             .then(querySnapshot => {
    //                                 const size = querySnapshot.size;
    //                                 if (size > 0) {
    //                                     querySnapshot.forEach(DocumentSnapshot => {
    //                                         Catarr.push({
    //                                             Category_id: DocumentSnapshot.data().Category_id,
    //                                             Category_name: DocumentSnapshot.data().Category_name,
    //                                             Image: DocumentSnapshot.data().Image,
    //                                             TotalScore: Total,
    //                                             CorrectScore: Correct
    //                                         })
    //                                         this.setState({ useArr: Catarr, onLoad: false, noRecord: false })
    //                                     })
    //                                 }
    //                                 else {
    //                                     this.setState({ useArr: [], onLoad: false, noRecord: true })
    //                                 }
    //                             })
    //                     }
    //                     else {
    //                         firestore()
    //                             .collection('Category_Catechism')
    //                             .doc('en')
    //                             .collection('en')
    //                             .where('Category_id', '==', cat_id)
    //                             .get()
    //                             .then(querySnapshot => {
    //                                 const size = querySnapshot.size;
    //                                 if (size > 0) {
    //                                     querySnapshot.forEach(DocumentSnapshot => {

    //                                         Catarr.push({
    //                                             Category_id: DocumentSnapshot.data().Category_id,
    //                                             Category_name: DocumentSnapshot.data().Category_name,
    //                                             Image: DocumentSnapshot.data().Image,
    //                                             TotalScore: Total,
    //                                             CorrectScore: Correct
    //                                         })

    //                                         this.setState({ useArr: Catarr, onLoad: false, noRecord: false })
    //                                     })
    //                                 }
    //                                 else {
    //                                     this.setState({ useArr: [], onLoad: false, noRecord: true })
    //                                 }
    //                             })
    //                     }
    //                 })
    //             }
    //         });
    //     // });
    // }
    pullMe() {
        const { refresh, lang } = this.state;
        this.setState({ refresh: true })
        setTimeout(() => {
            this.setState({ refresh: false })
        }, 1000)
    }
    render() {
        const { useArr, onLoad, refresh, noRecord } = this.state;
        return (
            <View>
                <StatusBar barStyle="light-content" backgroundColor="blue" translucent={true} />
                <View style={HomeStyle.Header1}>
                    <HeaderOption
                        Menu={false}
                        Title={'History'}
                    />
                </View>
                <View style={HistoryStyle.Flatlist}>
                    {noRecord ?
                        <Text style={CommonStyle.ActivityIndicator}>{strings.CommonLabel_NoDataFound}</Text> :
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                            style={HistoryStyle.Flat}
                            data={useArr}
                            renderItem={(item) => this.renderItem(item)}
                            refreshControl={
                                <RefreshControl
                                    colors={colors.fontBlue}
                                    refreshing={refresh}
                                    onRefresh={() => this.pullMe()}
                                />
                            }
                        />
                    }

                    {
                        onLoad &&
                        <View style={CommonStyle.ActivityIndicator}>
                            <ActivityIndicator size={'large'} color={colors.Blue} />
                        </View>

                    }
                </View>
            </View>
        );
    }
}

export default History;