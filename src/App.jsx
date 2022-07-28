import { useEffect, useState } from 'react';

function App() {
  const { search, animals } = useAnimalSearch();

  return (
    <>
      <div className="container">
        <div className="row">
          <main>
            <h1>Animal Farm</h1>

            <input
              type="text"
              placeholder="Search"
              onChange={(e) => search(e.target.value)}
            />

            <ol>
              {animals.map((animal) => (
                <Animal key={animal.id} {...animal} />
              ))}

              {animals.length === 0 && 'No animals found'}
            </ol>
          </main>
        </div>
      </div>
      <span>Photo by <a href="https://unsplash.com/@andyjh07?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Andy Holmes</a> on <a href="https://unsplash.com/s/photos/animals?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      </span>
    </>
  );
}

// Dumb UI component
function Animal({ type, name, age }) {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  );
}

// Custom Hook
function useAnimalSearch() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, []);

  const search = async (q) => {
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({ q })
    );
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem('lastQuery', q);
  };

  return { search, animals };
}

export default App;