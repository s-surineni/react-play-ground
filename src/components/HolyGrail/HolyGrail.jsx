import './HolyGrail.css';
// making a footer stick to the bottom of the screen when there is not enough content to fill up the page.
// This can be solved by adding min-height: 100vh
export default function HolyGrail() {
    return (
        <div className="holy-grail">
            <header>Header</header>
            <div className='columns'>
                <nav>Navigation</nav>
                <main>Main</main>
                <aside>Sidebar</aside>
            </div>
            <footer>Footer</footer>
        </div>
    );
}