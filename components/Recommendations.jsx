import axios from "axios";
import { useEffect, useState, useRef } from "react";
import config from "../config";
import { useRouter } from "next/router";

export default function Recommendations(){
    const router = useRouter();
    const [moreWatch, setMoreWatch] = useState([])
    const [type, setType] = useState(null)
    const [watchId, setWatchId] = useState(null)
    const tiles = useRef()
    let pageCount = 1

    useEffect(() =>{
        if (router.isReady){
            const { id } = router.query;
            pageCount = 1
            const [selection, Id] = id.split("_");
            setMoreWatch([])
            setType(selection)
            setWatchId(Id)
            getRecommendations(selection, Id, pageCount)
            tiles.current.scrollLeft = 0
        }
    }, [router.isReady, router])


    async function getRecommendations(selection, id, pageCount){
        try {
            console.log(watchId, 'hiiiii')
            const url =
                config.movieDBAPIUrl +
                `/${selection}/` +
                id +
                "/similar?api_key=" +
                config.movieDBKey +
                "&page=" +
                pageCount
            const response = await axios.get(url)
            setMoreWatch(prevState => [...prevState, ...response.data.results])
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="mb-50">
            <h2 className="ml-50">Recommendations</h2>
            <div ref={tiles} className="recommendation">
                {moreWatch.length > 0 ?  moreWatch.map((data, id) => (
                    <div key={id} className="recomm-card" onClick={() => router.push(`/watch/${type}_${data.id}`)}>
                        <img className="similar-img" src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} alt="" />
                        <div className="recomm-body">
                            <p>{data.title ? data.title : data.name} ({new Date(data.release_date ? data.release_date : data.first_air_date).getFullYear()})</p>
                            <p className="votes">{data.vote_average.toFixed(1)}</p>
                        </div>
                    </div>
                )): <div>Loading...</div>}
                <div className="more">
                    <div className="grey-badge py-10 click" onClick={() => getRecommendations(type, watchId, ++pageCount)}>
                        More+
                    </div>
                </div>
            </div>
        </div>
        
    )
}