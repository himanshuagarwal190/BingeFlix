import { BeakerIcon } from "@heroicons/react/solid";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";

export default function Navbar({ setSelection, selection, hideNavbar, genres, setGenres, setGenreSelected }) {
    const genreRef = useRef()

    const [openSidebar, setOpenSidebar] = useState(false);
    
    useEffect(() =>{
        if(selection) getGenres(selection)
    }, [selection])

    async function getGenres(type) {
        try {
            const url = `/api/genre/?type=${type}`
            const response = await axios.get(url)
            setGenres(response.data.genres)
        } catch (error) {
            console.error(error);
        }
    }

    function toggleMoviesTv(value, closeSideBar = false) {
        genreRef.current.value = "0"
        setGenreSelected(0)
        setSelection(value)
        if(closeSideBar) setOpenSidebar(false)
    }

    function setGenre(value, closeSideBar = false) {
        setGenreSelected(value)
        if(closeSideBar) setOpenSidebar(false)
    }

    return (
        <div className="flex navbar">
            {!hideNavbar && (
                <div className="navButtons flex col-gap-30 w-45">
                    <div
                        onClick={(e) =>{
                            toggleMoviesTv("movie")
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
                            toggleMoviesTv("tv")
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
                    <select ref={genreRef} className="genre" name="genre" onChange={(e) => setGenre(parseInt(e.target.value))}>
                        <option value="0">Choose Genre</option>
                        {genres.map((data, i) => (
                            <option key={i} value={data.id}>{data.name}</option>
                        ))}
                    </select>
                </div>
            )}
            <div className="hammburger" onClick={() => setOpenSidebar(prev => !prev)}>
                <span className={openSidebar ? "hammburgerLine hammburgerCross" : "hammburgerLine"}></span>
                <span className={openSidebar ? "hammburgerLine hammburgerCross" : "hammburgerLine"}></span>
                <span className={openSidebar ? "hammburgerLine hammburgerCross" : "hammburgerLine"}></span>
            </div>
            <Sidebar genres={genres} setGenre={setGenre} toggleMoviesTv={toggleMoviesTv} setOpenSidebar={setOpenSidebar} isOpen={openSidebar} />
            <div className={!hideNavbar ? "logo" : "justLogo"}>
                <Link href="/">
                    <img src="/bingeflix.png" className="size-40" alt="" />
                </Link>
            </div>
        </div>
    );
}
