import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import data from './data/dump/10k.json';
import findWikiPathWithBFS from './data/graph';

function App() {
  const titles = Object.keys(data).map((key, index) => ({
    value: `${index}`,
    label: key,
  }));

  const [source, setSource] = useState('');
  const [destiny, setDestiny] = useState('');

  const [sourceOptions, setSourceOptions] = useState([]);
  const [chooseSource, setChooseSource] = useState('');
  const [destinyOptions, setDestinyOptions] = useState([]);
  const [chooseDestiny, setChooseDestiny] = useState('');

  const [path, setPath] = useState([]);
  const [error, setError] = useState('');

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

  const searchWikiPages = () => {
    if (!chooseSource || !chooseDestiny) {
      setError('Preencha os campos de Origem e Destino, por favor');
      return;
    }

    const result = findWikiPathWithBFS(chooseSource, chooseDestiny);

    if (result.length === 0) {
      setError('Não foi encontrado nenhum caminho para essa busca... ):');
      return;
    }

    setError('');
    setPath(result);
  };

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
              isClearable
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
              isClearable
            />
          </div>
        </div>

        <button type="button" onClick={() => searchWikiPages()}>
          Buscar o caminho
        </button>

        <div id="path-content">
          {error !== '' ? (
            <p id="error">{error}</p>
          ) : (
            path.map((p, idx) => {
              return idx + 1 < path.length ? (
                <p key={p} id="path">{`${path[idx]} -> ${path[idx + 1]}`}</p>
              ) : null;
            })
          )}
        </div>
        {/* <p id="path">{path.join(' -> ')}</p> */}
      </section>
    </div>
  );
}

export default App;
