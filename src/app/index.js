import React, { useState } from 'react';
import LogoViewer from './components/LogoViewer';
import AutocompleteInput from './components/autocompleteInput';
import AutocompleteList from './components/autocompleteList';
import { makeHttpRequest } from './services/fetch';

const App = () => {
  const [showAutocompleteList, toggleAutocompleteListDisplay] = useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [autocompleteListActiveIndex, setAutocompleteListActiveIndex] = useState();
  const [autocompleteList, setAutocompleteList] = useState([]);

  // when autocomplete input blur 
  const onBlurAutocompleteInputHandler = e => {
    // toggleAutocompleteListDisplay(false);
  }

  // when autocomplete input change happens 
  const onChangeAutocompleteInputHandler = async(e) => {
    const { target } = e;
    const { value } = target;
    if(value) {
      setAutocompleteValue(value);
      const resultValue = await makeHttpRequest(value);
      const { items: resultItems } = resultValue;
      setAutocompleteList(resultItems);
      if(resultItems && resultItems.length) toggleAutocompleteListDisplay(true);
      else toggleAutocompleteListDisplay(false);
    }else {
      removeSearchValueHandler();
    }
  }

  // when autocomplete input focus 
  const onFocusAutocompleteInputHandler = () => {
    if(autocompleteList && autocompleteList.length) toggleAutocompleteListDisplay(true);
  }

   // when autocomplete suggestion list key down happens
   const onkeyDownAutocompleteInputHanlder = e => {
    const { keyCode } = e;
    if(keyCode === 40){
      let tempConst = autocompleteListActiveIndex;
      if(isNaN(tempConst)) tempConst = 0;
      else if(tempConst < autocompleteList.length - 1) tempConst += 1;
      else if(tempConst + 1 === autocompleteList.length) tempConst = 0;

      if(autocompleteList[tempConst] && autocompleteList[tempConst].title){
        setAutocompleteListActiveIndex(tempConst)
        setAutocompleteValue(autocompleteList[tempConst].title)
      }
    }
  }

  // when autocomplete suggestion list key up happens 
  const onkeyUpAutocompleteInputHanlder = e => {
    const { keyCode } = e;
    if(keyCode === 38){
      let tempConst = autocompleteListActiveIndex;
      if(!tempConst) tempConst = autocompleteList.length - 1;

      if(autocompleteList[tempConst] && autocompleteList[tempConst].title){
        setAutocompleteListActiveIndex(tempConst - 1)
        setAutocompleteValue(autocompleteList[tempConst].title)
      }
    }
  }

  // set initial values for autocomplete
  const removeSearchValueHandler = () => {
    toggleAutocompleteListDisplay(false);
    setAutocompleteValue('');
    setAutocompleteList([]);
  }

  // autocomplete suggestion list active index set function
  const setAutocompleteActiveIndexHandler = (index, value) => {
    setAutocompleteListActiveIndex(index);
    setAutocompleteValue(value);
  }

  // autocomplete suggestion list active index remove function
  const removeAutocompleteActiveIndexHandler = () => {
    setAutocompleteListActiveIndex(-1)
  }

  return (
    <div className="app">
      <LogoViewer />
      <div 
        className="app__autocomplete-wrapper" 
        onKeyDown={e => onkeyDownAutocompleteInputHanlder(e)}
        onKeyUp={e => onkeyUpAutocompleteInputHanlder(e)}
      >
        <AutocompleteInput 
          showAutocompleteList={showAutocompleteList}
          value={autocompleteValue} 
          onFocusHandler={onFocusAutocompleteInputHandler} 
          onChangeHandler={onChangeAutocompleteInputHandler} 
          onblurHandler={onBlurAutocompleteInputHandler}
          removeValueHandler={removeSearchValueHandler}
        />
        { 
          showAutocompleteList ?
            <AutocompleteList 
              listData={autocompleteList} 
              setActiveIndex={setAutocompleteActiveIndexHandler}
              removeActiveIndex={removeAutocompleteActiveIndexHandler}
              activeIndex={autocompleteListActiveIndex}
            /> 
          : '' 
        }
      </div>
    </div>
  );
};

export default App;
