import React, {useState, useEffect} from "react";
import backgroundImage from "../assets/unilag-pic.jpeg";
import { useDispatch, useSelector } from 'react-redux';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { database } from "../firebase/firebaseConfig";
import { filteredBizs, setBizs } from "../redux/features/bizs/bizsSlice";
import { Link } from "react-router-dom";

export default function SearchBusiness(){
    const [searchInput, setSearchInput] = useState('');
    const [searchPerformed, setSearchPerformed] = useState(false);
    const dispatch = useDispatch();
    const {displayBizs, allBizs} = useSelector((state) => state.bizs)

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const businessesRef = collection(database, "businesses");
                const querySnapshot = await getDocs(businessesRef);
                const businessesArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                dispatch(setBizs(businessesArray));
            } catch (error) {
                console.error("Error fetching businesses:", error);
            }
        };

        fetchBusinesses();
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value; 
        setSearchInput(value);

        if (value.trim() === '') {
            dispatch(filteredBizs([])); 
            setSearchPerformed(false); 
        }
    };

    const handleSearch = () => {
        const filteredBusinesses = allBizs.filter((biz) => {
            const nameMatch = biz.name && biz.name.toLowerCase().includes(searchInput.toLowerCase());
            const addressMatch = biz.address && biz.address.toLowerCase().includes(searchInput.toLowerCase());
            const descriptionMatch = biz.description && biz.description.toLowerCase().includes(searchInput.toLowerCase());
            
            return nameMatch || addressMatch || descriptionMatch;
        });
        
        dispatch(filteredBizs(filteredBusinesses));
        setSearchPerformed(true);
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
            <input type="text"  value={searchInput} onChange={handleInputChange} className="py-3 md:py-5 px-10 w-[180px] lg:w-[600px] md:w-[400px] text-sm md:text-[18px] focus:outline-none focus:ring-1 focus:ring-main transition" placeholder="search businesses in unilag"/>
            <button onClick={handleSearch} className="bg-main py-3 px-4 text-sm md:py-5 md:px-5 lg:px-5 md:text-[18px] text-accent rounded-sm hover:bg-complementary transition duration-300 ease-in-out transform hover:scale-105 ">search</button>
        </div>
        </div>
<div>
{searchPerformed && displayBizs.length === 0 ? (
        <p  className="text-sm m-10">...</p>
):(
    <div className="text-md md:text-lg lg:text-lg text-center grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 p-2 md:p-10 lg:p-10">
            {displayBizs.map((biz) => (
                 <ul key={biz.id} className="mt-[40px]">
                 <li>
                 <div className="flex justify-center items-center mx-5">
                 <div className="w-[250px]">
                 <img src={biz.imgUrl} alt={biz.name} className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] lg:w-[250px] lg:h-[250px] rounded-md mb-3 transform transition duration-300 ease-in-out hover:scale-105 rounded-lg shadow-lg"/>
                 </div>
                 </div>
                 <div className="flex justify-center items-center">
                   <div className="w-[250px]">
                     <p className="text-[22px]">{biz.name}</p>
                   </div>
                   </div>
                 <div className="flex justify-center">
                   <div className="w-[250px]">
                     <p className="text-center text-[17px]">{biz.address}</p>
                   </div>
                 </div>
                 <Link to={`/explore-business/${biz.id}`} className="text-sm text-main underline underline-offset-4 decoration-main decoration-3">See more...</Link>
                 </li>
                </ul>
            ))}
        </div>
)}
        </div>
        </>
    )
}