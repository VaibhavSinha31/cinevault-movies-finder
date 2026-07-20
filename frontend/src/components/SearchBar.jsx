import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function SearchBar() {
  const [query, setQuery] = useState(''); const navigate = useNavigate();
  const submit = (e) => { e.preventDefault(); if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`); };
  return <form className="search-bar" onSubmit={submit}><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search movies..."/><button>Search</button></form>;
}
