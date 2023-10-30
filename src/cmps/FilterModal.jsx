import closeBtn from '../assets/img/close-btn.svg'


export function FilterModal() {


    return (
        <div className="dropdown">
            <section className="filter-modal">

                <article className="filter-modal-header">
                    <div>
                        <button><img src={closeBtn} /></button>
                    </div>
                    Filters
                </article>


                <article className="filter-modal-container">
                    <div>
                        <h2>Type of place</h2>
                        <p>Search rooms, entire homes, or any type of place.</p>
                        <div className='filter-btn-container'>
                            <button>Any type</button>
                            <button>Room</button>
                            <button>Entire home</button>
                        </div>
                    </div>

                    <div>
                        <h2>Price range</h2>
                        <p>Nightly prices including fees and taxes</p>
                    </div>

                    <div>Rooms and beds</div>

                </article>


                <article className="filter-modal-footer">
                    <button>Clear all</button>
                    <button>Show places</button>
                </article>

            </section>
        </div>
    )
}