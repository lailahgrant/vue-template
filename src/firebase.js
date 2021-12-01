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
  apiKey: 'process.env.VUE_APP_FIREBASE_API_KEY',
  authDomain: 'process.env.VUE_APP_FIREBASE_AUTH_DOMAIN',
  projectId: 'process.env.VUE_APP_FIREBASE_PROJECT_ID',
  storageBucket: 'process.env.VUE_APP_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'process.env.VUE_APP_FIREBASE_APP_ID',
  measurementId: 'process.env.VUE_APP_FIREBASE_MEASUREMENT_ID',
}

initializeApp(config)

const db = getFirestore()
const usersCollection = collection(db, '/users')

//===Functions for each of the CRUD operations

//createUser fn to add users to the users collection
export const createUser = (user) => {
  const db = getFirestore()

  //saves data with field of undefined
  //const usersCollection = doc(db, `users/${user.value}`)

  //saves personal infor to database under the field of personal_info
  //const usersCollection = doc(db, 'users/personal_info')

    //saves personal_info to database under the email as a unique field
    const usersCollection = doc(db, `users/${user.email}`)
    
  //const usersCollection = doc(db, 'users/user')
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


// //* AUTHENTICTION */

// will be used with the route guard
export const initialised = ref(false)

export const user = ref(null);
//export const user = ref<any>(null);

const authent = getAuth();

authent.onAuthStateChanged((u) => {
    user.value = u;
    initialised.value = true
});

//  /** logout */
export async function logout() {
    await authent.signOut();
}

// * Signin with Google* */
const provider = new GoogleAuthProvider();
export async function google() {
    // await signInWithPopup(new GoogleAuthProvider());
    signInWithPopup(authent, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
      console.log(user)
      
        // split displayName into Firstname and Lastname
      const split_name = user.displayName.split(' ')

      const myUser = {
        name: user.displayName,
        firstName: split_name[0],
        lastName: split_name[1],
        email: user.email,
        photoURL: user.photoURL,
        userId: user.email,
        login: user.uid
      }

    //   Store some infor that comes with the email in the firestore
        const usersCollection = doc(db, `users/${user.email}`)

        const getUser = async (id) => {
            const docRef = doc(db, `/users/${id}`)
            const user = await getDoc(docRef)
            return user.exists ? user.data() : null
        }

        return setDoc(usersCollection, myUser)
    // ...
  }).catch((error) => {
    // Handle Errors here
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;  
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

}

///show  details
    //  SHOW USER  DETAILS




/** Login**/
export async function useLogin(){


}

























