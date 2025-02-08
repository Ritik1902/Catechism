import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../../Utils/LayoutMeasurement";
import { useTheme } from "@react-navigation/native";
import { colors } from "../../Constant";
import FastImage from "react-native-fast-image";

class ImageViewComponent extends React.Component {
    render() {
        return (
            <View style={styles.ImgContainer}>
                <FastImage
                    ref={this.props.innerRef}
                    tintColor={this.props.focused ? colors.White : colors.BottomIcon}
                    style={{
                        height: hp('6.5'),
                        color: colors.White,
                    }}
                    source={this.props.Source}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>
        )
    }
}
const ImageView = React.forwardRef((props, ref) => {
    const theme = useTheme()
    return (<ImageViewComponent innerRef={ref} {...props} theme={theme} />);
});


export default ImageView;

const styles = StyleSheet.create({
    ImgContainer: {
        // backgroundColor : 'red',
        marginTop: hp('1'),
        height: hp('5.5'),
        width: wp('6'),
        justifyContent: 'center',
        alignSelf: 'center',
    },
    img: {
        backgroundColor: 'red',
        height: hp('15'),
        width: wp('10'),
        alignSelf: 'center',
        resizeMode: 'contain'

    }
})