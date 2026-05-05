import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings')
      .then((r) => r.json())
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id, status) {
    const res = await fetch(`/api/bookings/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setBookings((prev) => prev.map((b) => (b._id === id ? updated : b)));
    }
  }

  async function deleteBooking(id) {
    if (!window.confirm('Delete this booking?')) return;
    const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
    if (res.ok) setBookings((prev) => prev.filter((b) => b._id !== id));
  }

  if (loading) return <p className="loading">Loading bookings…</p>;

  if (bookings.length === 0) {
    return (
      <div className="empty-state">
        <h3>No bookings yet</h3>
        <p>Once customers book a service, they'll appear here.</p>
        <Link to="/book" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Make a Booking
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>
        All <span>Bookings</span>
      </h1>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Vehicle</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>
                  <div>{b.customerName}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{b.customerEmail}</div>
                </td>
                <td>{b.service?.name ?? '—'}</td>
                <td>{b.carYear} {b.carMake} {b.carModel}</td>
                <td>{new Date(b.date).toLocaleDateString()}</td>
                <td>
                  <select
                    className="status-select"
                    value={b.status}
                    onChange={(e) => updateStatus(b._id, e.target.value)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => deleteBooking(b._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
