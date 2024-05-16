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


export default function Style() {
    let { qid } = useParams();
    const [styleData, setStyleData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true)

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

    const mockData = {
        name: "Brutalism",
        description: "20th century style of architecture",
        wikiText: "Brutalist architecture is an architectural style that emerged during the 1950s in the United Kingdom, among the reconstruction projects of the post-war era.[1][2][3][4][5] Brutalist buildings are characterised by minimalist constructions that showcase the bare building materials and structural elements over decorative design.[6][7] The style commonly makes use of exposed, unpainted concrete or brick, angular geometric shapes and a predominantly monochrome colour palette;[8][7] other materials, such as steel, timber, and glass, are also featured.",
        //influenced by     bi yerde architect i bi yerde related sytle ı veriyo // başka bi yerde invertor olarak var
        architect: [    // architectler sayfada çıkmıyo
            {name: "Reyner Banham",
                image: "",
                id: "Q647075"
            },
            {name: "Hans Asplund",
                image: "https://upload.wikimedia.org/wikipedia/commons/0/03/Hans_Asplund.jpg?20170113123545",
                id: "Q1280613"
            }
        ],
        buildings: [{name: "Buffalo City Court Building", coordinates: {latitude: 42.8867, longitude: -78.8784}}, {name: "Wotruba Church", coordinates: {latitude: 48.2083, longitude: 16.3707}}],
        // subclass relative style oluyo
        subclassOf: [{name: "Modern Architecture", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Brasilia_Congresso_Nacional_05_2007_221.jpg/1200px-Brasilia_Congresso_Nacional_05_2007_221.jpg?20130219091705"}],
        image: ["https://upload.wikimedia.org/wikipedia/commons/d/d2/Buffalo_City_Court_Building%2C_1971-74%2C_Pfohl%2C_Roberts_and_Biggie_%288448022295%29.jpg?20131020101541",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Wien_-_Wotrubakirche_%286%29.JPG/1200px-Wien_-_Wotrubakirche_%286%29.JPG?20200528153424"]
    }
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
                            <div className="h-full w-full bg-lime-500 rounded-2xl relative">
                            <img src={styleData.architects[architectIndex].image} alt="Sagrada Família" className="h-full w-full object-cover rounded-2xl" />
                                <div className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(136, 136, 136, 0.5)'}}>{styleData.architects[architectIndex].name}</div>
                                <Button className="absolute bottom-1 left-2 p-3 text-white" variant="prev" onClick={handleArchitectPrevClick} style={{backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowBackIosIcon/></Button>
                                <Button className="absolute bottom-1 right-2 p-3 text-white" variant="next" onClick={handleArchitectNextClick} style={{backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowForwardIosIcon/></Button>
                            
                            </div>
                        </div>
                        <div className="h-1/2 w-[50vh] pb-6 pl-6 pr-3 pt-3">
                            <div className="h-full w-full bg-red-500 rounded-2xl relative">
                                <img src={styleData.subclassOf[artIndex].image} alt="Sagrada Família" className="h-full w-full object-cover rounded-2xl" />
                                <div className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(136, 136, 136, 0.5)'}}>{styleData.subclassOf[artIndex].name}</div>
                                <Button className="absolute bottom-1 left-2 p-3 text-white" variant="prev" onClick={handleArtPrevClick} style={{backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowBackIosIcon/></Button>
                                <Button className="absolute bottom-1 right-2 p-3 text-white" variant="next" onClick={handleArtNextClick} style={{backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowForwardIosIcon/></Button>
                            
                            </div>
                        </div>
                    </div>
                    <div className="h-screen w-[100vh]">
                        <div className="h-1/2 w-[50vh] pt-6 pr-6 pl-3 pb-3">
                            <div className="h-full w-full bg-zinc-500 rounded-2xl relative">
                                <img src={styleData.image} alt="Sagrada Família" className="h-full w-full object-cover rounded-2xl" />
                                <div className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(136, 136, 136, 0.5)'}}>Gallery</div>
                            </div>
                        </div>
                        <div className="h-1/2 w-[50vh] pb-6 pr-6 pl-3 pt-3">
                            <div className="h-full w-full bg-yellow-500 rounded-2xl">
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
                                    <p>No buildings available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}