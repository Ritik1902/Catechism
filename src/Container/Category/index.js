import React from "react";
import { SafeAreaView, Text, View, StatusBar, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { colors, commonstrings, fonts, images, } from "../../Constant";
import { strings } from "../../Constant/LocalString/LocalizedStrings";
import CommonStyle from "../../Theme/CommonStyle";
import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CategoryStyle from "../../Theme/CategoryStyle";
import RouteName from "../../Config/RouteName";
import firestore from '@react-native-firebase/firestore';
import HomeStyle from "../../Theme/HomeStyle";
import Button from "../../Components/Button";
import HeaderScreen from "../../Components/HeaderScreen";
import SettingStyle from "../../Theme/SettingStyle";

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onLoad: true,
            Interest: [],
            Category: [],
            data: [],
            array: [],
            like: [],
            selected: false,
            SignUp  :'',
        }
    }
    handleBackButtonClick = () => {
        this.props.navigation.navigate(RouteName.Drawer)
    }
    async selectedCat(arr) {
        arr.map((item, index) => {
            if (this.state.like.filter(e => e.Category_id === item.Category_id).length > 0) {
                item.isChecked = item.isChecked == null ? true : !item.isChecked
            }
        })
        console.log(arr, 'arr-----after')
        this.setState({ data: arr }, () => {
            console.log(this.state.data)
        })
    }
    onDone = async () => {
        let category = [];
        console.log(this.state.like)
        for (let i = 0; i <= this.state.data.length - 1; i++) {
            if (this.state.data[i].isChecked == true) {
                category.push(this.state.data[i].Category_id)
                console.log(this.state.data[i].Category_id, 'insert category data')

            }
        }
        const id = await AsyncStorage.getItem(commonstrings.ASYNC_ID);
       

        await firestore()
            .collection('Users')
            .doc(id)
            .update({
                Interest: category
            })
            .then(() => {
                this.props.navigation.navigate(RouteName.Drawer)
            })
            this.setState({SignUp : false},()=>{
                console.log(this.state.SignUp ,'signup null value')
            })
    }
    onSelect = (async (Catitem, id) => {
        console.log(Catitem, 'select data')
        this.state.data.map((item, index) => {
            if (Catitem.Category_id == item.Category_id) {
                console.log(this.state.like.filter(e => e.Category_id === item.Category_id), 'if condition')
                if (this.state.like.filter(e => e.Category_id === item.Category_id).length == 0) {
                    this.state.like.push(item.Category_id)
                    item.isChecked = (item.isChecked == null) ? true : !item.isChecked;
                } else {
                    console.log(id, 'else part')
                    let index = this.state.like.indexOf(item.Category_id)
                    this.state.like.splice(index, 1)
                    item.isChecked = false
                }
            }
        })
        this.setState({ like: this.state.like, data: [...this.state.data] })
    })
    async getCategory() {
        let record = [];
        await firestore()
            .collection('Category')
            .get()
            .then(QuerySnapshot => {
                const size = QuerySnapshot.size;
                if (size >= 0) {
                    QuerySnapshot.forEach(DocumentSnapshot => {
                        record.push({ ...DocumentSnapshot.data(), id: DocumentSnapshot.id });
                        this.setState({ data: record, onLoad: false, })
                    });
                }
                else {
                    this.setState({ data: [], onLoad: true })
                }
            });
        let arr = this.state.data.map(item => ({ ...item, isChecked: null }));
        this.selectedCat(arr);
    }
    async componentDidMount() {
        
        try{
            const like = [];
        const like1 = [];
        const lang = await AsyncStorage.getItem(commonstrings.ASYNC_LANG_SELECTED)
        this.setState({ lang: lang })

        if (this.props.route.params.navigateFrom == RouteName.SignUp) {
            this.setState({ SignUp: true })
        }
        else if (this.props.route.params.navigateFrom == RouteName.Home) {
            let like = this.props.route.params.Interest;
            console.log(like)
            const like1 = like.map(item => ({ Category_id: item, isChecked: null }))
            console.log(like1, 'console log data og like1')
            this.setState({ like: like1 })
        }
        this.getCategory();
        }catch(error){
            console.log(error,'error')
        }

    }
    homeRenderItem = (item, index) => {
        
        const { like, lang } = this.state;
        if (index % 2 == 0) {
            return (
                <TouchableOpacity activeOpacity={0.5}
                    style={[CategoryStyle.Data, item.isChecked == true ? CategoryStyle.selected : '']}
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
                <TouchableOpacity style={[CategoryStyle.Data1, item.isChecked == true ? CategoryStyle.selected : '']}
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
    render() {
        const { data, SignUp, onLoad } = this.state;
        return (
            <View>
                <StatusBar barStyle="light-content" backgroundColor="blue" translucent={true} />

                <View style={CommonStyle.HeaderHome}>
                    {SignUp ?
                        <HeaderScreen
                            TextFlag={true}
                            Text={strings.Label_ChooseCategories}
                        /> :
                        <HeaderScreen
                            LeftIcon={images.Arrow}
                            LeftStyle={SettingStyle.ArrowLogo}
                            LeftImgFlag={true}
                            LeftIconClick={() => this.handleBackButtonClick()}
                            TextFlag={true}
                            Text={strings.Label_ChooseCategories}
                        />
                    }
                </View>
                <View style={CommonStyle.Flatlist}>
                    <FlatList
                        contentContainerStyle={{ alignItems: 'center' }}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        style={CategoryStyle.FlatList}
                        data={data}
                        numColumns={2}
                        renderItem={(item, index) => this.homeRenderItem(item.item, item.index)}
                    />
                    {
                        onLoad
                        &&
                        <View style={CategoryStyle.ActivityIndicator}>
                            <ActivityIndicator size={'large'} color={colors.Blue} />
                        </View>
                    }

                </View>

                <Text style={CategoryStyle.TextView}>{strings.CategoryLabel_Line}</Text>

                <Button
                    activeOpacity={0.5}
                    customClick={this.onDone}
                    title={strings.Label_Done}
                />
            </View>

        );
    }
}
export default Category;