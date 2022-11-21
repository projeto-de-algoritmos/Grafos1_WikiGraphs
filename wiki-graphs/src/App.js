import { useEffect, useState } from 'react';
import Select from 'react-select';
import data from './data/dump/titles_links.json';

function App() {
  const [source, setSource] = useState('');
  const [destiny, setDestiny] = useState('');

  const [sourceOptions, setSourceOptions] = useState([]);
  const [chooseSource, setChooseSource] = useState('');
  const [destinyOptions, setDestinyOptions] = useState([]);
  const [chooseDestiny, setChooseDestiny] = useState('');

  const [titles, setTitles] = useState(
    Object.keys(data).map((key, index) => ({ value: `${index}`, label: key })),
  );

  useEffect(() => {
    console.log({ source, destiny, chooseSource, chooseDestiny });
  }, [source, destiny, chooseDestiny, chooseSource]);

  useEffect(() => {
    if (source.length > 3) {
      setSourceOptions(
        titles.filter(({ label }) =>
          label.toUpperCase().includes(source.toUpperCase()),
        ),
      );
    } else setSourceOptions([]);
  }, [source]);

  useEffect(() => {
    if (destiny.length > 3) {
      setDestinyOptions(
        titles.filter(({ label }) =>
          label.toUpperCase().includes(destiny.toUpperCase()),
        ),
      );
    } else setDestinyOptions([]);
  }, [destiny]);

  return (
    <div className="App">
      <header>
        <p id="app-name">WikiGraphs</p>
      </header>
      <section id="content">
        <div id="select-group">
          <div id="input-container">
            <strong>Origem</strong>
            <Select
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  fontSize: '1.6rem',
                }),
              }}
              className="select-option"
              classNamePrefix="select-option"
              placeholder="Digite a página inicial..."
              options={sourceOptions}
              onInputChange={text => setSource(text)}
              onChange={option => setChooseSource(option.label)}
            />
          </div>
          <div id="input-container">
            <strong>Destino</strong>
            <Select
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  fontSize: '1.6rem',
                }),
              }}
              className="select-option"
              classNamePrefix="select-option"
              placeholder="Digite a página final..."
              options={destinyOptions}
              onInputChange={text => setDestiny(text)}
              onChange={option => setChooseDestiny(option.label)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
