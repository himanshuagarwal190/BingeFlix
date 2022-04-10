import { BeakerIcon } from "@heroicons/react/solid";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import config from '../config'

export default function Navbar({ setSelection, selection, hideNavbar, genres, setGenres, setGenreSelected }) {

    useEffect(() =>{
        getGenres(selection)
    }, [selection])

    async function getGenres(type) {
        try {
            const url =
                config.movieDBAPIUrl +
                "/genre/" +
                type +
                "/list?api_key=" +
                config.movieDBKey
            const response = await axios.get(url)
            setGenres(response.data.genres)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex">
            {!hideNavbar && (
                <div className="flex col-gap-30 w-45">
                    <div
                        onClick={(e) =>{
                            setGenreSelected(0)
                            setSelection("movie")
                        }}
                        className={
                            selection == "movie"
                                ? "flex col-gap-8 cursor-pointer grey-badge"
                                : "flex col-gap-8 cursor-pointer"
                        }
                    >
                        <BeakerIcon className="sm-20" />
                        <p>Movies</p>
                    </div>
                    <div
                        onClick={(e) => {
                            setGenreSelected(0)
                            setSelection("tv")
                        }}
                        className={
                            selection == "tv"
                                ? "flex col-gap-8 cursor-pointer grey-badge"
                                : "flex col-gap-8 cursor-pointer"
                        }
                    >
                        <BeakerIcon className="sm-20" />
                        <p>TV Shows</p>
                    </div>
                    <select className="genre" name="genre" onChange={(e) => setGenreSelected(parseInt(e.target.value))}>
                        <option value="0">Choose Genre</option>
                        {genres.map((data, i) => (
                            <option key={i} value={data.id}>{data.name}</option>
                        ))}
                    </select>
                </div>
            )}
            <div className={!hideNavbar ? "logo" : "justLogo"}>
                <Link href="/">
                    <img src="/bingeflix.png" className="size-40" alt="" />
                </Link>
            </div>
        </div>
    );
}
