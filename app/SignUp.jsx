import React,{useState} from 'react'
import {View,Text,TextInput,Button} from 'react-native'
import { useAuth } from '../contexts/AuthContextProvider'

function SignUp() {
  const {register} = useAuth();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [userName,setUserName] = useState('');
  const [error,setError] = useState('');
  
  const handleSignUp = async() =>{
    const response = await register(email,password,userName);
    if(!response.success){
      setError(response.error);
    }
  }


  return (
    <View>
      <Text>Sign Up</Text>
      <TextInput placeholder='Email' value={email} onChangeText={setEmail}/>
      <TextInput placeholder='password' value='password' onChangeText={setPassword} secureTextEntry/>
      <TextInput placeholder='userName' value='userName' onChangeText={setUserName}/>
      <Button title='Sign Up' onPress={handleSignUp}/>
    </View>
  )
}

export default SignUp