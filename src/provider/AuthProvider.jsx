import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import useAxiosPublic from './../hooks/useAxiosPublic';


export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
  const [user,setUser]= useState(null);
  const [loading,setLoading]= useState(true);
  const axiosPublic = useAxiosPublic();
  const googleProvider = new GoogleAuthProvider();


//   create user
   const createUser = (email,password) => {
     setLoading(true);
    return createUserWithEmailAndPassword(auth, email,password);
   }

//    google 
   const signInWithGoogle = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
   }

//    sign in user

const signInUser = (email,password)=> {
     setLoading(true);
     return signInWithEmailAndPassword(auth,email,password);
}

// updated user profile
const updateUserProfile = (userName,photoUrl)=> {
   setLoading(true);
   return updateProfile(auth.currentUser,  {
   displayName: userName, photoURL: photoUrl 
})
}

const logOut= () => {
     setLoading(true);
     signOut(auth)
     .then(result => {
          
     })
     .catch(err => {
          console.log(err);
     })
     
}


    useEffect(() => {
       const unSubscribe = onAuthStateChanged(auth, currentUser => {
          

          setUser(currentUser);
          //  get token and store client
         if(currentUser){
            const userInfo = {email: currentUser.email};
            axiosPublic.post('/jwt', userInfo)
            .then(res =>{
                if(res.data.token){
                 localStorage.setItem('MAE access token', res.data.token)
                 setLoading(false);
                 }
            })
         }else{
                   localStorage.removeItem('MAE access token');
                   setLoading(false);
                 }
          
          console.log('Current user', currentUser);
    })

       return () => unSubscribe();
    },[axiosPublic])

    const authInfo ={
         user,
         loading,
         createUser,
         signInUser,
         logOut,
         signInWithGoogle,
 updateUserProfile 


    } 
    return (
        <AuthContext.Provider value={authInfo}>
             {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;