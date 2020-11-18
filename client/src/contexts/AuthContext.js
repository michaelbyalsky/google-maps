import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import firebase from 'firebase';
import { storage } from "../firebase";


const AuthContext = React.createContext()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const firestore = firebase.firestore();
const usersRef = firestore.collection("users");


export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  function signInWithGoogle(){
    return auth.signInWithPopup(googleProvider)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function saveToUsers(email ,data){
    return usersRef.doc(email).set(data)
  }

  function updateProfilePicture(picture){
    return usersRef.doc(currentUser.email).update({
      profilePicture: picture
    })
  }

  function getProfilePicture(){
    return usersRef.doc(currentUser.email).get()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    signInWithGoogle,
    saveToUsers,
    updateProfilePicture,
    getProfilePicture
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}