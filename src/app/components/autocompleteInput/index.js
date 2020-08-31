// Autocomplete Input field component
import React from 'react';
import SearchIcon from '../../images/search.svg';
import CloseIcon from '../../images/close.svg';

const AutocompleteInput = props => {
  const { value, onblurHandler, onChangeHandler, onFocusHandler, showAutocompleteList, removeValueHandler } = props;
  return (
    <div className={`app__autocomplete ${showAutocompleteList ? 'app__autocomplete_list-show': ''}`}>
      <img src={SearchIcon} alt="search" className="app__autocomplete-icon" />
      <input 
        type="text" 
        value={value}
        className="app__autocomplete-input"
        onBlur={onblurHandler}
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
      />
      <img src={CloseIcon} alt="close" className="app__autocomplete-icon u_cursor_pointer" role="presentation" onClick={() => removeValueHandler()} />
    </div>
  )
}

export default AutocompleteInput;