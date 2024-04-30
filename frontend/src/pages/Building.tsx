import { Separator } from '@/components/ui/separator'
import { Navbar } from '../components'
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Building() {
    return (
        <div className="h-screen w-screen">
            <Navbar />
            <div className="h-screen w-screen flex">
                <div className="h-full w-full py-6 pl-6">
                    <ScrollArea className="h-full w-full rounded-2xl shadow-sm border">
                        <div className="p-6 flex flex-col gap-2">
                            <h1 className="font-bold text-4xl">Empire State Building</h1>
                            <Separator />
                            <p>The Empire State Building is a 102-story Art Deco skyscraper in the Midtown South neighborhood of Manhattan in New York City. The building was designed by Shreve, Lamb & Harmon and built from 1930 to 1931. Its name is derived from "Empire State", the nickname of the state of New York. The building has a roof height of 1,250 feet (380 m) and stands a total of 1,454 feet (443.2 m) tall, including its antenna. The Empire State Building was the world's tallest building until the first tower of the World Trade Center was topped out in 1970; following the September 11 attacks in 2001, the Empire State Building was New York City's tallest building until it was surpassed in 2012 by One World Trade Center. As of 2022, the building is the seventh-tallest building in New York City, the ninth-tallest completed skyscraper in the United States, and the 54th-tallest in the world.</p>
                            <p>The site of the Empire State Building, on the west side of Fifth Avenue between West 33rd and 34th Streets, was developed in 1893 as the Waldorf–Astoria Hotel. In 1929, Empire State Inc. acquired the site and devised plans for a skyscraper there. The design for the Empire State Building was changed fifteen times until it was ensured to be the world's tallest building. Construction started on March 17, 1930, and the building opened thirteen and a half months afterward on May 1, 1931. Despite favorable publicity related to the building's construction, because of the Great Depression and World War II, its owners did not make a profit until the early 1950s.</p>
                            <p>The building's Art Deco architecture, height, and observation decks have made it a popular attraction. Around four million tourists from around the world annually visit the building's 86th- and 102nd-floor observatories; an additional indoor observatory on the 80th floor opened in 2019. The Empire State Building is an international cultural icon: it has been featured in more than 250 television series and films since the film King Kong was released in 1933. The building's size has become the global standard of reference to describe the height and length of other structures. A symbol of New York City, the building has been named as one of the Seven Wonders of the Modern World by the American Society of Civil Engineers. It was ranked first on the American Institute of Architects' List of America's Favorite Architecture in 2007. Additionally, the Empire State Building and its ground-floor interior were designated city landmarks by the New York City Landmarks Preservation Commission in 1980, and were added to the National Register of Historic Places as a National Historic Landmark in 1986.</p>
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