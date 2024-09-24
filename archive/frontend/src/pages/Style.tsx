import { Separator } from '@/components/ui/separator'
import { Navbar } from '../components'
import { ScrollArea } from "@/components/ui/scroll-area"
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import BASE_URL from '../lib/baseUrl'
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from 'react-router-dom';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { useNavigate } from "react-router-dom";


export default function Style() {
    let { qid } = useParams();
    const [styleData, setStyleData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        axios.post(`${BASE_URL}:8000/style/`, {entity_id: qid})
        .then(function (response) {
            if (response.hasOwnProperty("data")) {
                setStyleData(response.data);
                console.log(response)
            }
            setIsLoading(false)
        })
        .catch(function (error) {
            console.log(error);
            setIsLoading(false)
        })
    }, [qid]);

    const [architectIndex, setArchitectIndex] = useState(0);
    const handleArchitectPrevClick = () => {
        setArchitectIndex(prevIndex => Math.max(prevIndex - 1, 0)); // Decrease index by 1, but ensure it doesn't go below 0
    };
    const handleArchitectNextClick = () => {
        setArchitectIndex(prevIndex => Math.min(prevIndex + 1, styleData.architects.length - 1)); // Increase index by 1, but ensure it doesn't exceed the length of the image array
    };
    const [artIndex, setArtIndex] = useState(0);
    const handleArtPrevClick = () => {
        setArtIndex(prevIndex => Math.max(prevIndex - 1, 0)); // Decrease index by 1, but ensure it doesn't go below 0
    };
    const handleArtNextClick = () => {
        setArtIndex(prevIndex => Math.min(prevIndex + 1, styleData.subclassOf.length - 1)); // Increase index by 1, but ensure it doesn't exceed the length of the image array
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
                                <h1 className="font-bold text-4xl">{styleData.name}</h1>
                                <Separator />
                                <p>{styleData.wikiText}</p>
                            </div>
                        </ScrollArea>
                    </div>
                    <div className="h-screen w-[100vh]">
                        <div className="h-1/2 w-[50vh] pt-6 pl-6 pr-3 pb-3">
                            <div className="h-full w-full rounded-2xl relative">
                                <div>
                                    {styleData.architects.length === 0 ? (
                                        // If there are no architects
                                        <div className='w-full h-full shadow-sm border rounded-2xl'>
                                            <ImageNotSupportedIcon style={{ width: '60%', height: '60%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(80, 80, 80, 0.5)' }} />
                                        </div>                                    ) : (
                                        // If there are architects
                                        <div>
                                            {styleData.architects[architectIndex].image === "NULL" ? (
                                                // If architect image is NULL
                                                <div className='w-full h-full shadow-sm border rounded-2xl'>
                                                    <ImageNotSupportedIcon style={{ width: '60%', height: '60%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(80, 80, 80, 0.5)' }} />
                                                </div>
                                            ) : (
                                                // If architect image is not NULL
                                                <img
                                                    src={styleData.architects[architectIndex].image}
                                                    alt="Sagrada Família"
                                                    className="h-full w-full object-cover rounded-2xl"
                                                />
                                            )}
                                            <div onClick={
                                            () => {
                                                navigate(`/wiki/architect/${styleData.architects[architectIndex].id}`);
                                                navigate(0);
                                            }} className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(136, 136, 136, 0.5)' }}>{styleData.architects[architectIndex].name}</div>
                                            <Button className="absolute bottom-1 left-2 p-3 text-white" variant="prev" onClick={handleArchitectPrevClick} style={{ backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowBackIosIcon /></Button>
                                            <Button className="absolute bottom-1 right-2 p-3 text-white" variant="next" onClick={handleArchitectNextClick} style={{ backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowForwardIosIcon /></Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="h-1/2 w-[50vh] pb-6 pl-6 pr-3 pt-3">
                            <div className="h-full w-full rounded-2xl relative">
                                {styleData.subclassOf[artIndex].image=="NULL" ? (
                                    <div className='w-full h-full shadow-sm border rounded-2xl'>
                                    <ImageNotSupportedIcon  style={{ width: '60%', height: '60%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(80, 80, 80, 0.5)'}} />

                                    </div>
                                ) : (
                                    <img 
                                        src={styleData.subclassOf[artIndex].image} 
                                        alt="Sagrada Família" 
                                        className="h-full w-full object-cover rounded-2xl" 
                                    />
                                )}
                                <button onClick={
                                () => {
                                    navigate(`/wiki/style/${styleData.subclassOf[artIndex].id}`);
                                    navigate(0);
                                }} className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(136, 136, 136, 0.5)'}}>{styleData.subclassOf[artIndex].name}</button>
                                <Button className="absolute bottom-1 left-2 p-3 text-white" variant="prev" onClick={handleArtPrevClick} style={{backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowBackIosIcon/></Button>
                                <Button className="absolute bottom-1 right-2 p-3 text-white" variant="next" onClick={handleArtNextClick} style={{backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowForwardIosIcon/></Button>
                            
                            </div>
                        </div>
                    </div>
                    <div className="h-screen w-[100vh]">
                        <div className="h-1/2 w-[50vh] pt-6 pr-6 pl-3 pb-3">
                            <div className="h-full w-full rounded-2xl relative">
                                {styleData.image=="NULL" ? (
                                    <div className='w-full h-full shadow-sm border rounded-2xl'>
                                    <ImageNotSupportedIcon  style={{ width: '60%', height: '60%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(80, 80, 80, 0.5)'}} />

                                    </div>
                                ) : (
                                    <img 
                                        src={styleData.image} 
                                        alt="Sagrada Família" 
                                        className="h-full w-full object-cover rounded-2xl" 
                                    />
                                    
                                )}
                                <div className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(136, 136, 136, 0.5)'}}>Gallery</div>
                            </div>
                        </div>
                        <div className="h-1/2 w-[50vh] pb-6 pr-6 pl-3 pt-3">
                            <div className="h-full w-full rounded-2xl relative">
                                {styleData.buildings.length > 0 ? (
                                    <Map
                                        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                                        initialViewState={{
                                            longitude: styleData.buildings[0].coordinates.longitude,
                                            latitude: styleData.buildings[0].coordinates.latitude,
                                            zoom: 5
                                        }}
                                        mapStyle="mapbox://styles/mapbox/streets-v9"
                                    >
                                        {styleData.buildings.map((work, index) => (
                                            <Marker key={index} longitude={work.coordinates.longitude} latitude={work.coordinates.latitude} color="red" />
                                        ))}
                                    </Map>
                                ) : (
                                    <div className='w-full h-full shadow-sm border rounded-2xl'>
                                    <ImageNotSupportedIcon  style={{ width: '60%', height: '60%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(80, 80, 80, 0.5)'}} />

                                    </div>

                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}