import React from "react";
import { commonstrings, images } from "../../Constant";
import { View, Text, Alert, TouchableOpacity, BackHandler, StatusBar } from "react-native";
import {strings} from '../../Constant/LocalString/LocalizedStrings'
import HomeStyle from "../../Theme/HomeStyle";
import Button from "../../Components/Button";
import CommonStyle from "../../Theme/CommonStyle";
import RouteName from "../../Config/RouteName";
import HeaderScreen from "../../Components/HeaderScreen";
import SettingStyle from "../../Theme/SettingStyle";
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import CategoryStyle from '../../Theme/CategoryStyle';
import FastImage from "react-native-fast-image";

export default class SubCategory extends React.Component {
    constructor(props) {
        super(props),
            this.state = {
                data: [],
            };
    }
    async componentDidMount() {
        const lang = await AsyncStorage.getItem(commonstrings.ASYNC_LANG_SELECTED)
        this.setState({ lang: lang })
        let CategoryData = this.props.route.params.CategoryData;

        await firestore().collection('Category')
            .where('Category_En', '==', CategoryData.Category_En)
            .get()
            .then((doc) => {
                console.log(doc,'dpc')
                doc.forEach((queryDocumentSnapshot) => {
                    this.setState({ _id: queryDocumentSnapshot.id })
                })
            })
        this.getSubCategory();
    }
    async getSubCategory() {
        const { _id } = this.state;
        await firestore()
            .collection('SubCategory')
            .where('Category_Id', '==', _id)
            .onSnapshot(this.onResult, this.onError);
    }
    onResult = async (querySnapshot) => {
        let { data } = this.state;

        querySnapshot.forEach((doc) => {
            data.push({
                ...doc.data(),
                SubCategory_Id: doc.id
            })

            this.setState({ data: data })
        })
    };
    onError = async (error) => {
        Alert.alert('data not found')
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

    renderItem = (item, index) => {
        const { lang } = this.state;
        if (index % 2 == 0) {
            return (
                <TouchableOpacity activeOpacity={0.5}
                    style={[CategoryStyle.Data,]}
                    onPress={() => this.onSelect(item, index)
                    }>
                    <FastImage
                        style={HomeStyle.ListImage}
                        resizeMode={FastImage.resizeMode.contain}
                        source={{ uri: item.Image }}
                    />
                    {lang == 'hi' ?
                        <Text style={HomeStyle.CategoryName}>{item.Category_Hi}</Text> :
                        <Text style={HomeStyle.CategoryName}>{item.Category_En}</Text>}
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity style={[CategoryStyle.Data1,]}
                    activeOpacity={0.5} onPress={() => this.onSelect(item, index)}>
                    <FastImage style={HomeStyle.ListImage}
                        resizeMode={FastImage.resizeMode.contain}
                        source={{ uri: item.Image }} />
                    {lang == 'hi' ?
                        <Text style={HomeStyle.CategoryName2}>{item.Category_Hi}</Text> :
                        <Text style={HomeStyle.CategoryName2}>{item.Category_En}</Text>}
                </TouchableOpacity>
            );
        }
    }
    onSelect(item, index) {
        this.props.navigation.navigate(RouteName.Quiz, { CategoryData: item, })
    }
    render() {
        const { data } = this.state;
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
                        Text={strings.CategoryLabel_Subcategory}
                    />
                </View>
                <View style={CategoryStyle.CommonContainer}>
                    <FlatList
                        contentContainerStyle={{ alignItems: 'center' }}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        style={CategoryStyle.FlatList}
                        data={data}
                        numColumns={2}
                        renderItem={(item, index) => this.renderItem(item.item, item.index)}
                    />
                </View>
            </View>
        );
    }
}