import { BeakerIcon } from "@heroicons/react/solid";

export default function Sidebar({ isOpen, toggleMoviesTv, setOpenSidebar }){
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
            </div>
            <div onClick={() => setOpenSidebar(false)} className="sidebarOpacity">

            </div>
        </div>
    )
}