import axios from 'axios'
import { useState, useEffect } from 'react'
import config from '../config'
import Link from 'next/link'

export default function Tiles({ selection, movieData, setMovieData, genreSelected }){
    let scrollCount = 1

    useEffect(()=>{
        setMovieData([])
        scrollCount = 1
        getMovies(scrollCount)
        window.addEventListener("scroll", onPageScroll);
        return () => window.removeEventListener("scroll", onPageScroll)
    },[selection, genreSelected])

    async function getMovies(pageCount){
        try {
            const url = config.movieDBAPIUrl + '/trending/' + selection + '/week?api_key=' + config.movieDBKey + '&page=' + pageCount
            const response = await axios.get(url)
            if(genreSelected != 0){
                const movieArr = response.data.results.filter(movie  =>{
                    if(movie.genre_ids.includes(genreSelected)) return movie
                })
                setMovieData(prevState => [...prevState, ...movieArr])
            } else {
                setMovieData(prevState => [...prevState, ...response.data.results])
            }
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                scrollCount++
                getMovies(scrollCount)
             } else {
                 return
             }
        } catch(error){
            console.log(error)
        }
    }
    function onPageScroll(){
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            scrollCount++
            getMovies(scrollCount)
         }
         
    }

    
    return (
        <div onClick={onPageScroll} className="flex col-gap-30 row-gap-30 flex-wrap mt-10">
            {movieData.length > 0 ? movieData.map(data => (
                <Link key={data.id} href={'watch/' + selection + '_' + data.id}>
                    <a className="relative cursor-pointer">
                        <img className="tile-box" src={'https://image.tmdb.org/t/p/original/' + data.poster_path} alt="movie-tile" />
                        <div className='year-badge'>{new Date(data.release_date ? data.release_date : data.first_air_date).getFullYear()}</div>
                        <div className='rating'>{data.vote_average}</div>
                        <div className='movie-title'>{data.title ? data.title : data.original_name}</div>
                    </a>
                </Link>
                
            )): <div>Loading...</div>}
        </div>
    )
}