import React, {useState} from "react";
import backgroundImage from "../assets/unilag-pic.jpeg";
import { useDispatch, useSelector } from 'react-redux';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { database } from "../firebase/firebaseConfig";
import { filteredBizs } from "../redux/features/bizs/bizsSlice";

export default function SearchBusiness(){
    const [searchInput, setSearchInput] = useState('');
    const [searchPerformed, setSearchPerformed] = useState(false);
    const dispatch = useDispatch();
    const {displayBizs} = useSelector((state) => state.bizs)

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearch = async () => {
        try {
            const q = query(
                collection(database, 'businesses'),
                where('name', '==', searchInput) // adjust field based on what you want to search by
            );

            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            console.log('Search Results:', results);
            dispatch(filteredBizs(results));
            setSearchPerformed(true)
        } catch (error) {
            console.error('Error fetching businesses:', error);
        }
    };
    return(
        <>
        <div  className="h-[40vh] md:h-[40vh] md-lg:h-[60vh] lg:h-[60vh] flex justify-center px-10 py-[70px]"
        style={{
          backgroundImage: `linear-gradient(rgba(219, 195, 195, 0.8), rgba(219, 195, 195, 0.8)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="rounded">
            <input type="text"  value={searchInput} onChange={handleInputChange} className="py-3 md:py-5 px-10 w-[200px] lg:w-[600px] md:w-[400px] text-sm md:text-[18px] focus:outline-none focus:ring-1 focus:ring-main transition" placeholder="search businesses in unilag"/>
            <button onClick={handleSearch} className="bg-main py-3 px-4 text-sm md:py-5 md:px-5 lg:px-5 md:text-[18px] text-accent rounded-sm hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105 ">search</button>
        </div>
        </div>
<div>
{searchPerformed && displayBizs.length === 0 ? (
        <p>Not found</p>
):(
    <div>
            {displayBizs.map((biz) => (
                <ul key={biz.id}>
                    <li>
                        <p>{biz.name}</p>
                        <p>{biz.address}</p>
                    </li>
                </ul>
            ))}
        </div>
)}
        </div>
        </>
    )
}