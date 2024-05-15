import { Separator } from '@/components/ui/separator'
import { Navbar } from '../components'
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Architect() {
    const mockData = {   // building in archtiectural style ı var oradan mı alalım?
        name: "Mimar Sinan",
        description: "16th-century Ottoman chief architect and civil engineer",
        wikiText: "Mimar Sinan (Ottoman Turkish: معمار سينان, romanized: Mi'mâr Sinân; Turkish: Mimar Sinan, pronounced [miːˈmaːɾ siˈnan]; c. 1488/1490 – 17 July 1588) also known as Koca Mi'mâr Sinân Âğâ, ('Sinan Agha the Grand Architect' or 'Grand Sinan') was the chief Ottoman architect, engineer and mathematician for sultans Suleiman the Magnificent, Selim II and Murad III. He was responsible for the construction of more than 300 major structures, including the Selimiye Mosque in Edirne, the Kanuni Sultan Suleiman Bridge in Büyükçekmece, and the Mehmed Paša Sokolović Bridge in Višegrad, as well as other more modest projects such as madrasa's, külliyes, and bridges. His apprentices would later design the Sultan Ahmed Mosque in Istanbul and the Stari Most bridge in Mostar.",
        workLocation: "İstanbul", //?
        notableWork: [
            {id: "Q1267134", 
                name : "Ferhat Pasha Mosque", 
                image: "https://commons.wikimedia.org/wiki/File:NKD138_Ferhadija2.jpg", 
                coordinateLocation: {latitude: 43.8575, longitude: 18.4289},
                architecturalStyle: [{id:"Q527449",name:"Ottoman architecture",image:"https://commons.wikimedia.org/wiki/File:Exterior_of_Sultan_Ahmed_I_Mosque,_(old_name_P1020390.jpg).jpg"}]
            },
            {id: "Q178643", 
                name : "Süleymaniye Mosque", 
                image: "https://commons.wikimedia.org/wiki/File:S%C3%BCleymaniyeMosqueIstanbul_(cropped).jpg", 
                coordinateLocation: {latitude: 43.8575, longitude: 18.4289},
                architecturalStyle: [{id:"Q527449",name:"Ottoman architecture",image:"https://commons.wikimedia.org/wiki/File:Exterior_of_Sultan_Ahmed_I_Mosque,_(old_name_P1020390.jpg).jpg"}]
            }
        ],
        image: "https://commons.wikimedia.org/wiki/File:Mimar_Sinan_b%C3%BCst%C3%BC,_ODT%C3%9C.jpg",
        movement: "Ottoman architecture",   // wikide yok ama başka architectler için vardı
    }
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
                        <div className="h-full w-full bg-lime-500 rounded-2xl">
                            
                        </div>
                    </div>
                    <div className="h-1/2 w-[50vh] pb-6 pl-6 pr-3 pt-3">
                        <div className="h-full w-full bg-red-500 rounded-2xl">

                        </div>
                    </div>
                </div>
                <div className="h-screen w-[100vh]">
                    <div className="h-1/2 w-[50vh] pt-6 pr-6 pl-3 pb-3">
                        <div className="h-full w-full bg-zinc-500 rounded-2xl">

                        </div>
                    </div>
                    <div className="h-1/2 w-[50vh] pb-6 pr-6 pl-3 pt-3">
                        <div className="h-full w-full bg-yellow-500 rounded-2xl">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}