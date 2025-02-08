import React, {useContext} from "react";
import { StyleSheet, TouchableOpacity, View,Text } from "react-native";
import FastImage from "react-native-fast-image";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../../Utils/LayoutMeasurement";
import { colors, images,fonts } from "../../Constant";
import { UserContext } from "../../Utils/ContextRouter";
import RouteName from "../../Config/RouteName";



const HeaderOption = (props) => {
    const { SelectedMenuItem, setSelectedMenuItem } = useContext(UserContext)
    return (
        <View style={style.Container}>
            <TouchableOpacity onPress={()=>{'/'}} activeOpacity={1}>
                {props.Menu ? 
                    <View style={style.Menu}>
                    <FastImage
                        source={images.Menu}
                        tintColor={colors.White}
                        style={style.Image}
                        resizeMode="contain"
                    />
                </View>
                : 
                <View style={style.Menu1}>
                    <FastImage
                        source={''}
                        tintColor={colors.White}
                        style={style.Image}
                        resizeMode="contain"
                    />
                </View>
                }
            
            </TouchableOpacity>
            <Text style={style.Title}>{props.Title ? props.Title : ''}</Text>
            <TouchableOpacity onPress={()=>{'/'}} activeOpacity={1}>
            <View style={style.Menu}>
                <FastImage
                    source={props.lefticon == 'isFocused' ? images.Notification : images.Notification}
                    tintColor={colors.White}
                    style={style.Image}
                    resizeMode="contain"
                />
            </View>
            </TouchableOpacity>
        </View>
    );
}

export default HeaderOption;

const style = StyleSheet.create({
    Container :{
        height: hp('6'),
        width : wp('90'),
        flexDirection : "row",
        marginTop : wp('12'),
        alignSelf : 'center',
        justifyContent : "space-between",
        alignItems:'center'
    
    },
    Menu : {
        height : hp('5.2'),
        width : wp('11'),
        backgroundColor : colors.HomeBtn,
        borderRadius : 10,
        justifyContent : "center",
        alignItems : 'center',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('-0.7'),
        elevation: 24,
        
    },
    Menu1 : {
        height : hp('5.2'),
        width : wp('11'),
        backgroundColor : colors.DarkBlue,
        borderRadius : 10,
        justifyContent : "center",
        alignItems : 'center',
    },
    Image : {
        height : hp('2.1'),
        width : wp('5')
    },
    Title :{
        fontFamily: fonts.Inter_SemiBold,
        color: colors.White,
        fontSize: fonts.FONT_18,
        alignItems: 'center',
    }
})