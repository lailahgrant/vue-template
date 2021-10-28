import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDocs,
    getDoc,
    deleteDoc,
    query,
} from 'firebase/firestore/lite'
import { ref, onUnmounted } from 'vue'
import 'firebase/auth'
import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
} from 'firebase/auth'

const config = {
    apiKey: 'AIzaSyD_dJc7HgTIKgBy1KhMWsIbvOzJ6UjqXpw',
    authDomain: 'freelance-app-f7696.firebaseapp.com',
    projectId: 'freelance-app-f7696',
    storageBucket: 'freelance-app-f7696.appspot.com',
    messagingSenderId: '686332306013',
    appId: '1:686332306013:web:84d210d3ae06d6b73ee3b4',
    measurementId: 'G-2G5PBMD72G',
}

initializeApp(config)

const db = getFirestore()
const usersCollection = collection(db, '/users')

//===Functions for each of the CRUD operations

//createUser fn to add users to the users collection
export const createUser = (user) => {
    const db = getFirestore()
    const usersCollection = doc(db, `users/${user.email}`)
    //     const usersCollection = doc(db, 'users/user')
    console.log(user)
    return setDoc(usersCollection, user)
}

//getUser fn, accepts  user's  id and return the documentation if it exists
export const getUser = async (id) => {
    const docRef = doc(db, `/users/${id}`)
    const user = await getDoc(docRef)
    return user.exists ? user.data() : null
}

 //update fn
export const updateUser = (id, user) => {
    const docRef = doc(db, `/users/${id}`)
    return setDoc(docRef, user)
}

//delete fn
export const deleteUser = (id) => {
    const docRef = doc(db, `/users/${id}`)
    ///  add  an alert, then page refresh after an alert
    const r = alert(`Are you sure you want to delete?`)
    return deleteDoc(docRef)
}

 //create a composition hook that will return the ref to an array of users from  the database
export const useLoadUsers = () => {
    const users = ref([])
    // const userQuery = query(usersCollection)
    getDocs(usersCollection).then((snapshot) => {
        users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return users
}

