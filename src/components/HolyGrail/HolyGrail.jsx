import './HolyGrail.css';
// making a footer stick to the bottom of the screen when there is not enough content to fill up the page.
// This can be solved by adding min-height: 100vh
export default function HolyGrail() {
    return (
        <div className="holy-grail">
            <div className='hg-header'>Header</div>
            <div className='columns'>
                <div className='hg-nav'>Navigation</div>
                <div className='hg-main'>Main</div>
                <div className='hg-aside'>Sidebar</div>
            </div>
            <div className='hg-footer'>Footer</div>
        </div>
    );
}