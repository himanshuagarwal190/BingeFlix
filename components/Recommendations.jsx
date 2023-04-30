import axios from "axios";
import { useEffect, useState, useRef } from "react";
import config from "../config";
import { useRouter } from "next/router";

export default function Recommendations(){
    const router = useRouter();
    const [moreWatch, setMoreWatch] = useState([])
    const [type, setType] = useState(null)
    const [watchId, setWatchId] = useState(null)
    const [moreButton, setMoreButton] = useState(true)
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
                "/recommendations?api_key=" +
                config.movieDBKey +
                "&page=" +
                pageCount
            const response = await axios.get(url)
            setMoreWatch(prevState => {
                if(!response.data.results.length) setMoreButton(false)
                return [...prevState, ...response.data.results]
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="mb-50">
            <h2 className="ml-50">Recommendations</h2>
            <div ref={tiles} className="recommendation">
                {moreWatch.length > 0 ?  moreWatch.map((data, id) =>( 
                    data.poster_path && <div key={id} className="recomm-card" onClick={() => router.push(`/watch/${type}_${data.id}`)}>
                        <img className="similar-img" src={`https://image.tmdb.org/t/p/original${data.poster_path}`} alt="" />
                        <div className="recomm-body">
                            <p>{data.title ? data.title : data.name} ({new Date(data.release_date ? data.release_date : data.first_air_date).getFullYear()})</p>
                            <p className="votes">{data.vote_average.toFixed(1)}</p>
                        </div>
                    </div>
                )): <div>{pageCount == 1 ? "No Recommendations found" : "Loading..."}</div>}
                {moreButton && <div className="more">
                    <div className="grey-badge py-10 click" onClick={() => getRecommendations(type, watchId, ++pageCount)}>
                        More+
                    </div>
                </div>}
            </div>
        </div>
        
    )
}