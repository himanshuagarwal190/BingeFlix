import { BeakerIcon } from '@heroicons/react/solid'

export default function Navbar({ setSelection, selection }){
    return (
        <div className='flex'>
            <div className='flex col-gap-30 w-45'>
                <div onClick={e => setSelection('movie')} className={selection == 'movie' ? 'flex col-gap-8 cursor-pointer grey-badge' : 'flex col-gap-8 cursor-pointer'}>
                    <BeakerIcon className='sm-20' />
                    <p>Movies</p>
                </div>
                <div onClick={e => setSelection('tv')} className={selection == 'tv' ? 'flex col-gap-8 cursor-pointer grey-badge' : 'flex col-gap-8 cursor-pointer'}>
                    <BeakerIcon className='sm-20' />
                    <p>TV Shows</p>
                </div>
            </div>
            <div className='w-55'>
                <img src='/bingeflix.png' className='size-40' alt="" />
            </div>
        </div>
    )
}