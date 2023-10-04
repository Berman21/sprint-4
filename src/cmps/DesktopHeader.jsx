import logo from '../assets/img/Airbnb-Logo.png'
import search from '../assets/img/search.svg'
import hamburger from '../assets/img/hamburger.svg'
import userIcon from '../assets/img/user.svg'

export function DesktopHeader({ isFilterExpanded }) {
  return (
    <header className='app-header'>
      <div className='logo-container'>
        <img src={logo} style={{ maxWidth: '100px' }} />
      </div>
      {!isFilterExpanded && (
        <div className='any-container'>
          <div>Anywhere</div>
          <div className='separator'></div>
          <div>Any week</div>
          <div className='separator'></div>
          <div className='guests'>Add guests </div>
          <div className='search-container'>
            <button className='btn-search'>
              <img src={search} />
            </button>
          </div>
        </div>
      )}
      <button className='user-container'>
        <img className='hamburger' src={hamburger} />
        <img className='user-icon' src={userIcon} />
      </button>
    </header>
  )
}
