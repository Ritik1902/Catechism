import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native";

export const setLang = async (data) => {
    // const navigation = useNavigation();
    // const unsubscribe = navigation.addListener('focus', async () => {

    data = JSON.stringify(data)

    return (
        AsyncStorage.removeItem('language'),
        AsyncStorage.setItem('language', data)
    )
    // })
    // return unsubscribe

}

export const getLang = async () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('language').then(data => {
            resolve(JSON.parse(data))
        })
    })
}   