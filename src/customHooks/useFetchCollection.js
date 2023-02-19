import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {db} from '../firebase/config';
const useFetchCollection = collectionName => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getCollection = () => {
    setIsLoading(true);
    try {
      const docRef = collection(db, collectionName);

      const q = query(docRef, orderBy('createdAt', 'desc'));

      onSnapshot(q, snapshot => {
        const allData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('allData', allData);
        setData(allData);
      });
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCollection();
  }, []);

  return {data, isLoading};
};
export default useFetchCollection;
