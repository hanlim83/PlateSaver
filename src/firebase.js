import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyAlKVpkZzyVokdhZYJpoEcKROfasY9YdI4',
  authDomain: 'is216-project-99edb.firebaseapp.com',
  databaseURL: 'https://is216-project-99edb-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'is216-project-99edb',
  storageBucket: 'is216-project-99edb.appspot.com',
  messagingSenderId: '987217138517',
  appId: '1:987217138517:web:0658ec869bbd3e60ebd5dc',
  measurementId: 'G-F389HE2SBW'
}

export const firebaseApp = initializeApp(firebaseConfig)
