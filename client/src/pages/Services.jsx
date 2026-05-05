import { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';

const CATEGORIES = ['all', 'tuning', 'repair', 'maintenance'];

export default function Services() {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = category === 'all' ? '/api/services' : `/api/services?category=${category}`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => setServices(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <>
      <h1 className="section-title" style={{ marginBottom: '1rem' }}>
        Our <span>Services</span>
      </h1>

      <div className="filters">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`filter-btn ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="loading">Loading services…</p>
      ) : services.length === 0 ? (
        <div className="empty-state">
          <h3>No services found</h3>
          <p>Try a different category filter.</p>
        </div>
      ) : (
        <div className="grid">
          {services.map((s) => (
            <ServiceCard key={s._id} service={s} />
          ))}
        </div>
      )}
    </>
  );
}
