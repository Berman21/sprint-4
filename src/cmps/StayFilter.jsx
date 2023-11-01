import { useState } from 'react';
import closeBtn from '../assets/img/close-btn.svg'
import { updateFilterBy } from '../store/stay.actions'

export function StayFilter({ toggleStayFilter, filterByToEdit, setFilterByToEdit }) {

    const [selectedFilterBox, setSelectedFilterBox] = useState('any-type')

    const capacity = ['', 1, 2, 3, 4, 5, 6, 7, 8]

    function handleChange({ target }) {
        console.log(target.name);
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            case 'select-multiple':
                const selectedOptions = Array.from(target.selectedOptions, (option) => option.value)
                value = selectedOptions
                break

            default:
                break
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))

    }

    function onSubmit(ev) {
        ev.preventDefault()
        updateFilterBy(filterByToEdit)
    }

    function setCapacity(num, ev) {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, capacity: num }))
        onSetSelectedFilterBox(ev)
    }

    function onSetSelectedFilterBox(ev, name) {
        ev.preventDefault()
        setSelectedFilterBox(name)
    }

    return (
        <div>
            <section className="filter-modal">

                <article className="filter-modal-header">
                    <div>
                        <button onClick={toggleStayFilter}><img src={closeBtn} /></button>
                    </div>
                    Filters
                </article>


                <article className="filter-modal-container">
                    <div className='type-filter filter'>
                        <h2>Type of place</h2>
                        <p>Search rooms, entire homes, or any type of place.</p>
                        <div className='filter-btn-container'>
                            <button className={selectedFilterBox === 'any-type' ? 'active' : ''} name='any-type' onClick={(ev) => onSetSelectedFilterBox(ev, 'any-type')}>Any type</button>
                            <button className={selectedFilterBox === 'Room' ? 'active' : ''} name='Room' onClick={(ev) => onSetSelectedFilterBox(ev, 'Room')}>Room</button>
                            <button className={selectedFilterBox === 'entire-home' ? 'active' : ''} name='entire-home' onClick={(ev) => onSetSelectedFilterBox(ev, 'entire-home')}>Entire home</button>
                        </div>
                    </div>

                    <div className='price-filter filter'>
                        <h2>Price range</h2>
                        <p>Nightly prices including fees and taxes</p>
                        <div>
                            <input type="range" />
                        </div>
                        <div className='price-input-container'>

                            <div className='price-input'>
                                <div>Minimun</div>
                                <label htmlFor="minPrice">$</label>
                                <input type="number"
                                    id="minPrice"
                                    name="minPrice"
                                    placeholder="By min price"
                                    value={filterByToEdit.minPrice}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='price-input'>
                                <div>Maximum</div>
                                <label htmlFor="maxPrice">$</label>
                                <input type="number"
                                    id="maxPrice"
                                    name="maxPrice"
                                    placeholder="By max price"
                                    value={filterByToEdit.maxPrice}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='capacity-filter filter'>
                        <h2>Capacity</h2>
                        <div>
                            {capacity.map(capNum =>
                                <button key={capNum} onClick={() => setCapacity(capNum)}>{capNum ? capNum : 'Any'}</button>
                            )}
                        </div>
                    </div>

                </article>


                <article className="filter-modal-footer">
                    <button>Clear all</button>
                    <button onClick={(ev) => onSubmit(ev)}>Show places</button>
                </article>


            </section>
            <div className="overlay" onClick={toggleStayFilter}></div>
        </div>
    )
}