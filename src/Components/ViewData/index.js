import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground, View, Alert, I18nManager } from 'react-native';
import { colors, commonstrings, fonts, images, } from '../../Constant';
import { strings } from '../../Constant/LocalString/LocalizedStrings';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from '../../Utils/LayoutMeasurement';
import FastImage from 'react-native-fast-image';
import ToggleSwitch from 'toggle-switch-react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { setLang, getLang } from '../../Config/changLang';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';

const data = [
    { label: 'English', value: 'en' },
    { label: 'Hindi', value: 'hi' },
];


const ViewData = props => {
    const navigation = useNavigation();
    const [langChange, setLangChange] = useState(false)
    const [language, setlanguage] = useState('')

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log('inside focus method')
            onChangeLang()
        })
        return unsubscribe
    })

    const onChangeLang = useCallback(async (lang) => {
        console.log(lang, 'language==')
        if (lang === 'en') {
            // await I18nManager.forceRTL(false)
            setLang('en')
            strings.setLanguage('en')

            const lngData = await getLang()
            await AsyncStorage.setItem(commonstrings.ASYNC_LANG_SELECTED, lngData)


            // RNRestart.Restart()
            setLangChange(true)
            return;
        }
        if (lang === 'hi') {
            // await I18nManager.forceRTL(false)
            setLang('hi')
            strings.setLanguage('hi')

            const lngData = await getLang()
            await AsyncStorage.setItem(commonstrings.ASYNC_LANG_SELECTED, lngData)

            // RNRestart.Restart()
            setLangChange(false)
            return;
        }
    }, [langChange])

    const onSelectedLanguage = (item) => {
        console.log('called before the chnage the text ')
        const Ritik = AsyncStorage.getItem('local_language')
        console.log(language, 'inside onselectedLanguage')

        if (Ritik == 'null') {
            setlanguage('Select item')
        } else {
            if (language == 'en') {
                setlanguage('English')
            } else if (language == 'hi') {
                setlanguage('Hindi')
                console.log(language, 'else part')
            }
        }
    }
    
    return (
        <View style={[styles.Container, props.BorderContainer]}>
            <TouchableOpacity onPress={props.CustomClick} activeOpacity={1}>
                <View style={styles.flexDirection}>
                    <FastImage
                        source={props.images}
                        style={[styles.image]}
                        resizeMode={FastImage.resizeMode.contain}
                        tintColor={colors.White}
                    />
                    <Text style={styles.Text}>{props.Text}</Text>
                </View>
            </TouchableOpacity>

            {props.Toggle ?
                <ToggleSwitch
                    isOn={true}
                    onColor={colors.ToggleOn}
                    offColor={colors.ToggleOff}
                    size="medium"
                    onToggle={isOn => console.log("changed to : ", isOn)}
                /> :
                props.dropdown ?

                    <Dropdown
                        containerStyle={styles.shadow}
                        style={styles.dropdown}
                        // placeholder={language}
                        placeholder={props.Placeholder}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        // inputSearchStyle={styles.inputSearchStyle}
                        itemContainerStyle={styles.itemContainer}
                        iconStyle={styles.iconStyle}
                        data={data}
                        activeColor={colors.DropDown}
                        autoScroll={true}
                        maxHeight={100}
                        labelField="label"
                        valueField="value"
                        itemTextStyle={styles.options}
                        value={data.value}
                        onChange={(item) => [props.onChangeLang(item.value), onSelectedLanguage(item)]}

                    />

                    :
                    <TouchableOpacity onPress={props.onPress}>
                        <FastImage
                            source={props.arrow}
                            style={[styles.image, props.image]}
                            resizeMode={FastImage.resizeMode.contain}
                            tintColor={colors.White}
                        />
                    </TouchableOpacity>

            }

        </View>
    );
};

const styles = StyleSheet.create({
    inputSearchStyle: {
        color: colors.White,
        height: 30,
        fontSize: fonts.FONT_12,
    },
    shadow: {
        backgroundColor: colors.DropDown,
        borderRadius: 10,
        borderColor: colors.DropDown
    },
    placeholderStyle: {
        color: colors.White,
        fontSize: fonts.FONT_8,
        borderRadius: hp('10'),
        fontFamily: fonts.Inter_Bold,
    },
    iconStyle: {
        width: wp('3'),
        height: hp('3'),
        tintColor: colors.White,
        resizeMode: 'cover'
    },
    flexDirection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    Container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('5'),
        height: hp('8'),
        borderBottomWidth: hp('0.3'),
        borderBottomColor: colors.BorderBottom,
        borderBottomStartRadius: wp('5'),
        borderBottomEndRadius: wp('10')
    },
    Text: {
        left: hp('1.8'),
        color: colors.White,
        fontSize: fonts.FONT_15,
    },
    image: {
        height: hp('5'),
        width: wp('5'),

    },
    dropdown: {
        height: 30,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: 100,
        backgroundColor: colors.DropDown,
        shadowOpacity: 0.1,
        shadowOffset: {
            height: 0,
            width: 1,
        },

    },
    selectedTextStyle: {
        color: colors.White,
        fontSize: fonts.FONT_8,
        borderRadius: hp('10'),
        fontFamily: fonts.Inter_Bold,
    },
    options: {
        color: colors.White,
        fontFamily: fonts.Inter_Bold,
        fontSize : Platform.OS === 'ios' ? fonts.FONT_10 : fonts.FONT_8,
        
    },
    itemContainer: {
        borderBottomColor: 15,
        height : Platform.OS === 'ios' ? hp('6') : hp('7'),
        // height: hp('6'),
        // backgroundColor :"red"
    }

});
export default ViewData;