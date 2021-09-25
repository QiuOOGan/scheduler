import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import {useState, useEffect} from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyA_QXDCoOgYZ5THKDcuvAe82ACDFzRBi6I",
  authDomain: "scheduler-44fcd.firebaseapp.com",
  databaseURL: "https://scheduler-44fcd-default-rtdb.firebaseio.com",
  projectId: "scheduler-44fcd",
  storageBucket: "scheduler-44fcd.appspot.com",
  messagingSenderId: "378170501278",
  appId: "1:378170501278:web:a7e6d5fbf5351bad0ff38f",
  measurementId: "G-11CWH0L5RC"
};

initializeApp(firebaseConfig);
const database = getDatabase();

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    return onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      setData(transform ? transform(val) : val);
      setLoading(false);
      setError(null);
    }, (error) => {
      setData(null);
      setLoading(false);
      setError(error);
    });
  }, [path, transform]);

  return [data, loading, error];
};

export const setData = (path, value) => (
  set(ref(database, path), value)
);