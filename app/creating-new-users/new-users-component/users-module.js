import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NewUserContinue from './new-user-contine'
import NewUserForm from './new-user-form'

const UsersModule = () => {
    return (
        <>
            <NewUserForm />
            <NewUserContinue
                textUsesrNameLink="Log In" headerText="Or Continue With"
                handlePressurl="log-in"
                usesrUp2={{ marginTop: 20 }}
            />
        </>
    )
}

export default UsersModule

const styles = StyleSheet.create({})