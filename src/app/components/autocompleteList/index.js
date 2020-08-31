// autocomplete suggestion list component
import React from 'react';
import SearchIcon from '../../images/search.svg';

const AutoCompleteList = props => {
  const { activeIndex, setActiveIndex, listData, removeActiveIndex } = props;

  return (
    <ul className="app__autocomplete-list">
      {
        listData && listData.length ? listData.map((data, index) => {
          const { title, cacheId } = data;
          return(
            <li 
              key={cacheId}
              className={`app__autocomplete-list-item ${activeIndex === index ? 'app__autocomplete-list-item_active': '' }`}
              onMouseOver={() => setActiveIndex(index, title)}
              onMouseOut={() => removeActiveIndex()}
            >
              <img src={SearchIcon} alt="search" className="app__autocomplete-icon app__autocomplete-list-item-icon" />
              {title}
            </li>
          )
        }) : ''
      }
    </ul>
  )
}

export default AutoCompleteList;