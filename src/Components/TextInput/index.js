import React from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, Text, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors, fonts } from '../../Constant';
import CommonStyles from '../../Theme/CommonStyle';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../Utils/LayoutMeasurement';
import { useTheme } from '@react-navigation/native';

class InputViewComponent extends React.Component {
    render() {
        return (
            <View>
                <Text style={styles.TextInputLabel}>{this.props.TextInputLabel}</Text>
                <View style={[CommonStyles.flexDirection, styles.TextInputContainer, this.props.OuterView]}>
                    {
                        this.props.leftImageView
                            ?
                            <TouchableOpacity
                                onPress={this.props.onTouchPwdView}
                                activeOpacity={0.8}
                                style={styles.touchView}>
                                <FastImage source={this.props.leftIcon} style={styles.LeftIcon} tintColor={colors.GrayFont} resizeMode={FastImage.resizeMode.contain} />
                            </TouchableOpacity>
                            :
                            null
                    }
                    <TextInput
                        ref={this.props.innerRef}
                        underlineColorAndroid="transparent"
                        placeholder={this.props.Placeholder}
                        placeholderTextColor={colors.DarkGray}
                        keyboardType={this.props.keyboardType}
                        onChangeText={this.props.onChangeText}
                        secureTextEntry={this.props.secureTextEntry}
                        returnKeyType={this.props.returnKeyType}
                        returnKeyLabel={this.props.returnKeyLabel}
                        numberOfLines={this.props.numberOfLines}
                        multiline={this.props.multiline}
                        maxLength={this.props.maxLength}
                        maxHeight={this.props.maxHeight}
                        onSubmitEditing={this.props.onSubmitEditing}
                        onFocus={this.props.onFocus}
                        editable={this.props.Editable}
                        style={[styles.TextInputTxt, this.props.TextInputStyle]}
                        blurOnSubmit={this.props.blurOnSubmit}
                        value={this.props.value}
                        autoCapitalize={'none'}
                        onContentSizeChange={this.props.onContentSizeChange}
                        onEndEditing={this.props.onEndEditing}
                        ellipsizeMode='head'
                        autoFocus={this.props.autoFocus}
                        autoComplete={this.props.autoComplete}
                        textContentType={this.props.textContentType}
                        autoCorrect={false}
                    />
                    {
                        this.props.rightImageView
                            ?
                            <TouchableOpacity
                                onPress={this.props.onTouchPwdView}
                                activeOpacity={0.8}
                                style={styles.touchView}>
                                <FastImage source={this.props.rightIcon} style={styles.RightIcon} tintColor={colors.SkyBlue} resizeMode={FastImage.resizeMode.contain} />
                            </TouchableOpacity>
                            :
                            null
                    }

                </View>
            </View>
        )
    }
}
const InputView = React.forwardRef((props, ref) => {
    const theme = useTheme()
    return (<InputViewComponent innerRef={ref} {...props} theme={theme} />);
});
export default InputView;

const styles = StyleSheet.create({
    TextInputContainer: {
        backgroundColor: colors.TextInput,
        borderRadius: wp('3'),
        width: wp('89'),
        alignSelf: 'center',
        marginVertical: hp('1'),
        height: hp('6.3'),
        paddingHorizontal: wp('1'),
    },
    TextInputTxt: {
        fontSize: fonts.FONT_14,
        color: colors.Black,
        flex: 1,
        alignSelf: 'center',
        paddingHorizontal: hp('2'),
    },
    TextInputLabel: {
        paddingHorizontal: wp('5'),
        paddingTop: hp('1.3'),
        paddingBottom: hp('0.5'),
        fontSize: fonts.FONT_14,
        color:colors.Black
    },
    LeftIcon: {
        height: hp('2.5'),
        width: hp('2.5'),
        resizeMode: 'contain',
        marginLeft: hp('1.5'),
    },
    RightIcon: {
        height: hp('2.5'),
        width: hp('2.5'),
        resizeMode: 'contain',
        marginRight: hp('1.5'),
    }
})