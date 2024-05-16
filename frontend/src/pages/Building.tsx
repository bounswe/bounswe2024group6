import { Separator } from '@/components/ui/separator'
import { Navbar } from '../components'
import { ScrollArea } from "@/components/ui/scroll-area"
import * as React from 'react';
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


export default function Building() {
    let { qid } = useParams();
    const [buildingData, setBuildingData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {
        axios.post(`${BASE_URL}:8000/building/`, {entity_id: qid})
        .then(function (response) {
            if (response.hasOwnProperty("data")) {
                setBuildingData(response.data);
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
        setGalleryIndex(prevIndex => Math.min(prevIndex + 1, buildingData.image.length - 1)); // Increase index by 1, but ensure it doesn't exceed the length of the image array
    };
    const [architectIndex, setArchitectIndex] = useState(0);
    const handleArchitectPrevClick = () => {
        setArchitectIndex(prevIndex => Math.max(prevIndex - 1, 0)); // Decrease index by 1, but ensure it doesn't go below 0
    };
    const handleArchitectNextClick = () => {
        setArchitectIndex(prevIndex => Math.min(prevIndex + 1, buildingData.architect.length - 1)); // Increase index by 1, but ensure it doesn't exceed the length of the image array
    };
    const [artIndex, setArtIndex] = useState(0);
    const handleArtPrevClick = () => {
        setArtIndex(prevIndex => Math.max(prevIndex - 1, 0)); // Decrease index by 1, but ensure it doesn't go below 0
    };
    const handleArtNextClick = () => {
        setArtIndex(prevIndex => Math.min(prevIndex + 1, buildingData.architecturalStyle.length - 1)); // Increase index by 1, but ensure it doesn't exceed the length of the image array
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
                                <h1 className="font-bold text-4xl">{buildingData.name}</h1>
                                <Separator />
                                <p>{buildingData.wikiText}</p>
                            </div>
                        </ScrollArea>
                    </div>
                    <div className="h-screen w-[100vh]">
                        <div className="h-1/2 w-[50vh] pt-6 pl-6 pr-3 pb-3">
                            <div className="h-full w-full rounded-2xl relative">
                                {buildingData.architect[architectIndex].image=="NULL" ? (
                                    <div className='w-full h-full shadow-sm border rounded-2xl'>
                                    <ImageNotSupportedIcon  style={{ width: '60%', height: '60%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(80, 80, 80, 0.5)'}} />

                                    </div>
                                ) : (
                                    <img 
                                        src={buildingData.architect[architectIndex].image} 
                                        alt="Sagrada Família" 
                                        className="h-full w-full object-cover rounded-2xl" 
                                    />
                                    
                                )}
                                <button onClick={
                                            () => {
                                                navigate(`/wiki/architect/${buildingData.architect[architectIndex].id}`);
                                                navigate(0);
                                            }} className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18}}>{buildingData.architect[architectIndex].name}</button>
                                <Button className="absolute bottom-1 left-2 p-3 text-white" variant="prev" onClick={handleArchitectPrevClick} style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18 }}><ArrowBackIosIcon/></Button>
                                <Button className="absolute bottom-1 right-2 p-3 text-white" variant="next" onClick={handleArchitectNextClick} style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18 }}><ArrowForwardIosIcon/></Button>
                            </div>
                        </div>
                        <div className="h-1/2 w-[50vh] pb-6 pl-6 pr-3 pt-3">
                            <div className="h-full w-full  rounded-2xl relative">
                                {buildingData.architecturalStyle[artIndex].image=="NULL" ? (
                                    <div className='w-full h-full shadow-sm border rounded-2xl'>
                                    <ImageNotSupportedIcon  style={{ width: '60%', height: '60%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(80, 80, 80, 0.5)'}} />

                                    </div>
                                ) : (
                                    <img 
                                        src={buildingData.architecturalStyle[artIndex].image} 
                                        alt="Sagrada Família" 
                                        className="h-full w-full object-cover rounded-2xl" 
                                    />
                                    
                                )}
                                <button onClick={
                                            () => {
                                                navigate(`/wiki/style/${buildingData.architecturalStyle[artIndex].id}`);
                                                navigate(0);
                                            }} className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18 }}>{buildingData.architecturalStyle[artIndex].name}</button>
                                <Button className="absolute bottom-1 left-2 p-3 text-white" variant="prev" onClick={handleArtPrevClick} style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5), fontSize:18', padding: '2px 10px', fontSize:18 }}><ArrowBackIosIcon/></Button>
                                <Button className="absolute bottom-1 right-2 p-3 text-white" variant="next" onClick={handleArtNextClick} style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18}}><ArrowForwardIosIcon/></Button>
                            </div>
                        </div>
                    </div>
                    <div className="h-screen w-[100vh]">
                        <div className="h-1/2 w-[50vh] pt-6 pr-6 pl-3 pb-3">
                            <div className="h-full w-full rounded-2xl relative">
                                {buildingData.image[galleryIndex]=="NULL" ? (
                                    <div className='w-full h-full shadow-sm border rounded-2xl'>
                                    <ImageNotSupportedIcon  style={{ width: '60%', height: '60%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(80, 80, 80, 0.5)'}} />

                                    </div>
                                ) : (
                                    <img 
                                        src={buildingData.image[galleryIndex]} 
                                        alt="Sagrada Família" 
                                        className="h-full w-full object-cover rounded-2xl" 
                                    />
                                    
                                )}
                                <div className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18}}>Gallery</div>
                                <Button className="absolute bottom-1 left-2 p-3 text-white" variant="prev" onClick={handleGalleryPrevClick} style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18 }}><ArrowBackIosIcon/></Button>
                                <Button className="absolute bottom-1 right-2 p-3 text-white" variant="next" onClick={handleGalleryNextClick} style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18 }}><ArrowForwardIosIcon/></Button>
                            </div>
                        </div>
                        <div className="h-1/2 w-[50vh] pb-6 pr-6 pl-3 pt-3">
                            <div className="h-full w-full rounded-2xl relative">
                                <Map
                                    mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                                    initialViewState={{
                                    longitude:  buildingData.coordinates.latitude,
                                    latitude: buildingData.coordinates.longitude,
                                    zoom: 10
                                    }}
                                    mapStyle="mapbox://styles/mapbox/streets-v9"
                                >
                                <Marker longitude={buildingData.coordinates.latitude} latitude={buildingData.coordinates.longitude} color="red" />
                                </Map>
                                <div className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18}}>{buildingData.country}</div>                        
                            </div>
                        </div>
                    </div>
                </div>
                
            }
        </div>
    )
}