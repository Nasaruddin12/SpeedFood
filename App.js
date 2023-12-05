import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Pressable, ScrollView, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomInputText from './src/component/CustomInputText'
import CustomButton from './src/component/CustomButton'
import { launchImageLibrary } from 'react-native-image-picker'

const { width, height } = Dimensions.get('window')

const App = () => {
  const category = useSelector(state => state.categories.categories)
  const [status, setStatus] = useState('view')
  const [data, setData] = useState(category)
  const [active, setActive] = useState(category.length)


  useEffect(() => {
    getCategory()
  }, [])


  const getCategory = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    await fetch("https://dmapi.ipaypro.co/app_task/categories", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setData([...data, ...result.result])
        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}
       
      >
        {status == 'view' ?
          <View>
            <ViewCategory data={data} active={active} onPress={(i) => setActive(i)} />
          </View> :
          <AddCategory />
        }
      </ScrollView>

      <View>
        <View style={styles.flexContainer}>
          <TouchableOpacity style={styles.box} onPress={() => setStatus('view')}>
            <AntDesign name='infocirlce' size={25} color={status == 'view' ? "#1E90FF" : 'gray'} />
            <Text style={[styles.header, { color: status == 'view' ? "#1E90FF" : 'gray' }]}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => setStatus('add')}>
            <AntDesign name='checkcircle' size={25} color={status == 'add' ? "#1E90FF" : 'gray'} />
            <Text style={[styles.header, { color: status == 'add' ? "#1E90FF" : 'gray' }]}>Add New</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


export default App



const ViewCategory = ({ data, active, onPress }) => {
  return (
    <View style={{ marginHorizontal: width * 0.04, }}>
      <Text style={styles.title}>Categories & Subcategories</Text>
      <View style={{ borderWidth: 0.8, borderColor: 'gray', borderRadius: 5 }}>
        {data.map((item, i) => (
          <View key={item._id} style={{
            borderBottomWidth: 0.8,
            borderBottomColor: 'gray',
          }}>
            <Pressable style={[styles.categoryConatiner, { backgroundColor: i == active ? 'lightgray' : 'white' }]} onPress={() => onPress(i)}>
              <MaterialCommunityIcons name='dots-vertical' color='#000' style={{ opacity: 0.6 }} size={30} />
              <Image source={{ uri: item.image }} style={{ width: 45, height: 45, borderRadius: 10 }} />
              <View style={{ width: width * 0.64 }}>
                <Text style={styles.text}>{item.category_name}</Text>
              </View>
              {i != active &&
                <Feather name="chevron-down" color='gray' size={25} />
              }
            </Pressable>
            {i == active &&
              <View>
                {item.sub_cateries?.map((el, j) => (
                  <View key={el._id} style={styles.subcateriesContainer}>
                    <Text style={styles.text}>{el.name}</Text>
                    <Feather name='circle' color='gray' size={25} />
                  </View>
                ))}
              </View>
            }
          </View>
        ))}
      </View>
    </View>
  )
}



const AddCategory = () => {

  const [category_name, setCategory_name] = useState('')
  const [sub_categories, setSubcategories] = useState([{ name: '' }])
  const [photo, setPhoto] = React.useState(null);

  const removeLastSubCategory = () => {
    if (sub_categories.length > 1) {
      const updatedSubCategories = sub_categories.slice(0, -1);
      setSubcategories(updatedSubCategories);
    }
  };

  const updateSubCategory = (text, index) => {
    const updatedSubCategories = [...sub_categories];
    updatedSubCategories[index].name = text;
    setSubcategories(updatedSubCategories);
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true, }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response.assets[0]);
      }
    });
  };

  const addNewCategory = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "category_name": "Veggies",
      "sub_cateries": sub_categories,
      "image": {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      }
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch("https://dmapi.ipaypro.co/app_task/categories/add", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          Alert.alert('Category Added Successfully')
          setCategory_name('')
          setPhoto(null)
          setSubcategories([{ name: '' }])
        } else {
          Alert.alert(result.message)
        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <View style={{ marginHorizontal: width * 0.04, }}>
      <Text style={styles.title}>Add Categories & Subcategories</Text>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
          marginTop: 10
        }}></View>
      <View>
        <Text style={[styles.text, { marginLeft: 0, marginTop: width * 0.08 }]}>Category name</Text>
        <CustomInputText
          placeholder=''
          value={category_name}
          onChangeText={(text) => setCategory_name(text)}
        />
      </View>
      <Text style={[styles.text, { marginLeft: 0, marginTop: width * 0.08 }]}>Category Image</Text>

      <View style={styles.imagePickerContainer}>
        <View style={styles.imageBox}>
          {photo ?
            <Image source={{ uri: photo.uri }} style={{ width: '100%', height: '100%' }} /> :
            <FontAwesome name='image' size={25} color='gray' />
          }
        </View>
        <View style={{
          width: '50%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <CustomButton title="Choose file" onPress={() => handleChoosePhoto()} />
        </View>
      </View>
      <Text style={[styles.text, { marginLeft: 0, marginTop: width * 0.08 }]}>Create Sub-Categories Image</Text>
      {sub_categories.map((item, i) => (
        <View style={styles.imagePickerContainer} key={i}>
          <View style={{ width: '83%', marginTop: 10 }}>
            <CustomInputText
              placeholder=''
              value={item.name}
              onChangeText={(text) => updateSubCategory(text, i)}
            />
          </View>

          {i != sub_categories.length - 1 || i == 0 ? (
            <View style={{ marginTop: 10 }}>
              <AntDesign name='plussquare' size={40} color='#1E90FF' onPress={() => setSubcategories([...sub_categories, { name: '' }])} />
            </View>
          ) : <View >
            <AntDesign name='minussquare' size={40} color='gray' onPress={() => removeLastSubCategory([...sub_categories, { name: '' }])} />
          </View>}

        </View>
      ))}
      <View style={{ marginTop: width * 0.15 }}>
        <CustomButton title='Add' onPress={() => addNewCategory()} />
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.8,
    borderTopColor: 'gray',
    marginHorizontal: 15
  },
  box: {
    marginHorizontal: 30,
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 5,

  },
  header: {
    fontSize: 14,
    fontWeight: '800'
  },
  title: {
    fontWeight: '800',
    fontSize: width * 0.05,
    marginVertical: width * 0.015,
    marginLeft: width * 0.04
  },
  categoryConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  text: {
    fontWeight: '500',
    fontSize: width * 0.043,
    marginVertical: width * 0.02,
    marginLeft: width * 0.04
  },
  subcateriesContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: width * 0.1,
    borderBottomWidth: 0.8,
    borderBottomColor: 'gray',
    paddingVertical: 8
  },
  imagePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  imageBox: {
    borderWidth: 2.5,
    borderColor: 'gray',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    height: width * 0.2,
    width: width * 0.32
  }
})
