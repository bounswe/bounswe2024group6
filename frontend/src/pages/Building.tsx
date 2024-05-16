import { Separator } from '@/components/ui/separator'
import { Navbar } from '../components'
import { ScrollArea } from "@/components/ui/scroll-area"
import * as React from 'react';
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export default function Building() {
    const mockData = {
        name: "Sagrada Família",
        description: "monumental Roman Catholic basilica under construction in Barcelona, Catalonia, Spain.",
        wikiText: "The Sagrada Família is a large unfinished Roman Catholic basilica in Barcelona, Catalonia, Spain. Designed by Catalan architect Antoni Gaudí (1852–1926), his work on the building is part of a UNESCO World Heritage Site. In November 2010, Pope Benedict XVI consecrated the church and proclaimed it a minor basilica. On 7 November 2010, it became a minor basilica, as designated by Pope Benedict XVI.",
        country: "Spain",
        architect: [{name: "Antoni Gaudí",
                    image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Gaud%C3%AD_%281878%29.jpg",
                    id: "Q25328"},
                    {name: "X",
                    image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Sagrada_Familia_8-12-21_%281%29.jpg",
                    id: "Q25328"    // ?
                    }],
        image: ["https://upload.wikimedia.org/wikipedia/commons/5/57/Sagrada_Familia_8-12-21_%281%29.jpg","https://upload.wikimedia.org/wikipedia/commons/0/03/Hans_Asplund.jpg?20170113123545"],
        architecturalStyle: [{id:"Q1122677",name:"Catalan modernism",image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/15_Museu_d%27Art_de_Cerdanyola%2C_sala_modernista.jpg/800px-15_Museu_d%27Art_de_Cerdanyola%2C_sala_modernista.jpg"},
                                {id:"Q186363",name:"Gothic Revival",image:"https://upload.wikimedia.org/wikipedia/commons/d/dc/Royal_Courts_of_Justice_20130414_065.JPG?20130907175057"}],
        coordinates: {
            latitude: 41.40369,
            longitude: 2.17433
        }
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
        setArtIndex(prevIndex => Math.min(prevIndex + 1, mockData.architecturalStyle.length - 1)); // Increase index by 1, but ensure it doesn't exceed the length of the image array
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
                            <p>The site of the Empire State Building, on the west side of Fifth Avenue between West 33rd and 34th Streets, was developed in 1893 as the Waldorf–Astoria Hotel. In 1929, Empire State Inc. acquired the site and devised plans for a skyscraper there. The design for the Empire State Building was changed fifteen times until it was ensured to be the world's tallest building. Construction started on March 17, 1930, and the building opened thirteen and a half months afterward on May 1, 1931. Despite favorable publicity related to the building's construction, because of the Great Depression and World War II, its owners did not make a profit until the early 1950s.</p>
                            <p>The building's Art Deco architecture, height, and observation decks have made it a popular attraction. Around four million tourists from around the world annually visit the building's 86th- and 102nd-floor observatories; an additional indoor observatory on the 80th floor opened in 2019. The Empire State Building is an international cultural icon: it has been featured in more than 250 television series and films since the film King Kong was released in 1933. The building's size has become the global standard of reference to describe the height and length of other structures. A symbol of New York City, the building has been named as one of the Seven Wonders of the Modern World by the American Society of Civil Engineers. It was ranked first on the American Institute of Architects' List of America's Favorite Architecture in 2007. Additionally, the Empire State Building and its ground-floor interior were designated city landmarks by the New York City Landmarks Preservation Commission in 1980, and were added to the National Register of Historic Places as a National Historic Landmark in 1986.</p>
                        </div>
                    </ScrollArea>
                </div>
                <div className="h-screen w-[100vh]">
                    <div className="h-1/2 w-[50vh] pt-6 pl-6 pr-3 pb-3">
                        <div className="h-full w-full bg-lime-500 rounded-2xl relative">
                            <img src={mockData.architect[architectIndex].image} alt="Sagrada Família" className="h-full w-full object-cover rounded-2xl" />
                            <div className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18}}>{mockData.architect[architectIndex].name}</div>
                            <Button className="absolute bottom-1 left-2 p-3 text-white" variant="prev" onClick={handleArchitectPrevClick} style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18 }}><ArrowBackIosIcon/></Button>
                            <Button className="absolute bottom-1 right-2 p-3 text-white" variant="next" onClick={handleArchitectNextClick} style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18 }}><ArrowForwardIosIcon/></Button>
                        </div>
                    </div>
                    <div className="h-1/2 w-[50vh] pb-6 pl-6 pr-3 pt-3">
                        <div className="h-full w-full bg-red-500 rounded-2xl relative">
                            <img src={mockData.architecturalStyle[artIndex].image} alt="Sagrada Família" className="h-full w-full object-cover rounded-2xl" />
                            <div className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18 }}>{mockData.architecturalStyle[artIndex].name}</div>
                            <Button className="absolute bottom-1 left-2 p-3 text-white" variant="prev" onClick={handleArtPrevClick} style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5), fontSize:18', padding: '2px 10px', fontSize:18 }}><ArrowBackIosIcon/></Button>
                            <Button className="absolute bottom-1 right-2 p-3 text-white" variant="next" onClick={handleArtNextClick} style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18 , fontSize:18}}><ArrowForwardIosIcon/></Button>
                        </div>
                    </div>
                </div>
                <div className="h-screen w-[100vh]">
                    <div className="h-1/2 w-[50vh] pt-6 pr-6 pl-3 pb-3">
                        <div className="h-full w-full bg-zinc-500 rounded-2xl relative">
                            <img src={mockData.image[galleryIndex]} alt="Sagrada Família" className="h-full w-full object-cover rounded-2xl" />
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
                                longitude:  mockData.coordinates.longitude,
                                latitude: mockData.coordinates.latitude,
                                zoom: 10
                                }}
                                mapStyle="mapbox://styles/mapbox/streets-v9"
                            >
                                <Marker longitude={mockData.coordinates.longitude} latitude={mockData.coordinates.latitude} color="red" />
                            </Map>
                            <div className="absolute top-1 left-2 p-3 text-white rounded-md" style={{ borderBottom: '0.2px solid white left-2', backgroundColor: 'rgba(80, 80, 80, 0.5)', padding: '2px 10px', fontSize:18}}>{mockData.country}</div>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}