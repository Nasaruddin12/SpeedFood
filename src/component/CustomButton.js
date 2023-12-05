import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const CustomButton = (props) => {
    return (
        <Pressable style={styles.container} onPress={() => props.onPress()}>
            <Text style={styles.title}>{props.title}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor: '#1E90FF',
        alignItems: 'center',
        justifyContent: "center",
    },
    title: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center'
    }
})
export default CustomButton