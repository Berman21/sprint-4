import filterSvg from '../assets/img/filterSvg.svg'
import searchMobile from '../assets/img/search-mobile.svg'
export function MobileHeader() {
    return (
        <section className="mobile-header-container">
            <section className='any-container' >
                <button className="btn-header">
                    <section className='search-container'>
                        <img src={searchMobile} />
                    </section>
                    <section className='search-options'>
                        <div className='search-txt anywhere'>Anywhere</div>

                        <section className='lower-options'>
                            <div className='search-txt any-week'>Any week </div>
                            <div className='mobile-dot'>•</div>
                            <div className='guests search-txt'>Add guests </div>
                        </section>

                    </section>
                </button>
                <button className="btn-filter-mobile">
                    <img src={filterSvg} />
                </button>
            </section>

        </section>

    )
}