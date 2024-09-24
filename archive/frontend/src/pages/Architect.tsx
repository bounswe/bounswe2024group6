import { Separator } from '@/components/ui/separator'
import { Navbar } from '../components'
import { ScrollArea } from "@/components/ui/scroll-area"
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../lib/baseUrl'
import ClipLoader from "react-spinners/ClipLoader";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { useNavigate } from "react-router-dom";


export default function Architect() {
    let { qid } = useParams();
    const [architectData, setArhitectData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        axios.post(`${BASE_URL}:8000/architect/`, {entity_id: qid})
        .then(function (response) {
            if (response.hasOwnProperty("data")) {
                setArhitectData(response.data);
                console.log(response)
            }
            setIsLoading(false)
        })
        .catch(function (error) {
            console.log(error);
            setIsLoading(false)
        })
    }, [qid]);

    const [galleryIndex, setGalleryIndex] = useState(0);
    const handleGalleryPrevClick = () => {
        setGalleryIndex(prevIndex => Math.max(prevIndex - 1, 0)); // Decrease index by 1, but ensure it doesn't go below 0
    };
    const handleGalleryNextClick = () => {
        setGalleryIndex(prevIndex => Math.min(prevIndex + 1, architectData.notableWorks.length - 1)); // Increase index by 1, but ensure it doesn't exceed the length of the image array
    };
    const [artIndex, setArtIndex] = useState(0);
    const handleArtPrevClick = () => {
        setArtIndex(prevIndex => Math.max(prevIndex - 1, 0)); // Decrease index by 1, but ensure it doesn't go below 0
    };
    const handleArtNextClick = () => {
        setArtIndex(prevIndex => Math.min(prevIndex + 1, architectData.movements.length - 1)); // Increase index by 1, but ensure it doesn't exceed the length of the image array
    };

    return (
        <div className="h-screen w-screen">
            <Navbar />
            {
            isLoading
            ?
                <div className="flex w-full justify-center">
                    <div className="mt-20">
                        <ClipLoader
                            color={"#000000"}
                            loading={isLoading}
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>
            :
                <div className="h-screen w-screen flex">
                    <div className="h-full w-full py-6 pl-6">
                        <ScrollArea className="h-full w-full rounded-2xl shadow-sm border">
                            <div className="p-6 flex flex-col gap-2">
                                <h1 className="font-bold text-4xl">{architectData.name}</h1>
                                <Separator />
                                <p>{architectData.wikiText}</p>
                            </div>
                        </ScrollArea>
                    </div>

                    <div className="h-screen w-[100vh]">
                        <div className="h-1/2 w-[50vh] pt-6 pl-6 pr-3 pb-3">
                            <div className="h-full w-full rounded-2xl relative">
                                {architectData.image=="NULL" ? (
                                    <div className='w-full h-full shadow-sm border rounded-2xl'>
                                    <ImageNotSupportedIcon  style={{ width: '60%', height: '60%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(80, 80, 80, 0.5)'}} />

                                    </div>
                                ) : (
                                    <img 
                                        src={architectData.image} 
                                        alt="Sagrada Família" 
                                        className="h-full w-full object-cover rounded-2xl" 
                                    />
                                    
                                )}
                                <div className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(136, 136, 136, 0.5)'}}>Profile</div>
                            </div>
                        </div>
                        <div className="h-1/2 w-[50vh] pb-6 pl-6 pr-3 pt-3">
                            <div className="h-full w-full  rounded-2xl relative">
                            {architectData.notableWorks.length==0 ? (
                                <div className='w-full h-full shadow-sm border rounded-2xl'>
                                <ImageNotSupportedIcon  style={{ width: '60%', height: '60%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(80, 80, 80, 0.5)'}} />

                                </div>)
                                :
                                    (<div className="h-full w-full  rounded-2xl relative">

                                    {architectData.movements[artIndex].image=="NULL" ? (
                                        <div className='w-full h-full shadow-sm border rounded-2xl'>
                                        <ImageNotSupportedIcon  style={{ width: '60%', height: '60%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(80, 80, 80, 0.5)'}} />

                                        </div>
                                    ) : (
                                        <img 
                                            src={architectData.movements[artIndex].image} 
                                            alt="Sagrada Família" 
                                            className="h-full w-full object-cover rounded-2xl" 
                                        />
                                        
                                    )}
                                    <button onClick={
                                                () => {
                                                    navigate(`/wiki/architect/${architectData.movements[artIndex].id}`);
                                                    navigate(0);
                                                }} className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(136, 136, 136, 0.5)'}}>{architectData.movements[artIndex].name}</button>
                                    <Button className="absolute bottom-1 left-2 p-3 text-white" variant="prev" onClick={handleArtPrevClick} style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5), fontSize:18', padding: '2px 10px', fontSize:18 }}><ArrowBackIosIcon/></Button>
                                    <Button className="absolute bottom-1 right-2 p-3 text-white" variant="next" onClick={handleArtNextClick} style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18}}><ArrowForwardIosIcon/></Button>
                                    </div>
                            )
                            }
                            </div>
                        </div>
                    </div>
                    <div className="h-screen w-[100vh]">
                        <div className="h-1/2 w-[50vh] pt-6 pr-6 pl-3 pb-3">
                            <div className="h-full w-full  rounded-2xl relative">
                            {architectData.notableWorks.length==0 ? (
                                <div className='w-full h-full shadow-sm border rounded-2xl'>
                                    <ImageNotSupportedIcon  style={{ width: '60%', height: '60%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(80, 80, 80, 0.5)'}} />

                                </div>)
                                :
                                (<div className="h-full w-full  rounded-2xl relative">
                                    {architectData.notableWorks[galleryIndex].image=="NULL" ? (
                                    <div className='w-full h-full shadow-sm border rounded-2xl'>
                                        <ImageNotSupportedIcon  style={{ width: '60%', height: '60%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(80, 80, 80, 0.5)'}} />

                                        </div>
                                    ) : (
                                        <img 
                                            src={architectData.notableWorks[galleryIndex].image} 
                                            alt="Sagrada Família" 
                                            className="h-full w-full object-cover rounded-2xl" 
                                        />
                                        
                                    )}
                                
                                    <button onClick={
                                        () => {
                                            navigate(`/wiki/architect/${architectData.notableWorks[galleryIndex].id}`);
                                            navigate(0);
                                    }} className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(136, 136, 136, 0.5)'}}>{architectData.notableWorks[galleryIndex].coordinateLocation.name}</button>
                                    <Button className="absolute bottom-1 left-2 p-3 text-white" variant="prev" onClick={handleGalleryPrevClick} style={{backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowBackIosIcon/></Button>
                                    <Button className="absolute bottom-1 right-2 p-3 text-white" variant="next" onClick={handleGalleryNextClick} style={{backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowForwardIosIcon/></Button>
                                </div>)
                            }    
                            </div>
                        </div>
                        <div className="h-1/2 w-[50vh] pb-6 pr-6 pl-3 pt-3">
                            <div className="h-full w-full rounded-2xl relative">
                            {architectData.notableWorks.length==0 ? (
                                    <div className='w-full h-full shadow-sm border rounded-2xl'>
                                    <ImageNotSupportedIcon  style={{ width: '60%', height: '60%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(80, 80, 80, 0.5)'}} />

                                    </div>)
                                :
                                    (<Map
                                        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                                        initialViewState={{
                                        longitude:  architectData.notableWorks[0].coordinateLocation.latitude,
                                        latitude: architectData.notableWorks[0].coordinateLocation.longitude,
                                        zoom: 5
                                        }}
                                        mapStyle="mapbox://styles/mapbox/streets-v9"
                                    >
                                        {architectData.notableWorks.map((work, index) => (
                                            <Marker key={index} longitude={work.coordinateLocation.latitude} latitude={work.coordinateLocation.longitude} color="red" />
                                        ))}
                                    </Map>)
                            }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}