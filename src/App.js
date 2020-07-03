
import React,{ useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const request = 'repositories';
 const [repositories, setReposiitory] = useState([]);

  useEffect(() => {
    api.get(request).then((response) => {
      const { data } = response;
      setReposiitory(data);
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', 
    {
      "title": `repositorio ${Date.now()}`,
      "url": "eduardo",
      "techs": "sdasd"
    });

    setReposiitory([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const response = repositories.filter(repository => repository.id !== id);
    setReposiitory(response);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
