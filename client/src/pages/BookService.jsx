import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const EMPTY_FORM = {
  service: '',
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  carMake: '',
  carModel: '',
  carYear: '',
  date: '',
  notes: '',
};

export default function BookService() {
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ ...EMPTY_FORM, service: searchParams.get('service') || '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then(setServices)
      .catch(console.error);
  }, []);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, carYear: Number(form.carYear) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      setSuccess(data);
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="form-card" style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#86efac', marginBottom: '1rem' }}>Booking Confirmed!</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}>
          Thanks, <strong style={{ color: 'var(--light)' }}>{success.customerName}</strong>.
          Your booking for <strong style={{ color: 'var(--light)' }}>{success.service?.name}</strong> is{' '}
          <span className="status-badge status-pending">pending</span>.
        </p>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Date: {new Date(success.date).toLocaleDateString()}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => setSuccess(null)}>Book Another</button>
          <Link to="/bookings" className="btn btn-secondary">View Bookings</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h2>Book a Service</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="service">Service *</label>
          <select id="service" name="service" value={form.service} onChange={handleChange} required>
            <option value="">Select a service…</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} — ${s.price}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="customerName">Full Name *</label>
            <input id="customerName" name="customerName" value={form.customerName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="customerPhone">Phone *</label>
            <input id="customerPhone" name="customerPhone" value={form.customerPhone} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="customerEmail">Email *</label>
          <input id="customerEmail" name="customerEmail" type="email" value={form.customerEmail} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="carMake">Car Make *</label>
            <input id="carMake" name="carMake" placeholder="e.g. BMW" value={form.carMake} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="carModel">Car Model *</label>
            <input id="carModel" name="carModel" placeholder="e.g. M3" value={form.carModel} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="carYear">Year *</label>
            <input id="carYear" name="carYear" type="number" min="1900" max="2100" placeholder="2020" value={form.carYear} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="date">Preferred Date *</label>
            <input id="date" name="date" type="date" value={form.date} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes (optional)</label>
          <textarea id="notes" name="notes" value={form.notes} onChange={handleChange} placeholder="Any extra details about your vehicle or the issue…" />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
}
