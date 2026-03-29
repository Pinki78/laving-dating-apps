import { StyleSheet, Text, View } from 'react-native'
import LoginFrom from './login-from'
import ContinueWith from './continue-with'

const ModuleLogIn = () => {
    return (
        <>
            <LoginFrom />
            <ContinueWith
            textUsesrNameLink="Sign Up" headerText="Or"
            handlePressurl="creating-new-users"
            />
        </>
    )
}

export default ModuleLogIn

const styles = StyleSheet.create({})