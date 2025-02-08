import React, { useContext, useEffect, useRef, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View, Image, Animated, StyleSheet, StatusBar, Alert, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import { colors, commonstrings, fonts, images, } from '../../Constant';
import { strings } from "../../Constant/LocalString/LocalizedStrings";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../Utils/LayoutMeasurement';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../Container/Home';
import Profile from '../../Container/Profile';
import LeaderBoard from '../../Container/LeaderBoard';
import History from '../../Container/History';
import ImageView from '../Image';
import RouteName from '../../Config/RouteName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation, CommonActions, NavigationContainer } from '@react-navigation/native';
import { UserContext } from '../../Utils/ContextRouter';
import HeaderScreen from '../HeaderScreen';
import { on } from 'npm';
import { useRoute } from '@react-navigation/native';
import callAlert from '../../Utils/Alert';
import UpdateProfile from '../../Container/Profile/UpdateProfile';
import { createStackNavigator , TransitionPresets} from '@react-navigation/stack';


const Menus = [
    { name: RouteName.Home, icon: images.Home },
    { name: RouteName.History, icon: images.History },
    { name: RouteName.LeaderBoard, icon: images.Trophy },
    { name: RouteName.Profile, icon: images.User },
    { name: RouteName.Setting, icon: images.Setting },
    // { name: RouteName.Refer, icon: images.link },
    // { name: RouteName.Friend, icon: images.AddFriend },

]
const stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MyTabBar({ state, descriptors, navigation }) {
    const route = useRoute();
    console.log(route.name, 'abc==>RoputeNAMe')
    const { SelectedMenuItem, setSelectedMenuItem } = useContext(UserContext)
   if(route.name == RouteName.Home) {
    setSelectedMenuItem('')
   }
    return (
        <View style={style.Bottom}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const renderImage = () => {
                    switch (index) {
                        case 0:
                            return images.Home;
                            break;
                        case 1:
                            return images.History;
                            break;
                        case 2:
                            return images.Trophy;
                            break;
                        case 3:
                            return images.User;
                            break;
                        case 4:
                            return images.Setting;
                            break;
                        default:
                            break;
                    }

                }
                const isFocused = state.index === index;
                const onPress = () => {
                    console.log(route.name, 'routeName==')
                    console.log(RouteName.History, 'ROUTENAME===')
                    if (route.name == RouteName.Home) {
                        setSelectedMenuItem('')
                    } else if (route.name == RouteName.History) {
                        setSelectedMenuItem(RouteName.History)
                        console.log(SelectedMenuItem, 'abc')
                    } else if (route.name == RouteName.LeaderBoard) {
                        setSelectedMenuItem(RouteName.LeaderBoard)
                        console.log(SelectedMenuItem, 'abc1')
                    } else if (route.name == RouteName.Profile) {
                        setSelectedMenuItem(RouteName.Profile)
                        console.log(SelectedMenuItem, 'abc2')
                    }
                    else {
                        SelectedMenuItem('')
                    }
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name)
                    }
                };
                return (
                    <TouchableOpacity
                        accessibilityRole='button'
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={{ flex: 1 }}
                    >
                        <ImageView Source={renderImage()} focused={isFocused} />
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

const OnProfile = () => {
    <NavigationContainer>
    <stack.Navigator
        initialRouteName={RouteName.Profile}
        screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
            headerMode: 'screen',
        }}
    >
        <stack.Screen name={RouteName.Profile} component={Profile} options={{headerShown : false}}/>
        <stack.Screen name={RouteName.UpdateProfile} component={UpdateProfile} options={{headerShown : false}}/>
    </stack.Navigator>
    </NavigationContainer>
}
const BottomTab = () => {
    const { SelectedMenuItem, setSelectedMenuItem } = useContext(UserContext)
    // setSelectedMenuItem('')
    return (

        <Tab.Navigator
            tabBar={(props) => <MyTabBar{...props} />}
            initialRouteName={RouteName.Home}
            screenOptions={{
                headerShown: false,

            }}
        >
            <Tab.Screen name={RouteName.Home} component={Home} options={{ headerShown: false }} />
            <Tab.Screen name={RouteName.History} component={History} options={{ headerShown: false }} />
            <Tab.Screen name={RouteName.LeaderBoard} component={LeaderBoard} options={{ headerShown: false }} />
            <Tab.Screen name={RouteName.Profile} component={Profile} options={{ headerShown: false }} />
            {/* <Tab.Screen name={RouteName.UpdateProfile} component={UpdateProfile} options={{ headerShown: false }} /> */}
        </Tab.Navigator>

    )
}

export default BottomTab;
const clearAll = async (navigation) => {

    try {
        const SignInData = await AsyncStorage.getItem(commonstrings.ASYNC_SIGNIN_DATA);
        console.log(SignInData, 'AsyncData');
        await AsyncStorage.removeItem(commonstrings.ASYNC_EMAIL);
        await AsyncStorage.removeItem(commonstrings.ASYNC_NAME);
        await AsyncStorage.removeItem(commonstrings.ASYNC_PROFILE);
        // await AsyncStorage.removeItem(commonstrings.ASYNC_AUTH_LOGIN);
        console.log(await AsyncStorage.getItem(commonstrings.ASYNC_ID), 'login id ')
        // await AsyncStorage.removeItem(commonstrings.ASYNC_CATEGORY_SELECTED);
        const SDATA = await AsyncStorage.removeItem(commonstrings.ASYNC_SIGNIN_DATA);


        callAlert(strings.Logout_Label, 3, strings.YES_ONLY, async () => {
            await AsyncStorage.removeItem(commonstrings.ASYNC_ID)
            const resetAction = CommonActions.reset({
                index: 1,
                routes: [
                    { name: RouteName.SignIn },
                ],
            })
            navigation.dispatch(resetAction)
        }, strings.NO, true, () => { })
        // navigation.dispatch(
        //     CommonActions.reset({
        //         index: 1,
        //         routes: [
        //             { name: RouteName.SignIn },
        //         ],
        //     })
        // );
    } catch (e) {
        return false;
    }
}

// export default Drawer = (props) => {

//     const [name, setName] = useState('');
//     const getNameFunction = async () => {
//         await AsyncStorage.getItem(commonstrings.ASYNC_NAME).then(
//             (value) => setName(value)
//         );
//     };
//     const [updateprofile, setUpdateprofile] = useState('');
//     const getProfileFunction = async () => {
//         await AsyncStorage.getItem(commonstrings.ASYNC_PROFILE).then(
//             (value) => setUpdateprofile(value)
//         );
//     };

//     const navigation = useNavigation();
//     const [showMenu, setShowMenu] = useState(false);
//     const MovetoRight = useRef(new Animated.Value(0)).current;
//     const scale = useRef(new Animated.Value(1)).current;

//     const { SelectedMenuItem, setSelectedMenuItem } = useContext(UserContext)

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', () => {
//             getNameFunction()
//             getProfileFunction()
//             console.log(SelectedMenuItem,'selected RouteNAme===')
//         })
//         return unsubscribe

//     }, [SelectedMenuItem]);
//     const onAnimatedDrawer = () => {
//         Animated.timing(scale, {
//             toValue: showMenu ? 1 : 0.80,
//             duration: 300,
//             useNativeDriver: true
//         }).start();
//         Animated.timing(MovetoRight, {
//             toValue: showMenu ? 0 : 250,
//             duration: 300,
//             useNativeDriver: true
//         }).start();
//         setShowMenu(!showMenu)
//     }
//     return (
//         <View style={{ flex: 1 }}>
//             {/* menu designs */}
//             <View style={style.container}>
//                 <View style={style.MainView}>
//                     <View style={style.ImageView}>
//                         <FastImage
//                             style={style.Avatar}
//                             source={{ uri: updateprofile }}
//                             resizeMode={FastImage.resizeMode.contain} />
//                     </View>
//                     <Text style={style.userName}> {name}</Text>
//                 </View>
//                 <View
//                     style={style.Header}
//                 />
//                 <FlatList
//                     bounces={false}
//                     data={Menus}
//                     renderItem={({ item, index }) => {
//                         return (
//                             <View>
//                                 <TouchableOpacity activeOpacity={1}
//                                     onPress={() => {
//                                         item.name == RouteName.Home ?
//                                             [navigation.navigate(RouteName.Home), onAnimatedDrawer(), setSelectedMenuItem('')] :
//                                             item.name == RouteName.History ?
//                                                 [navigation.navigate(RouteName.History), onAnimatedDrawer(), setSelectedMenuItem(RouteName.History)] :
//                                                 item.name == RouteName.LeaderBoard ?
//                                                     [navigation.navigate(RouteName.LeaderBoard), onAnimatedDrawer(), setSelectedMenuItem(RouteName.LeaderBoard)] :
//                                                     item.name == RouteName.Profile ?
//                                                         [navigation.navigate(RouteName.Profile), onAnimatedDrawer(), setSelectedMenuItem(RouteName.Profile)] :
//                                                         item.name == RouteName.Setting ?
//                                                             [navigation.navigate(RouteName.Setting), onAnimatedDrawer(), setSelectedMenuItem('')] :
//                                                         // item.name == RouteName.Demo ? 
//                                                         //     [navigation.navigate(RouteName.Demo), onAnimatedDrawer(), setSelectedMenuItem(RouteName.Demo)] :
//                                                         //     item.name == RouteName.Friend ?
//                                                         //     [navigation.navigate('/'), onAnimatedDrawer(), setSelectedMenuItem('')] :
//                                                             null
//                                     }}

//                                     style={style.Touchable}>
//                                     <FastImage
//                                         tintColor={colors.DrawerIcon}
//                                         resizeMode={FastImage.resizeMode.contain}
//                                         style={style.icon} source={item.icon} />
//                                     <Text style={style.Name}>{item.name}</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         );
//                     }}
//                 />
//                 <View style={style.Header1} />
//                 <TouchableOpacity activeOpacity={1} onPress={() => clearAll(navigation)}>
//                     <View style={{ bottom: 35, borderColor: colors.DrawerBorder, flexDirection: 'row', height: hp('9'), width: hp('25'), marginLeft: wp('3'), alignItems: 'center' }}>
//                         <FastImage
//                             tintColor={colors.DrawerIcon}
//                             style={style.DrawerIcon}
//                             resizeMode={FastImage.resizeMode.contain}
//                             source={images.OnOff}
//                         />
//                         <Text style={style.Logout}>{strings.HeaderScreenLabel_LogOut}</Text>
//                     </View>
//                 </TouchableOpacity>

//             </View>


//             <Animated.View
//                 style={{
//                     flex: 1,
//                     backgroundColor: colors.DarkBlue,
//                     position: 'absolute',
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     top: 0,
//                     borderRadius: showMenu ? 30 : 0,
//                     transform: [{ scale: scale }, { translateX: MovetoRight }],
//                 }}>

//                 <View style={style.AnimatedView}>
//                     <HeaderScreen
//                         LeftIcon={images.Menu}
//                         LeftIconClick={() => {
//                             Animated.timing(scale, {
//                                 toValue: showMenu ? 1 : 0.80,
//                                 duration: 300,
//                                 useNativeDriver: true
//                             }).start();
//                             Animated.timing(MovetoRight, {
//                                 toValue: showMenu ? 0 : 250,
//                                 duration: 300,
//                                 useNativeDriver: true
//                             }).start();
//                             setShowMenu(!showMenu)
//                         }}
//                         LeftImgFlag={true}
//                         TextFlag={true}
//                         RightImgFlag={true}
//                         RightIcon={images.Notification}
//                         Text={SelectedMenuItem}
//                         RightIconClick={() => { Alert.alert('Coming soon!') }}
//                     />

//                 </View>
//                 <BottomTab />
//             </Animated.View>
//         </View >
//     );
// };


const style = StyleSheet.create({
    Border: {
        marginTop: hp('3'),
        marginLeft: wp('2'),
        height: hp('0.3'),
        width: Platform.isPad ? wp('25') : wp('55'),
        backgroundColor: colors.DrawerBorder
    },
    userName: {
        color: colors.White,
        marginLeft: wp('2'),
        fontSize: fonts.FONT_16,
        fontWeight: 'bold'
    },
    Avatar: {
        height: hp('6'),
        borderRadius: hp('6'),
        width: hp('6'),
        resizeMode: 'contain'
    },
    MainView: { width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 65, },
    ImageView: {
        height: hp('6'),
        width: hp('6'),
        marginLeft: wp('4'),
        borderRadius: 35,
        backgroundColor: colors.White,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Header1: {
        bottom: 29,
        marginLeft: wp('2'),
        height: hp('0.3'),
        width: Platform.isPad ? wp('27') : wp('55'),
        backgroundColor: colors.DrawerBorder
    },
    Header: {
        marginTop: hp('2.5'),
        marginLeft: wp('2'),
        height: hp('0.3'),
        width: Platform.isPad ? wp('25') : wp('55'),
        backgroundColor: colors.DrawerBorder
    },
    Name: {
        marginLeft: wp('3'),
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: fonts.FONT_14,
        color: colors.White
    },
    Touchable: {
        width: wp('50'),
        height: hp('6'),
        marginLeft: wp('4'),
        marginTop: hp('1'),
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        height: hp('3'),
        width: wp('6'),
        marginLeft: wp('2'),
    },
    DrawerIcon: {
        height: hp('4'),
        width: wp('5'),
        marginLeft: wp('2'),
    },
    menu: {
        color: colors.White,
        fontWeight: 'bold',
        fontSize: fonts.FONT_18,
        alignSelf: 'center'
    },
    Logout: {
        marginLeft: wp('3'), textAlign: "center", fontWeight: 'bold',
        fontSize: fonts.FONT_14, color: colors.White
    },
    AnimatedView: {
        marginBottom: hp('0.5'),
        // bottom:7
    },
    FlatIcon: {
        height: hp(2.1),
        width: wp(5),
        alignSelf: 'center',
    },
    Bottom: {
        // flex : 1,
        // justifyContent:"center",
        // alignContent:"center",
        // alignItems:"center",
        flexDirection: 'row',
        height: hp('9'),
        // backgroundColor :"red",
        backgroundColor: colors.DarkBlue,
        // borderBottomLeftRadius: 30,
    },
    Text: {
        color: colors.White,
        alignSelf: 'center',
        marginVertical: wp('-1.5'),
        marginLeft: wp(1),
        fontSize: 12,
        marginBottom: wp('2'),

    },
    container: {
        flex: 1,
        backgroundColor: colors.NavyBlue
    },
})