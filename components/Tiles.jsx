import axios from 'axios'
import { useState, useEffect, useRef, useCallback } from 'react'
import config from '../config'
import Link from 'next/link'

export default function Tiles({ selection, movieData, setMovieData, genreSelected }){
    const pageNumber = useRef(0)
    const loading = useRef(false)

    const lastTileRef = useRef()
    const refCallback = useCallback(node =>{
        if(!node) return
        if(movieData.length == 0) return
        if(lastTileRef.current) lastTileRef.current.disconnect()
        lastTileRef.current = new IntersectionObserver(entries =>{
            console.log('visible')
            if(entries[0].isIntersecting){
                pageNumber.current += 1
                getMovies(pageNumber.current)
            }
        })
        lastTileRef.current.observe(node)

    })

    useEffect(()=>{
        pageNumber.current = 1
        getMovies(pageNumber.current, true)
    },[selection, genreSelected])

    async function getMovies(pageCount, reset = false){
        try {
            loading.current = true
            const url = config.movieDBAPIUrl + '/trending/' + selection + '/week?api_key=' + config.movieDBKey + '&page=' + pageCount
            const response = await axios.get(url)
            let movieArr = []
            if(genreSelected != 0){
                movieArr = response.data.results.filter(movie  =>{
                    if(movie.genre_ids.includes(genreSelected)) return movie
                })
            } else {
                movieArr = response.data.results
            }
            if(!reset) movieArr = [...movieData, ...movieArr]
            if(!movieArr.length) return getMovies(++pageNumber.current, reset)
            setMovieData(movieArr)
            loading.current = false
        } catch(error){
            console.log(error)
        }
    }
    
    return (
        <div className="flex col-gap-30 row-gap-30 flex-wrap mt-10 justify-center">
            {movieData.length > 0 ? movieData.map((data, idx) => (
                <div className="relative cursor-pointer" ref={idx === movieData.length - 1 ? refCallback : null} key={idx}>
                    <Link href={'watch/' + selection + '_' + data.id}>
                        <a>
                            <img className="tile-box" src={'https://image.tmdb.org/t/p/original/' + data.poster_path} alt="movie-tile" />
                            <div className='year-badge'>{new Date(data.release_date ? data.release_date : data.first_air_date).getFullYear()}</div>
                            <div className='rating'>{data.vote_average}</div>
                            <div className='movie-title'>{data.title ? data.title : data.original_name}</div>
                        </a>
                    </Link>
                </div>
                
                
            )): <div>Loading...</div>}
        </div>
    )
}