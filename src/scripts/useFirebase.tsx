import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { collection, getDoc, getDocs, getFirestore } from "firebase/firestore";

export default function useFirebase<T extends object>(endpoint: string) {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const firebase = initializeApp({
        apiKey: "AIzaSyAIId2ByN9c0RX9_R71EbJJoV-lB1RDADc",
        authDomain: "test-technique-beeldi.firebaseapp.com",
        databaseURL: "https://test-technique-beeldi.firebaseio.com",
        projectId: "test-technique-beeldi",
        storageBucket: "test-technique-beeldi.appspot.com",
        messagingSenderId: "937748581892",
    });

    // const auth = firebase.auth();
    // const functions = firebase.functions();
    // const database = firebase.database();
    // const storage = firebase.storage();

    const db = getFirestore(firebase);

    const fetchData = async () => {
        setLoading(true);
        // setData(await getDocs(await collection(db, endpoint)));
        let res = await getDocs(await collection(db, "Equipments"));

        const querySnapshot = await getDocs(collection(db, "Equipments"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });

        setData(res);
        // await getDocs(collection(db, "Equipments")).then((querySnapshot) => {
        //     const newData = querySnapshot.docs.map((doc) => ({
        //         ...doc.data(),
        //     }));
        //     setData(newData);
        //     console.log(data, newData);
        // });
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        data,
        invalidate: fetchData,
        loading,
    };
}
