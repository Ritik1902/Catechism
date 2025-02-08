import React from 'react';
import { StyleSheet, View, Text,Image } from 'react-native';
import { colors, fonts, images } from '../../Constant';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../Utils/LayoutMeasurement';
import FastImage from 'react-native-fast-image';
import LeaderBoardStyle from '../../Theme/LeaderBoardStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Platform } from 'react-native';


// import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import { colors, fonts, images } from '../../Constant';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../Utils/LayoutMeasurement';
// import FastImage from 'react-native-fast-image';

const ProfileImage = props => {
    return (
        <View>
            {props.profile ? null :
                Platform.OS == 'ios' ? <FastImage
                source={images.ZicZac}
                resizeMode={FastImage.resizeMode.contain}
                style={[styles.ZicZacImg, props.ZicZac]}
                tintColor={props.tintColor}
                defaultSource={images.Man}
                
            />:
                <Image
                    source={images.ZicZac}
                    resizeMode={FastImage.resizeMode.contain}
                    style={[styles.ZicZacImg1, props.ZicZac, ]}
                    tintColor={props.tintColor}
                    defaultSource={images.Man}
                    
                />}
            <View style={[styles.FlatListImage, props.OutsideImage]}>
                <View style={[styles.FlatListImageUnder, props.InnerImage]}>
                    <FastImage
                        style={[styles.Image, props.ImageStyle]}
                        defaultSource={images.Man}
                        resizeMode={FastImage.resizeMode.cover}
                        source={{ uri: props.Image }} />
                    {props.pointUppar ?
                        <View style={styles.design}>
                            <Text style={styles.text}>{props.text}</Text>

                        </View> :
                        null}
                    {props.pointDown ?
                        <FastImage
                            resizeMode={FastImage.resizeMode.contain}
                            tintColor={colors.White}
                            style={styles.BadgeImage}
                            source={images.Hexagon} >
                            <FastImage
                                resizeMode={FastImage.resizeMode.contain}
                                tintColor={colors.Blue}
                                style={styles.BadgeImage2}
                                source={images.Hexagon} >
                                <FastImage
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={styles.BadgeTrophy}
                                    tintColor={colors.Yellow}
                                    source={images.validity} />
                            </FastImage>
                        </FastImage>
                        : null}
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    ZicZacImg: {
        height: hp('11.5'),
        width: wp('27'),
        top: hp('14'),
        position: 'absolute',
        alignSelf: 'center'
    },
    ZicZacImg1: {
        height: hp('11.5'),
        width: wp('27'),
        top: hp('14'),
        position: 'absolute',
        alignSelf: 'center'
    },
    BadgeTrophy: {
        alignSelf: 'center',
        top: hp('3'),
        height: hp('4'),
        width: wp('7'),
    },
    BadgeImage2: {
        alignItems: 'center',
        height: hp('10'),
        width: wp('11'),
        shadowColor: colors.ProfileBadge,
        shadowOpacity: 3,
    },
    BadgeImage: {
        alignItems: 'center',
        height: hp('10'),
        width: wp('12'),
        position: 'absolute',
        left: hp('12'),
        top: hp('9')
    },
    text: {
        alignSelf: 'center',
        paddingVertical: hp('1'),
        color: colors.Orange,
        fontWeight: '800'
    },
    FlatListImage: {
        borderRadius: hp('10'),
        backgroundColor: colors.BlueText,
        height: hp('13'),
        width: hp('13'),
        alignItems: 'center',
        alignSelf: 'center',
        top: hp('2'),
        shadowOpacity: 0.4,
        shadowOffset:{
            width:0.01,
            height:0.1,
        }      
    },
    FlatListImageUnder: {
        borderRadius: hp('10'),
        height: hp('12'),
        width: hp('12'),
        marginVertical: hp('0.5'),       
    },
    Image: {
        width: hp('11.8'),
        height: hp('11.8'),
        borderRadius: hp('11.8')/2,
        alignSelf: 'center',
    },
    design: {
        width: hp('4'),
        left: hp('-1.5'),
        height: hp('4'),
        backgroundColor: 'yellow',
        borderRadius: wp('4'),
        position: 'absolute',
        shadowOffset: {
            width: 1,
            height: 0,
        },
        shadowOpacity: wp('0.05'),
        shadowRadius: wp('-0.7'),
        elevation: 24,
    },
});
export default ProfileImage;
// const ProfileImage = props => {
//     return (
//         <View style={[styles.FlatListImage, props.OutsideImage]}>
//             <View style={[styles.FlatListImageUnder, props.InnerImage]}>
//                 {props.profile ? null :
//                     <FastImage
//                         source={images.ZicZac}
                        
//                         resizeMode={FastImage.resizeMode.contain}
//                         style={[styles.ZicZacImg, props.ZicZac]}
//                         tintColor={props.tintColor}
//                     />}
//                 <FastImage
//                     style={[styles.Image, props.ImageStyle]}
//                     resizeMode={FastImage.resizeMode.cover}
//                     defaultSource={images.Man}
//                     source={{ uri: props.Image }} />

//                 {props.pointUppar ?
//                     <View style={styles.design}>
//                         <Text style={styles.text}>{props.text}</Text>

//                     </View> :
//                     null}
//                 {props.pointDown ?
//                     <FastImage
//                         resizeMode={FastImage.resizeMode.contain}
//                         tintColor={colors.White}
//                         style={styles.BadgeImage}
//                         source={images.Hexagon} >
//                         <FastImage
//                             resizeMode={FastImage.resizeMode.contain}
//                             tintColor={colors.Blue}
//                             style={styles.BadgeImage2}
//                             source={images.Hexagon} >
//                             <FastImage
//                                 resizeMode={FastImage.resizeMode.contain}
//                                 style={styles.BadgeTrophy}
//                                 tintColor={colors.Yellow}
//                                 source={images.validity} />
//                         </FastImage>
//                     </FastImage>
//                     : null}
//             </View>
//         </View>

//     );
// };

// const styles = StyleSheet.create({
//     ZicZacImg: {
//         height: hp('11.5'),
//         width: wp('27'),
//         top: hp('7'),
//         position: 'absolute',
//         alignSelf: 'center'
//     },
//     BadgeTrophy: {
//         alignSelf: 'center',
//         top: hp('3'),
//         height: hp('4'),
//         width: wp('7'),
//     },
//     BadgeImage2: {
//         alignItems: 'center',
//         height: hp('10'),
//         width: wp('11'),
//         shadowColor: colors.ProfileBadge,
//         shadowOpacity: 3,
//     },
//     BadgeImage: {
//         alignItems: 'center',
//         height: hp('10'),
//         width: wp('12'),
//         position: 'absolute',
//         left: hp('12'),
//         top: hp('9')
//     },
//     text: {
//         alignSelf: 'center',
//         paddingVertical: hp('1'),
//         color: colors.Orange,
//         fontWeight: '800'
//     },
//     FlatListImage: {
//         borderRadius: hp('10'),
//         backgroundColor: colors.BlueText,
//         height: hp('13'),
//         width: hp('13'),
//         alignItems: 'center',
//         alignSelf: 'center',
//         top: hp('2'),
//     },
//     FlatListImageUnder: {
//         borderRadius: hp('10'),
//         height: hp('12'),
//         width: hp('12'),
//         marginVertical: hp('0.5')
//     },
//     Image: {
//         width: wp('25'),
//         height: hp('12'),
//         borderRadius: hp('6'),
//         alignSelf: 'center',
//     },
//     design: {
//         width: hp('4'),
//         left: hp('-1.5'),
//         height: hp('4'),
//         backgroundColor: 'yellow',
//         borderRadius: wp('4'),
//         position: 'absolute',
//         shadowOffset: {
//             width: 1,
//             height: 0,
//         },
//         shadowOpacity: wp('0.05'),
//         shadowRadius: wp('-0.7'),
//         elevation: 24,
//     },
// });
// export default ProfileImage;