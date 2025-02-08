import React from 'react'
import { ActivityIndicator, Alert, FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProfileImage from '../../Components/ProfileImage';
import { colors, } from '../../Constant';
import { strings } from "../../Constant/LocalString/LocalizedStrings";
import CommonStyle from '../../Theme/CommonStyle';
import HomeStyle from '../../Theme/HomeStyle';
import LeaderBoardStyle from '../../Theme/LeaderBoardStyle';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from '../../Utils/LayoutMeasurement';
import HeaderOption from '../../Components/HeaderOption';
import { BackHandler } from 'react-native';


export default class LeaderBoard extends React.Component {
    constructor(props) {
        super(props),
        
            this.state = {
                Top3: [],
                onLoad: true,
                Top1: [],
                Lead: [],
                show: false,
                count: '',
            };
    }
    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("focus", async () => {
            this.LeaderBoardData();
        })
        
    }

    UNSAFE_componentWillMount () {
        BackHandler.addEventListener('hardwareBackPress',this.handlebackButtonClick);
    }

    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress',this.handlebackButtonClick);
    }

    handlebackButtonClick () {
        // this.props.navigation.goBack();
        console.log('called back on leaderboard')
        
    }
    LeaderBoardData() {
        let v1 = [];
        let v2 = [];
        let v3 = [];
        let TopUser = [];
        firestore()
            .collection('Users')
            .orderBy('Score', 'desc')
            .get()
            .then(QuerySnapshot => {
                const size = QuerySnapshot.size;
                console.log(size, 'querysnapshot')
                if (size > 0) {
                    QuerySnapshot.forEach(async DocumentSnapshot => {
                        TopUser.push({ ...DocumentSnapshot.data(), id: DocumentSnapshot.id })
                        v3 = TopUser.slice(0);
                        v1 = TopUser.slice(1, 3);
                        v2 = TopUser.slice(3);
                        console.log(v2,'v2')
                        this.setState({ Top3: v1, Top1: v3, onLoad: false, Lead: v2 },()=>{
                            console.log(this.state.Top3,'top3')
                            
                        })
                    })
                }
                else {
                    this.setState({ Top3: [], onLoad: false },()=>{
                        console.log(this.state.Top3,'top3')
                    })
                }
            })
    }
    render() {
        const { Top3, Lead, Top1, onLoad, count } = this.state;
        return (

            <View style={{flex :1}}>
                <StatusBar barStyle="light-content" translucent={true} />
                <View style={LeaderBoardStyle.Header}>
                    <HeaderOption
                        Title={strings.LeaderBoardLabel_LeaderBoard}
                    />
                    {Top1.map((item, index) => {
                        // const Name = item.Name.substring(0, item.Name.indexOf(' '))
                        let Name = item.Name;
                        if(item.Name.substring(0, item.Name.indexOf(' '))){
                            Name = item.Name.substring(0, item.Name.indexOf(' '));
                        }else {
                            Name = item.Name;
                        }

                        if (index == 0) {
                            return (
                                <>
                                    <View>
                                        <ProfileImage
                                            ZicZac={LeaderBoardStyle.MiddleImg}
                                            tintColor={colors.Green}
                                            pointUppar={true}
                                            text={index + 1}
                                            ImageStyle={LeaderBoardStyle.LeaderBoard_InnerImage}
                                            Image={item.Profile}
                                            OutsideImage={LeaderBoardStyle.LeaderBoard_OutsideImage2}
                                        />
                                        <Text style={LeaderBoardStyle.BtScoreStyle}>{item.Score}</Text>
                                        <Text style={LeaderBoardStyle.NameStyle}>{Name}</Text>
                                    </View>
                                </>
                            )
                        }
                    })}
                    <View style={LeaderBoardStyle.LeaderBoard_Container}>
                        {
                            
                            Top3.map((item, index) => {
                                // const Name = item.Name;
                                let Name = '';
                                if(item.Name.substring(0, item.Name.indexOf(' '))){
                                    Name = item.Name.substring(0, item.Name.indexOf(' '));
                                    console.log(Name,'if condition===>')
                                }else{
                                    Name = item.Name;
                                }
                                // const Name = item.Name.substring(0, item.Name.indexOf(' '))
                                console.log(Name,'Name');
                                if (index == 0) {
                                    return (
                                        <>
                                            <View>
                                                <ProfileImage
                                                    tintColor={colors.Orange}
                                                    pointUppar={true}
                                                    text={index + 2}
                                                    Image={item.Profile}
                                                    OutsideImage={LeaderBoardStyle.LeaderBoard_OutsideImage}
                                                />
                                                <Text style={LeaderBoardStyle.ScoreStyle}>{item.Score}</Text>
                                                <Text style={LeaderBoardStyle.NameStyle}>{Name}</Text>
                                            </View>
                                        </>
                                    )
                                } else if (index == 1) {
                                    return (
                                        <>
                                            <View>
                                                <ProfileImage
                                                    tintColor={colors.SkyBlue}
                                                    pointUppar={true}
                                                    text={index + 2}
                                                    Image={item.Profile}
                                                    OutsideImage={LeaderBoardStyle.LeaderBoard_OutsideImage3}
                                                />
                                                <Text style={LeaderBoardStyle.ScoreStyle}>{item.Score}</Text>
                                                <Text style={LeaderBoardStyle.NameStyle}>{Name}</Text>
                                            </View>
                                        </>
                                    )
                                } else {
                                    return (
                                        <Text>{strings.CommonLabel_NoDataFound}</Text>
                                    )
                                }

                            })
                        }
                    </View>
                </View>
                {
                    Lead.length == 0 && Top1.length == 0 && Top3.length == 0 && onLoad == false ?
                        <>
                            <View style={{ justifyContent: "center", alignItems: 'center', alignContent: 'center', marginTop: heightPercentageToDP('20') }}>
                                <Text style={{ color: colors.Blue }}>No Record Found</Text>
                            </View>
                        </> :
                        <>
                            <View style={{flex : 1}}>
                            <FlatList
                                style={style.FlatlistContainer}
                                data={Lead}
                                bounces={false}
                                scrollEnabled={true}
                                contentContainerStyle={HomeStyle.FlatList}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={LeaderBoardStyle.LeaderBoard_Flatlist}>
                                            <View style={LeaderBoardStyle.flexDirection}>
                                                <Text style={LeaderBoardStyle.LeaderBoard_ID}>{index + 4}</Text>
                                                <FastImage
                                                    source={{ uri: item.Profile }}
                                                    style={LeaderBoardStyle.LeaderBoard_FlatlistImg}
                                                    resizeMode={FastImage.resizeMode.contain}
                                                />
                                                <Text style={LeaderBoardStyle.FlatlistName} >{item.Name}</Text>
                                            </View>
                                            <Text style={LeaderBoardStyle.LeaderBoard_Point}>{item.Score ? item.Score : 0}</Text>
                                        </View>
                                    );
                                }} />
                                </View>
                        </>
                }
                {onLoad ?
                    <View style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginTop: hp('55'),
                        position: 'absolute',
                        color: colors.DarkBlue
                    }}>
                        <ActivityIndicator size={'large'} color={colors.Blue} />
                    </View>
                    :
                    null
                }
            </View >
        );
    }
}



const style = StyleSheet.create({
    FlatlistContainer : {
        marginTop : wp('1.5'),
        marginBottom : wp('2')
    }
})

