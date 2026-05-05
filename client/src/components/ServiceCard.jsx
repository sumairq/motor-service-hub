import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{service.name}</h3>
        <span className={`badge badge-${service.category}`}>{service.category}</span>
      </div>
      <p>{service.description}</p>
      <div className="card-footer">
        <span className="price">${service.price}</span>
        <span className="duration">{service.duration}</span>
      </div>
      <Link
        to={`/book?service=${service._id}`}
        className="btn btn-primary btn-sm"
        style={{ marginTop: '0.5rem', textAlign: 'center' }}
      >
        Book This Service
      </Link>
    </div>
  );
}
