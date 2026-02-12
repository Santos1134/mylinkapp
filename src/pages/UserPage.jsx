import { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

function UserPage() {
  const { username } = useParams();
  const location = useLocation();
  const { links } = location.state || { links: [] };
  const [copied, setCopied] = useState(false);

  const pageUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!links || links.length === 0) {
    return (
      <div className="empty-state">
        <h1>@{username}</h1>
        <p>No links found. Please go back and create your page.</p>
        <Link to="/" className="generate-btn" style={{ display: 'inline-block', marginTop: 20, maxWidth: 250 }}>
          Create Your Page
        </Link>
      </div>
    );
  }

  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="user-container">
      <div className="user-avatar">{initial}</div>
      <h1>@{username}</h1>

      <div className="link-list">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="link-btn"
            style={{ backgroundColor: link.color }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className={`bi ${link.icon}`} />
            {link.name}
          </a>
        ))}
      </div>

      <div className="copy-section">
        <input type="text" value={pageUrl} readOnly />
        <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}

export default UserPage;
