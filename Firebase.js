import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAnxbQ2WL2KFMZpgfzLojlliGmI6C3_49A',
  authDomain: 'foodapp-2c97b.firebaseapp.com',
  projectId: 'foodapp-2c97b',
  storageBucket: 'foodapp-2c97b.appspot.com',
  messagingSenderId: '138548656160',
  appId: '1:138548656160:web:54fe4ca50bc031b21fa445',
  measurementId: 'G-PH3RM4R5CZ',
};

export async function getShops(table) {
  const db = getFirestore(app);
  const dataCol = collection(db, table);
  const dataSnapshot = await getDocs(dataCol);
  const dataList = dataSnapshot.docs.map((doc) => doc.data());
  return dataList;
}

export const app = initializeApp(firebaseConfig);
