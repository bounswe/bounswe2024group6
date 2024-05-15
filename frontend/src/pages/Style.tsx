import { Separator } from '@/components/ui/separator'
import { Navbar } from '../components'
import { ScrollArea } from "@/components/ui/scroll-area"
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Style() {
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
    const [galleryIndex, setGalleryIndex] = useState(0);
    const handleGalleryPrevClick = () => {
        setGalleryIndex(prevIndex => Math.max(prevIndex - 1, 0)); // Decrease index by 1, but ensure it doesn't go below 0
    };
    const handleGalleryNextClick = () => {
        setGalleryIndex(prevIndex => Math.min(prevIndex + 1, mockData.image.length - 1)); // Increase index by 1, but ensure it doesn't exceed the length of the image array
    };
    const [architectIndex, setArchitectIndex] = useState(0);
    const handleArchitectPrevClick = () => {
        setArchitectIndex(prevIndex => Math.max(prevIndex - 1, 0)); // Decrease index by 1, but ensure it doesn't go below 0
    };
    const handleArchitectNextClick = () => {
        setArchitectIndex(prevIndex => Math.min(prevIndex + 1, mockData.architect.length - 1)); // Increase index by 1, but ensure it doesn't exceed the length of the image array
    };
    const [artIndex, setArtIndex] = useState(0);
    const handleArtPrevClick = () => {
        setArtIndex(prevIndex => Math.max(prevIndex - 1, 0)); // Decrease index by 1, but ensure it doesn't go below 0
    };
    const handleArtNextClick = () => {
        setArtIndex(prevIndex => Math.min(prevIndex + 1, mockData.subclassOf.length - 1)); // Increase index by 1, but ensure it doesn't exceed the length of the image array
    };
    return (
        <div className="h-screen w-screen">
            <Navbar />
            <div className="h-screen w-screen flex">
                <div className="h-full w-full py-6 pl-6">
                    <ScrollArea className="h-full w-full rounded-2xl shadow-sm border">
                        <div className="p-6 flex flex-col gap-2">
                            <h1 className="font-bold text-4xl">{mockData.name}</h1>
                            <Separator />
                            <p>{mockData.wikiText}</p>
                        </div>
                    </ScrollArea>
                </div>
                <div className="h-screen w-[100vh]">
                    <div className="h-1/2 w-[50vh] pt-6 pl-6 pr-3 pb-3">
                        <div className="h-full w-full bg-lime-500 rounded-2xl relative">
                        <img src={mockData.architect[architectIndex].image} alt="Sagrada Família" className="h-full w-full object-cover rounded-2xl" />
                            <div className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(136, 136, 136, 0.5)'}}>{mockData.architect[architectIndex].name}</div>
                            <Button className="absolute bottom-1 left-2 p-3 text-white" variant="prev" onClick={handleArchitectPrevClick} style={{backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowBackIosIcon/></Button>
                            <Button className="absolute bottom-1 right-2 p-3 text-white" variant="next" onClick={handleArchitectNextClick} style={{backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowForwardIosIcon/></Button>
                        
                        </div>
                    </div>
                    <div className="h-1/2 w-[50vh] pb-6 pl-6 pr-3 pt-3">
                        <div className="h-full w-full bg-red-500 rounded-2xl relative">
                            <img src={mockData.subclassOf[artIndex].image} alt="Sagrada Família" className="h-full w-full object-cover rounded-2xl" />
                            <div className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(136, 136, 136, 0.5)'}}>{mockData.subclassOf[artIndex].name}</div>
                            <Button className="absolute bottom-1 left-2 p-3 text-white" variant="prev" onClick={handleArtPrevClick} style={{backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowBackIosIcon/></Button>
                            <Button className="absolute bottom-1 right-2 p-3 text-white" variant="next" onClick={handleArtNextClick} style={{backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowForwardIosIcon/></Button>
                        
                        </div>
                    </div>
                </div>
                <div className="h-screen w-[100vh]">
                    <div className="h-1/2 w-[50vh] pt-6 pr-6 pl-3 pb-3">
                        <div className="h-full w-full bg-zinc-500 rounded-2xl relative">
                            <img src={mockData.image[galleryIndex]} alt="Sagrada Família" className="h-full w-full object-cover rounded-2xl" />
                            <div className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(136, 136, 136, 0.5)'}}>Gallery</div>
                            <Button className="absolute bottom-1 left-2 p-3 text-white" variant="prev" onClick={handleGalleryPrevClick} style={{backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowBackIosIcon/></Button>
                            <Button className="absolute bottom-1 right-2 p-3 text-white" variant="next" onClick={handleGalleryNextClick} style={{backgroundColor: 'rgba(136, 136, 136, 0.5)' }}><ArrowForwardIosIcon/></Button>
                        </div>
                    </div>
                    <div className="h-1/2 w-[50vh] pb-6 pr-6 pl-3 pt-3">
                        <div className="h-full w-full bg-yellow-500 rounded-2xl">
                            <Map
                                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                                initialViewState={{
                                longitude:  mockData.buildings[0].coordinates.longitude,
                                latitude: mockData.buildings[0].coordinates.latitude,
                                zoom: 5
                                }}
                                mapStyle="mapbox://styles/mapbox/streets-v9"
                            >
                                {mockData.buildings.map((work, index) => (
                                    <Marker key={index} longitude={work.coordinates.longitude} latitude={work.coordinates.latitude} color="red" />
                                ))}
                            </Map>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}