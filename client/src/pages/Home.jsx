import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((data) => setFeatured(data.slice(0, 3)))
      .catch(console.error);
  }, []);

  return (
    <>
      <section className="hero">
        <h1>
          Performance Tuning &<br />
          <span>Expert Repairs</span>
        </h1>
        <p>
          From stage-1 remaps to full mechanical overhauls — we make your car faster,
          safer, and more reliable.
        </p>
        <div className="hero-actions">
          <Link to="/book" className="btn btn-primary">Book a Service</Link>
          <Link to="/services" className="btn btn-secondary">View All Services</Link>
        </div>
      </section>

      <section>
        <h2 className="section-title">Popular <span>Services</span></h2>
        <div className="grid">
          {featured.map((s) => (
            <ServiceCard key={s._id} service={s} />
          ))}
        </div>
        {featured.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/services" className="btn btn-secondary">See All Services</Link>
          </div>
        )}
      </section>
    </>
  );
}
