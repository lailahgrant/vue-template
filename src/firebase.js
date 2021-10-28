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
    apiKey: 'AIzaSyADgGKw5HIZjayWSY67nZXjMKX6xhvs4U8',
    authDomain: 'vue-crud-1b171.firebaseapp.com',
    projectId: 'vue-crud-1b171',
    storageBucket: 'vue-crud-1b171.appspot.com',
    messagingSenderId: '734742842355',
    appId: '1:734742842355:web:adb7136333e26343162086',
    measurementId: 'G-K3LWRJCLFJ',
}
