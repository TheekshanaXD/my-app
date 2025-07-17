import { StatusBar } from "react-native";
import { Slot , useSegments , useRouter } from "expo-router";
import  { useLayoutEffect } from "react";
import { useAuth , AuthContextProvider } from '../contexts/AuthContextProvider';

// your entry point
// import { MenuProvider } from 'react-native-popup-menu';
import '../global.css'


const MainLayout = () => {

  const {isAuthenticated} = useAuth();
  const Segments = useSegments();
  const router = useRouter();


  useLayoutEffect(() => {
    if(typeof isAuthenticated === 'undefined'){
      return;
    }
    // const inApp = Segments[0] == '(pages)'
    //console.log(Segments);

    if(isAuthenticated){ 
      router.replace('/Home');
    }else if(isAuthenticated == false){ 
      router.replace('/SignIn');
    }
    

  },[isAuthenticated]);

  

  return(
    <Slot/>
  );

}

export default function RootLayout() {
  return (
  
      <AuthContextProvider>
        <MainLayout />
        <StatusBar barStyle="dark-content" />
      </AuthContextProvider>

    
  );
}