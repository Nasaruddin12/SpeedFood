import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window')
const CustomInputText = (props) => {
  return (
    <View>
      <TextInput
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(text) => props.onChangeText(text)}
        style={styles.input}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  input: {
    height: width * 0.1,
    borderColor: 'gray',
    borderWidth: 0.8,
    borderRadius: 3,
    paddingLeft: 10
  }
})

export default CustomInputText