import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PLATFORMS from '../platforms';

function HomePage() {
  const [username, setUsername] = useState('');
  const [selected, setSelected] = useState({});
  const [modal, setModal] = useState(null);
  const [modalValue, setModalValue] = useState('');
  const navigate = useNavigate();

  const openModal = (platform) => {
    setModal(platform);
    setModalValue(selected[platform.id] || '');
  };

  const saveModal = () => {
    if (modalValue.trim()) {
      setSelected((prev) => ({ ...prev, [modal.id]: modalValue.trim() }));
    }
    setModal(null);
    setModalValue('');
  };

  const removeModal = () => {
    setSelected((prev) => {
      const copy = { ...prev };
      delete copy[modal.id];
      return copy;
    });
    setModal(null);
    setModalValue('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activeIds = Object.keys(selected);
    if (!username.trim() || activeIds.length === 0) {
      alert('Please enter your name and add at least one link.');
      return;
    }

    const links = activeIds.map((id) => {
      const platform = PLATFORMS.find((p) => p.id === id);
      let url = selected[id];
      if (id === 'whatsapp') {
        const digits = url.replace(/[^\d]/g, '');
        url = `https://wa.me/${digits}`;
      }
      return { id, name: platform.name, icon: platform.icon, color: platform.color, url };
    });

    // Notify via Web3Forms (fire and forget)
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '9754601b-952e-4b4d-876e-00ef9b2af273',
        subject: `Link App - New user: ${username.trim()}`,
        from_name: 'Link App',
        name: username.trim(),
        platforms: links.map((l) => l.name).join(', '),
      }),
    }).catch(() => {});

    navigate(`/${username.trim()}`, { state: { links } });
  };

  const activeCount = Object.keys(selected).length;

  return (
    <div className="home-container">
      <h1>Link</h1>
      <p className="subtitle">All your links in one place</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
          required
        />

        <p className="section-label">Tap a platform to add your link</p>

        <div className="platform-grid">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`platform-toggle${selected[p.id] !== undefined ? ' active' : ''}`}
              style={{ '--platform-color': p.color }}
              onClick={() => openModal(p)}
            >
              <i className={`bi ${p.icon}`} />
              <span>{p.name}</span>
              {selected[p.id] !== undefined && (
                <i className="bi bi-check-circle-fill check-icon" />
              )}
            </button>
          ))}
        </div>

        {activeCount > 0 && (
          <p className="active-count">{activeCount} link{activeCount > 1 ? 's' : ''} added</p>
        )}

        <button type="submit" className="generate-btn">
          Generate Link Page
        </button>
      </form>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <i className={`bi ${modal.icon}`} style={{ color: modal.color, fontSize: '1.5rem' }} />
              <span>{modal.name}</span>
            </div>
            <input
              type={modal.inputType || 'url'}
              className="modal-input"
              value={modalValue}
              onChange={(e) => setModalValue(e.target.value)}
              placeholder={modal.placeholder}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && saveModal()}
            />
            <div className="modal-actions">
              {selected[modal.id] !== undefined && (
                <button type="button" className="modal-remove" onClick={removeModal}>
                  Remove
                </button>
              )}
              <button type="button" className="modal-save" onClick={saveModal}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
