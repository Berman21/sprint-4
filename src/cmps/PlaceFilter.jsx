import closeBtn from '../assets/img/close-btn.svg'


export function PlaceFilter({ togglePlaceFilter }) {


    return (
        <div>
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
                        <div>
                            <input type="range" />
                        </div>

                        <div>
                            <input type="number" />
                        </div>

                        <div>
                            <input type="number" />
                        </div>
                    </div>

                    <div>
                        <h2>Capacity</h2>
                        <div>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                            <button>4</button>
                            <button>5   </button>
                        </div>
                    </div>

                </article>


                <article className="filter-modal-footer">
                    <button>Clear all</button>
                    <button>Show places</button>
                </article>


            </section>
            <div className="overlay" onClick={togglePlaceFilter}></div>
        </div>
    )
}