import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import config from "../config";
import { useState } from "react";
import { PlayIcon, SearchIcon, StarIcon } from '@heroicons/react/solid'
import Recommendations from "./Recommendations";

export default function WatchId() {
    const router = useRouter();
    const [movieDetails, setMovieDetails] = useState({})
    const [trailerLink, setTrailerLink] = useState('#')
    const [castMembers, setcastMembers] = useState([])

    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query;
            const [selection, watchId] = id.split("_");
            getWatchDetails(selection, watchId);
            getTrailer(selection, watchId);
            getCast(selection, watchId);
        }
    }, [router.isReady, router]);

    async function getWatchDetails(selection, watchId) {
        try {
            const url = `/api/watch/?selection=${selection}&watchId=${watchId}`
            const response = await axios.get(url);
            setMovieDetails(response.data)

        } catch (error) {
            console.error(error);
        }
    }


    async function getTrailer(selection, watchId){
        try {
            const url = `/api/videos/?selection=${selection}&watchId=${watchId}`
            const response = await axios.get(url);
            for(let i = 0; i < response.data.results.length; i++){
                if(response.data.results[i].type == "Trailer"){
                    setTrailerLink(`https://www.youtube.com/watch?v=${response.data.results[i].key}`)
                    break
                }
            }
        } catch (error) {
            
        }
    }

    async function getCast(selection, watchId){
        try {
            const url = `/api/credits/?selection=${selection}&watchId=${watchId}`
            const response = await axios.get(url);
            setcastMembers(response.data.cast)
        } catch (error) {
            
        }
    }

    function getHourMinutes(){
        if(movieDetails.episode_run_time || movieDetails.runtime){
            let time = typeof movieDetails.runtime == 'number' ? movieDetails.runtime : movieDetails.episode_run_time[0]
            const hour = Math.floor(time/60)
            const minutes = time % 60
            return `${hour}h ${minutes}m`
        }
    }

    return (
        <div>
            <div className="w-100">
                {router.isReady && <div className="relative w-100">
                    <img className="imageBackdrop absolute" src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`} />
                    <div className="opacity"></div>
                    <img className="movieImage" src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`} />
                    <div className="movieContent">
                        <p className="movieTitle">{movieDetails.title ? movieDetails.title : movieDetails.original_name} ({new Date(movieDetails.release_date ? movieDetails.release_date : movieDetails.first_air_date).getFullYear()})</p>
                        <div className="flex">
                            <p>● {movieDetails.adult ? "A" : "PG-13"}</p>
                            <p className="little-m-l">● {movieDetails?.genres?.map(data => data.name).join(', ')}</p>
                            <p className="little-m-l">● {getHourMinutes()}</p>
                            <p className="little-m-l">● {movieDetails?.original_language?.toUpperCase()}</p>
                        </div>
                        <div className="flex">
                            <div className="h-40 flex item-center">
                                <div className="starIcon">
                                    <StarIcon />
                                </div>
                                <p className="pl-5 pb-5 iconText">{movieDetails.vote_average}</p>
                            </div>
                            {trailerLink !== '#' && <a target="_blank" rel="noreferrer" href={trailerLink} className="h-40 trailer flex item-center">
                                <div className="trailerIcon">
                                    <PlayIcon />
                                </div>
                                <p className="pl-5 pb-5 iconText">Play Trailer</p>
                            </a>}
                            <a target="_blank" rel="noreferrer" href={`https://www.google.com/search?q=${movieDetails.title ? movieDetails?.title : movieDetails?.original_name} (${new Date(movieDetails.release_date ? movieDetails.release_date : movieDetails.first_air_date).getFullYear()})`} className="h-40 trailer flex item-center">
                                <div className="trailerIcon">
                                    <SearchIcon />
                                </div>
                                <p className="pl-5 pb-5 iconText">Search</p>
                            </a>
                        </div>
                        <p className="overviewHeader">Overview</p>
                        <p className="overview">{movieDetails.overview}</p>
                        <p className="overviewHeader ptb-15">Cast</p>
                        <div className="cast">
                            {castMembers.map(data => {
                                if(data?.known_for_department == 'Acting' && data?.profile_path){
                                    return (
                                        <a target="_blank" rel="noreferrer" href={`https://www.google.com/search?q=${data.original_name}`} key={data.id} className="card">
                                            <img className="actorImage" src={`https://image.tmdb.org/t/p/original${data.profile_path}`} alt="Actor" />
                                            <p className="actorName">{data.original_name}</p>
                                            <p className="character">{data.character}</p>
                                        </a>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>}
            </div>
            <Recommendations/>

        </div>
    );
}
