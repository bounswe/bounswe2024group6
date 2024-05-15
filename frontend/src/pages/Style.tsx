import { Separator } from '@/components/ui/separator'
import { Navbar } from '../components'
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Style() {
    const mockData = {
        name: "Brutalism",
        description: "20th century style of architecture",
        wikiText: "Brutalist architecture is an architectural style that emerged during the 1950s in the United Kingdom, among the reconstruction projects of the post-war era.[1][2][3][4][5] Brutalist buildings are characterised by minimalist constructions that showcase the bare building materials and structural elements over decorative design.[6][7] The style commonly makes use of exposed, unpainted concrete or brick, angular geometric shapes and a predominantly monochrome colour palette;[8][7] other materials, such as steel, timber, and glass, are also featured.",
        //influenced by     bi yerde architect i bi yerde related sytle ı veriyo
        discovererOrInventor: [    // architectler sayfada çıkmıyo
            {name: "Reyner Banham",
                image: "",
                id: "Q647075"
            },
            {name: "Hans Asplund",
                image: "https://commons.wikimedia.org/wiki/File:Hans_Asplund.jpg",
                id: "Q1280613"
            }
        ],
        image: ["https://commons.wikimedia.org/wiki/File:Buffalo_City_Court_Building,_1971-74,_Pfohl,_Roberts_and_Biggie_(8448022295).jpg",
                "https://commons.wikimedia.org/wiki/File:Wien_-_Wotrubakirche_(6).JPG"]
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