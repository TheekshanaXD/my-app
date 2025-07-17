import React,{useState} from 'react'
import {View,Text,TextInput,Button,StyleSheet} from 'react-native'
import {useRouter} from 'expo-router'
import {useAuth} from '../contexts/AuthContextProvider'

export default function SignIn() {
  const router = useRouter();
 const {login} = useAuth();
 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');
 const [error,setError] = useState(''); 

 const handleSignIn = async() =>{
    const response = await login(email,password);
    if(!response.success){
      setError(response.error);
    }
 };




  return (
    <View className="flex-1 justify-center items-center p-4">
        <Text className="text-2xl font-bold mb-4">Sign In</Text>
        <TextInput className="w-full p-2 border border-gray-300 rounded mb-4" placeholder="Email" value={email} onChangeText={setEmail}/>
        <TextInput className="w-full p-2 border border-gray-300 rounded mb-4" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true}/>
        <Button title="Sign In" onPress={handleSignIn}/>
        <Button title="Sign Up" onPress={router.replace('/SignUp')}/>
        {error ? <Text className="text-red-500 mt-4">{error}</Text> : null}
    </View>
  )
}

