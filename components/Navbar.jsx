import { BeakerIcon } from '@heroicons/react/solid'
import Link from 'next/link'

export default function Navbar({ setSelection, selection, hideNavbar }){
    return (
        <div className='flex'>
            {!hideNavbar && <div className='flex col-gap-30 w-45'>
                <div onClick={e => setSelection('movie')} className={selection == 'movie' ? 'flex col-gap-8 cursor-pointer grey-badge' : 'flex col-gap-8 cursor-pointer'}>
                    <BeakerIcon className='sm-20' />
                    <p>Movies</p>
                </div>
                <div onClick={e => setSelection('tv')} className={selection == 'tv' ? 'flex col-gap-8 cursor-pointer grey-badge' : 'flex col-gap-8 cursor-pointer'}>
                    <BeakerIcon className='sm-20' />
                    <p>TV Shows</p>
                </div>
            </div>}
            <div className={!hideNavbar ? "logo" : "justLogo"}>
                <Link href="/">
                    <img src='/bingeflix.png' className='size-40' alt="" />
                </Link>
            </div>
        </div>
    )
}