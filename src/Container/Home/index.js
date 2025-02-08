import React, { useEffect, useState } from 'react'
import CommonStyle from '../../Theme/CommonStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, StatusBar, Text, TouchableOpacity, View, ActivityIndicator, StyleSheet, } from 'react-native'
import FastImage from 'react-native-fast-image';
import { colors, commonstrings, } from '../../Constant';
import { strings } from "../../Constant/LocalString/LocalizedStrings";
import HomeStyle from '../../Theme/HomeStyle';
import RouteName from '../../Config/RouteName';
import firestore from '@react-native-firebase/firestore';
import { RefreshControl } from 'react-native-gesture-handler';
import HeaderOption from '../../Components/HeaderOption';
import { UserContext } from '../../Utils/ContextRouter';
import { heightPercentageToDP as hp, widthPercentageToDP, widthPercentageToDP as wp } from '../../Utils/LayoutMeasurement';


export default class Home extends React.Component {
   
    static contextType = UserContext;
    constructor(props) {
        super(props),
            this.state = {

                Interest: [],
                onLoad: true,
                data: [],
                id: '',
                refresh: false,
                email: '',
                Name: '',
            };
    }

    SeeAll = () => {
        const { data, Interest } = this.state;
        this.props.navigation.navigate(RouteName.Category, { navigateFrom: RouteName.Home, Interest: Interest });
    }

    GetCategory = async () => {
        let dummydata = [];
        await firestore()
            // .collection('Category_Catechism')
            .collection('Category')
            .get()
            .then(QuerySnapshot => {

                const size = QuerySnapshot.size;
                if (size == 0) {
                    this.setState({ data: [], onLoad: false, })
                }
                else {
                    QuerySnapshot.forEach(DocumentSnapshot => {
                        const Category_id = DocumentSnapshot.data().Category_id;
                        for (let i = 0; i <= this.state.Interest.length - 1; i++) {
                            if (this.state.Interest[i] == Category_id) {
                                dummydata.unshift(DocumentSnapshot.data())
                            }
                        }
                        dummydata = [...new Set(dummydata)]
                        this.setState({ data: dummydata, onLoad: false, })
                    })
                }
            })
    }


    async componentDidMount() {
        this.focusListener = this.props.navigation.addListener("focus", async () => {
            console.log('Focus method called' ,'Home Page =====>>>>>>')
            const lang = await AsyncStorage.getItem(commonstrings.ASYNC_LANG_SELECTED)
            const name = await AsyncStorage.getItem(commonstrings.ASYNC_NAME);
            const email = await AsyncStorage.getItem(commonstrings.ASYNC_EMAIL);
            this.setState({ lang: lang })

            firestore()
                // .collection('Users_Catechism')
                .collection('Users')
                .where('Email', '==', email)
                .get()
                .then(QuerySnapshot => {
                    const size = QuerySnapshot.size;
                    //    console.log(size,'data get front the collection') 
                    if (size == 0) {
                        // console.log('No Data found')
                    } else {
                        QuerySnapshot.forEach(DocumentSnapshot => {
                            this.setState({ Name: name, id: DocumentSnapshot.id, Interest: DocumentSnapshot.data().Interest });
                            this.GetCategory();
                        });

                    }
                });
        });

    }
    pullMe() {
        const { refresh } = this.state;
        this.setState({ refresh: true })
        setTimeout(() => {
            this.setState({ refresh: false })
        }, 1000)
    }
    renderItem = ({ item, index }) => {
        console.log(item,'item')
        const { lang } = this.state;
        if (index % 2 == 0) {
            return (

                <TouchableOpacity style={HomeStyle.Data} activeOpacity={0.5} onPress={() => this.props.navigation.navigate(RouteName.SubCategory, { CategoryData: item, })}>
                    <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        style={HomeStyle.ListImage}
                        source={{ uri: item.Image }}
                    />
                    {lang == 'hi' ?
                        <Text style={HomeStyle.CategoryName}>{item.Category_Hi}</Text> :
                        <Text style={HomeStyle.CategoryName}>{item.Category_En}</Text>}
                </TouchableOpacity>

            );
        }


        else {
            return (
                <TouchableOpacity style={HomeStyle.Data1} activeOpacity={0.5} onPress={() => this.props.navigation.navigate(RouteName.SubCategory, { CategoryData: item, })}>
                    <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        style={HomeStyle.ListImage}
                        source={{ uri: item.Image }}
                    />
                    {lang == 'hi' ?
                        <Text style={HomeStyle.CategoryName2}>{item.Category_Hi}</Text> :
                        <Text style={HomeStyle.CategoryName2}>{item.Category_En}</Text>}
                </TouchableOpacity>
            );
        }

    }

    toggleDrawer = () => {  
        this.props.navigation.toggleDrawer();
    };
    render() {
        const { Name, onLoad, data, refresh, noRecord } = this.state;
        return (
            <View style={{flex:1}}>
                <StatusBar barStyle="light-content" translucent={true} />
                <View style={HomeStyle.HeaderHome}>
                    <HeaderOption
                        Menu={false}
                        Title={''}

                    />
                    <Text style={HomeStyle.Welcome}>{strings.Label_WelComeBack}</Text>
                    <Text style={HomeStyle.UserName}>
                        {Name}
                    </Text>
                </View>

                <View style={HomeStyle.Heading}>
                    {/* <HeaderOption/> */}
                    <Text style={HomeStyle.ChooseCategory}>{strings.Label_ChooseCategories}</Text>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.SeeAll()}>
                        <Text style={HomeStyle.SeeAll}>{strings.Label_SeeAll}</Text>
                    </TouchableOpacity>
                </View>
                {data.length == 0 && onLoad ==  false?
                    <Text style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginTop: hp('55'),
                        position: 'absolute',
                        color: colors.DarkBlue
                
                    }}>{strings.CommonLabel_NoDataFound}</Text>
                    :
                    <FlatList
                        style={style.Home}
                        contentContainerStyle={HomeStyle.FlatList}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        scrollEnabled={true}
                        data={data}
                        numColumns={2}
                        refreshControl={
                            <RefreshControl
                                colors={colors.fontBlue}
                                refreshing={refresh}
                                onRefresh={() => this.pullMe()}
                            />
                        }
                        renderItem={(item, index) =>
                            this.renderItem(item, index)}

                    />
                    // </View>
                    }
                {
                    onLoad
                    &&
                    <View style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginTop: hp('55'),
                        position: 'absolute',
                        color: colors.DarkBlue
                
                    }}>
                        <ActivityIndicator size={'large'} color={colors.Blue} />
                    </View>
                }
            </View>
        );
    }
}


const style = StyleSheet.create({
    Home : {
        marginTop : widthPercentageToDP('4'),
        marginBottom : widthPercentageToDP('5')
    }
})  