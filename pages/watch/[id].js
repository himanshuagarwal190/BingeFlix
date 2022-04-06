import WatchId from "../../components/WatchId";
import Navbar from "../../components/Navbar"
import Head from 'next/head'

export default function WatchRoute() {
    return (
        <div>
            <Head>
                <title>BingeFlix</title>
                <meta name="description" content="BingeFlix" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container">
                <Navbar hideNavbar={true} />
            </div>
            <WatchId />
        </div>
    );
}
