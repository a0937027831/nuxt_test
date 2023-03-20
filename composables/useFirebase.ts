import { 
  getAuth, 
  createUserWithEmailAndPassword ,
  signInWithEmailAndPassword ,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const createUser = async (email:string ,password:string)=>{
  const auth = getAuth();
  const credentails = await createUserWithEmailAndPassword(auth,email,password)
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('registered error :',errorCode ,'errorMessage :',errorMessage);
    // ..
  });
  return credentails;
};

export const signInUser = async (email:string ,password:string) =>{
  const auth = getAuth();
  const credentails = await signInWithEmailAndPassword(auth, email, password)
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  return credentails;
};

export const signOutUser = async ()=>{
  const auth = getAuth();
  const result = await auth.signOut();
  console.log('sign Out :',result);
};

export const initUser = async ()=>{
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("Auth changed :",user);
    } else {
      // User is signed out
      // ...
      console.log("Auth changed :",user);
    }
  });
};


//google sign
export const signInWithGoogle = async()=>{
  const provider =new GoogleAuthProvider();
  const auth = getAuth();
  const credentails = await signInWithPopup(auth,provider)
  .catch((error)=>{
    console.log('signInWithGoogle error :',error.errorCode ,'errorMessage :',error.errorMessage);
  });
  console.log("signInWithGoogle credentails :",credentails);
};


