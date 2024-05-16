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

export default function Architect() {
    let { qid } = useParams();
    const [architectData, setArhitectData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true)

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


    const mockData = {   // building in archtiectural style ı var oradan mı alalım?
        name: "Mimar Sinan",
        description: "16th-century Ottoman chief architect and civil engineer",
        wikiText: "Mimar Sinan (Ottoman Turkish: معمار سينان, romanized: Mi'mâr Sinân; Turkish: Mimar Sinan, pronounced [miːˈmaːɾ siˈnan]; c. 1488/1490 – 17 July 1588) also known as Koca Mi'mâr Sinân Âğâ, ('Sinan Agha the Grand Architect' or 'Grand Sinan') was the chief Ottoman architect, engineer and mathematician for sultans Suleiman the Magnificent, Selim II and Murad III. He was responsible for the construction of more than 300 major structures, including the Selimiye Mosque in Edirne, the Kanuni Sultan Suleiman Bridge in Büyükçekmece, and the Mehmed Paša Sokolović Bridge in Višegrad, as well as other more modest projects such as madrasa's, külliyes, and bridges. His apprentices would later design the Sultan Ahmed Mosque in Istanbul and the Stari Most bridge in Mostar.",
        workLocation: "İstanbul", //?
        notableWorks: [
            {id: "Q1267134", 
                name : "Ferhat Pasha Mosque", 
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/NKD138_Ferhadija2.jpg/900px-NKD138_Ferhadija2.jpg?20160702152008", 
                coordinateLocation: {latitude: 41.1406, longitude: 28.4596},
                architecturalStyle: [{id:"Q527449",name:"Ottoman architecture",image:"https://commons.wikimedia.org/wiki/File:Exterior_of_Sultan_Ahmed_I_Mosque,_(old_name_P1020390.jpg).jpg"}]
            },
            {id: "Q178643", 
                name : "Süleymaniye Mosque", 
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/S%C3%BCleymaniyeMosqueIstanbul_%28cropped%29.jpg/1199px-S%C3%BCleymaniyeMosqueIstanbul_%28cropped%29.jpg?20240217193804", 
                coordinateLocation: {latitude: 41.0160, longitude: 28.9640},
                architecturalStyle: [{id:"Q527449",name:"Ottoman architecture",image:"https://commons.wikimedia.org/wiki/File:Exterior_of_Sultan_Ahmed_I_Mosque,_(old_name_P1020390.jpg).jpg"}]
            }
        ],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Mimar_Sinan_b%C3%BCst%C3%BC%2C_ODT%C3%9C.jpg/1200px-Mimar_Sinan_b%C3%BCst%C3%BC%2C_ODT%C3%9C.jpg?20091122122921",
        movement: {name:"Ottoman architecture", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Exterior_of_Sultan_Ahmed_I_Mosque%2C_%28old_name_P1020390.jpg%29.jpg/1024px-Exterior_of_Sultan_Ahmed_I_Mosque%2C_%28old_name_P1020390.jpg%29.jpg"},   // wikide yok ama başka architectler için vardı
    }
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
        setArtIndex(prevIndex => Math.min(prevIndex + 1, architectData.architecturalStyle.length - 1)); // Increase index by 1, but ensure it doesn't exceed the length of the image array
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
                            <div className="h-full w-full bg-lime-500 rounded-2xl relative">
                                <img src={architectData.image} alt="Sagrada Família" className="h-full w-full object-cover rounded-2xl" />
                                <div className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(136, 136, 136, 0.5)'}}>Profile</div>
                            </div>
                        </div>
                        <div className="h-1/2 w-[50vh] pb-6 pl-6 pr-3 pt-3">
                            <div className="h-full w-full bg-red-500 rounded-2xl relative">
                                <img src={architectData.movements[artIndex].image} alt="Sagrada Família" className="h-full w-full object-cover rounded-2xl" />
                                <div className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(136, 136, 136, 0.5)'}}>{architectData.movements[artIndex].name}</div>
                                <Button className="absolute bottom-1 left-2 p-3 text-white" variant="prev" onClick={handleArtPrevClick} style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5), fontSize:18', padding: '2px 10px', fontSize:18 }}><ArrowBackIosIcon/></Button>
                                <Button className="absolute bottom-1 right-2 p-3 text-white" variant="next" onClick={handleArtNextClick} style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18}}><ArrowForwardIosIcon/></Button>
                            </div>
                        </div>
                    </div>
                    <div className="h-screen w-[100vh]">
                        <div className="h-1/2 w-[50vh] pt-6 pr-6 pl-3 pb-3">
                            <div className="h-full w-full bg-zinc-500 rounded-2xl relative">
                                <img src={architectData.notableWorks[galleryIndex].image} alt="Sagrada Família" className="h-full w-full object-cover rounded-2xl" />
                                <div className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(136, 136, 136, 0.5)'}}>{architectData.notableWorks[galleryIndex].name}</div>
                                <Button className="absolute bottom-1 left-2 p-3 text-white" variant="prev" onClick={handleGalleryPrevClick} style={{backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowBackIosIcon/></Button>
                                <Button className="absolute bottom-1 right-2 p-3 text-white" variant="next" onClick={handleGalleryNextClick} style={{backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowForwardIosIcon/></Button>
                            
                            </div>
                        </div>
                        <div className="h-1/2 w-[50vh] pb-6 pr-6 pl-3 pt-3">
                            <div className="h-full w-full bg-yellow-500 rounded-2xl">
                                <Map
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
                                </Map>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}