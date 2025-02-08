import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../Utils/LayoutMeasurement";
import { colors, fonts } from "../Constant";
import { StyleSheet } from "react-native";


const ProfileStyle = StyleSheet.create({
    InputContainer: {
        marginVertical: hp('3')
    },
    ProfileImage: {
        // marginVertical:hp('3')
    },
    Badge2: {
        // backgroundColor : colors.Blue,
        marginVertical: hp('2'),
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    Container:
    {
        backgroundColor: colors.DarkBlue,
        height: hp('22')
    },

    ProfileBtn: {
        width: wp('80'),
        top: hp('2')
    },
    InputView: {
        width: wp('80')
    },
    InnerContainer: {
        marginTop: hp('5'),
        height: hp('90'),
        width: wp('90'),
        alignSelf: 'center',
        backgroundColor: colors.White,
        borderRadius: 15,
    },
    BtnTextStyle: {
        fontSize: fonts.FONT_10,
        paddingVertical: hp('0.5')
    },
    BtnStyle: {
        backgroundColor: colors.DarkBlue,
        width: wp('28'),
        bottom: hp('3'),
        height: hp('3.1'),
        paddingVertical: hp('0.1'),
        borderRadius: hp('1')
    },
    txt: {
        fontSize: 55,
        color: colors.White,
        alignSelf: 'center',
        paddingVertical: hp('4')
    },
    ProfileView: {
        height: hp('33'),
        width: wp('90'),
        backgroundColor: colors.White,
        position: 'absolute',
        marginTop: hp('4'),
        alignSelf: 'center',
        borderRadius: 15,
        paddingVertical: hp('1')
        
    },
    Options: {
        // backgroundColor : 'red',
        height: hp('25'),
        width: wp('90'),
        backgroundColor: colors.White,
        borderRadius: 15,
        alignSelf: 'center',
        marginVertical: hp('29'),
    },
    ImageView: {
        // marginTop : wp('1.5'),
        // marginBottom: wp('-1.5'),
        width: wp('32'),
        height: hp('15.6'),
        borderRadius: hp('8'),
        alignSelf: 'center',
        
    },
    UserName: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: fonts.FONT_20,
        paddingTop: hp('4'),
        paddingBottom: hp('1'),
        color: colors.Black
    },
    Badge: {
        height: hp('18'),
        width: wp('80'),
        // backgroundColor : 'red',
        backgroundColor: colors.ProfileBadge,
        alignSelf: 'center',
        marginTop: hp('3'),
        borderRadius: 15

    },
    BadgeText: {
        marginLeft: wp('4'),
        marginTop: hp('2'),
        fontWeight: 'bold',
        fontSize: fonts.FONT_15,
    },
    BadgeImage: {
        alignItems: 'center',
        height: hp('9'),
        width: wp('19'),
        shadowColor: colors.ProfileBadge,
        shadowOffset: {
            width: wp('1'),
            height: hp('1'),
        },
        shadowOpacity: 3,
    },
    BadgeTrophy: {
        alignSelf: 'center',
        top: hp('2'),
        height: hp('5'),
        width: wp('10'),
    },
    Badge1: {
        alignItems: 'center',
        justifyContent: 'space-around',
        height: hp('13'),
        width: wp('80'),
        backgroundColor: colors.ProfileBadge,
        alignSelf: 'center',
        marginTop: hp('1.5'),
        borderRadius: 15,
        flexDirection: 'row'
    },
    BadgeImage1: {
        marginRight: wp('4'),
        marginLeft: wp('4'),
        height: hp('4.5'),
        width: wp('10'),
    },
    BadgeText1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: wp('3'),
        marginRight: wp('7'),
    },
    BannerView: {
        width: wp('22'),
    },
    BannerImage: {
        height: hp('4'),
        width: wp('9'),
        alignSelf: 'center'

    },
    BannerLabel: {
        textAlign: 'center',
        fontWeight: '200',
        fontSize: fonts.FONT_11,
        color: colors.Black,
        paddingTop: hp('1'),
        paddingBottom: hp('0.5')
    },
    BannerText: {
        textAlign: 'center'
    },
    LeaderBoard_OutsideImage: {
        height: hp('19.2'),
        width: hp('19.3'),
        backgroundColor: colors.ProfileBadge,
        shadowColor: colors.ProfileBadge,
        shadowOffset: {
            width: wp('1'),
            height: hp('1'),

        },
        shadowOpacity: 0.1,
        // Bottom: hp('10')
    },
    LeaderBoard_InnerImage: {
        borderWidth: hp('1'),
        borderColor: colors.White,
        height: hp('18'),
        width: hp('18'),
    },

});

export default ProfileStyle;
