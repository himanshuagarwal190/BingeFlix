import { BeakerIcon } from "@heroicons/react/solid";

export default function Sidebar({ genres, setGenre, isOpen, toggleMoviesTv, setOpenSidebar }){
    return (
        <div className={isOpen ? "sidebar sidebarTranslate" : "sidebar"}>
            <div className="sidebarContainer">
                <div className="moviesSideBar" onClick={() => toggleMoviesTv("movie", true)}>
                    <BeakerIcon className="sm-20" />
                    <p>Movies</p>
                </div>
                <div className="tvSideBar" onClick={() => toggleMoviesTv("tv", true)}>
                        <BeakerIcon className="sm-20" />
                        <p>TV Shows</p>
                </div>
                <div className="divider moviesSideBarDivider"></div>
                <div className="sideBarGenreContainer">
                    {genres?.map((genre) => (
                        <div
                            key={genre.id}
                            className="sideBarGenre"
                            onClick={() => setGenre(genre.id, true)}
                        >
                            <p>{genre.name}</p>
                        </div>
                    ))}
                </div>
                
            </div>
            <div onClick={() => setOpenSidebar(false)} className="sidebarOpacity">

            </div>
        </div>
    )
}