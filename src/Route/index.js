import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RouteName from '../Config/RouteName'
import Slider from '../Container/Slider';
import Dashboard from '../Container/Dashboard';
import SignIn from '../Container/Auth/SignIn'

import ForgotPwd from '../Container/Auth/ForgotPwd';
import { StyleSheet } from 'react-native';
import { images, colors, font } from '../Constant';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../Utils/LayoutMeasurement';
import Result from '../Container/Result';
import Quiz from '../Container/Home/Quiz';
import QuizQue from '../Container/Home/QuizQue';
import Setting from '../Container/Setting';
import Category from '../Container/Category';
import UpdateProfile from '../Container/Profile/UpdateProfile';
import Drawer from '../Components/Drawer';
import Refer from '../Container/Refer';
import SubCategory from '../Container/SubCategory';
import SignUp from '../Container/Auth/SignUp';
import BottomTab from '../Components/Drawer';
import Profile from '../Container/Profile';

const Stack = createStackNavigator();

const theme = {
    colors: {
        background: colors.White,
    },
};

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={RouteName.Dashboard}
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                    gestureDirection: 'horizontal',
                    ...TransitionPresets.SlideFromRightIOS,
                    headerMode: 'screen',
                }}
            >
                <Stack.Screen name={RouteName.Dashboard} component={Dashboard} options={{ headerShown: false }} />
                <Stack.Screen name={RouteName.Slider} component={Slider} options={{ headerShown: false }} />
                <Stack.Screen name={RouteName.Quiz} component={Quiz} options={{ headerShown: false }} />
                <Stack.Screen name={RouteName.UpdateProfile} component={UpdateProfile} options={{ headerShown: false }} />
                <Stack.Screen name={RouteName.SignIn} component={SignIn} options={{ headerShown: false }} />
                <Stack.Screen name={RouteName.SignUp} component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name={RouteName.ForgotPwd} component={ForgotPwd} options={{ headerShown: false }} />
                <Stack.Screen name={RouteName.Drawer} component={BottomTab} options={{ headerShown: false }} />
                {/* <Stack.Screen name={RouteName.Drawer} component={Drawer} options={{ headerShown: false }} /> */}
                <Stack.Screen name={RouteName.QuizQue} component={QuizQue} options={{ headerShown: false }} />
                <Stack.Screen name={RouteName.Result} component={Result} options={{ headerShown: false }} />
                <Stack.Screen name={RouteName.Category} component={Category} options={{ headerShown: false }} />
                <Stack.Screen name={RouteName.Setting} component={Setting} options={{ headerShown: false }} />
                <Stack.Screen name={RouteName.SubCategory} component={SubCategory} options={{ headerShown: false }} />
                {/* <Stack.Screen name={RouteName.Profile} component={Profile} options={{ headerShown: false }} /> */}
                {/* <Stack.Screen name={RouteName.Refer} component={Refer} options={{headerShown : false}}/> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Router;

const style = StyleSheet.create({
    Bottom: {
        flexDirection: 'row',
        height: hp('10'),
        backgroundColor: colors.DarkBlue,
    },
    Text: {
        color: colors.White,
        alignSelf: 'center',
        marginVertical: wp('-1.5'),
        marginLeft: wp(1),
        fontSize: 12,
        marginBottom: wp('2'),
    }
})