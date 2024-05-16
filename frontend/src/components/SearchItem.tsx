import { useNavigate } from "react-router-dom";

export default function SearchItem({item}) {
    const navigate = useNavigate()
    return (
        <div className="flex w-full rounded-md shadow-sm border p-3 gap-5" onClick={
            () => {
                navigate(`/wiki/${item.category}/${item.qid}`)
            }
        }>
            <img src={item["Image"]} alt={`${item["Item Label"]} Image`} style={{ width: "5rem", height: "5rem", objectFit: 'cover', borderRadius: '0.375rem'}}/>
            <div className="flex flex-col">
                <h1 className="font-bold text-2xl">{item["Item Label"]}</h1>
                <p className="text-xl">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
            </div>
        </div>
    )
}