import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Afegit per Firebase Storage
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Afegit per Firestore
import { firebaseApp } from '../Firebase/FirebaseConfig'; // Assegura't que inicialitzis Firebase en el teu projecte


const db = getFirestore(firebaseApp); // Firebase Firestore instance
const storage = getStorage(firebaseApp); // Firebase Storage instance

export default function Add({ navigation }) {

};
