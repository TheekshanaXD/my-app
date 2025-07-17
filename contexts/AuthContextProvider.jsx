import { auth , db } from '../config/firebaseConfig';
import { doc , getDoc , setDoc } from 'firebase/firestore';

import { createContext , useEffect , useState , useContext } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged , signOut , signInWithEmailAndPassword } from 'firebase/auth';


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => { 

    const [user , setUser ] = useState(null);
    const [isAuthenticated , setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth , (user) =>{
            if(user){ 
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
                //console.log("User is authenticated")
            }else{ 
                
                setIsAuthenticated(false);
                setUser(null);
            }
        });

        return unsubscribe;

    },[]);

    const updateUserData = async (userId) => {
        const docRef = doc(db , 'users' , userId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            let data = docSnap.data();
            setUser({...user , userName: data.userName , userId: data.userId});

        }

    }

    const login = async (email , password) => { 
        try {
            const response = await signInWithEmailAndPassword(auth , email , password);

            return { success: true };

        } catch (error) {
            return { success: false , error: error.message };
        }
    }

    const register = async (email , password , userName) =>{
        try {
            const response = await createUserWithEmailAndPassword( auth , email , password );

            await setDoc(doc(db , "users" , response?.user?.uid ),{
                userName,
                userId: response?.user?.uid
            });

            return { success: true , data: response?.user };

        } catch (error) {
            // To-Do ...
            //console.log(error);
            return { success: false , error: error.message };
        }

    }

    const logout = async () => { 
        try {
            await signOut(auth);
            return {success: true};

        } catch (error) {

            return {success: false , error: error.message}; 
        }
    }

    return(
        <AuthContext.Provider value ={{ user , isAuthenticated , login , register , logout }} >
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {
    const value = useContext(AuthContext);
    //console.log("Value: " , value);
    if(!value){
        throw new Error("useAuth must be used within a AuthContextProvider");
    }
    return value;
}