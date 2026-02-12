import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import supabase from '../supabase';

function UserPage() {
  const { username } = useParams();
  const location = useLocation();
  const stateLinks = location.state?.links;
  const stateDisplayName = location.state?.displayName;

  const [links, setLinks] = useState(stateLinks || null);
  const [displayName, setDisplayName] = useState(stateDisplayName || username);
  const [loading, setLoading] = useState(!stateLinks);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (stateLinks) return;

    const fetchLinks = async () => {
      const { data, error } = await supabase
        .from('links')
        .select('links, display_name')
        .eq('username', username.toLowerCase())
        .single();

      if (!error && data) {
        setLinks(data.links);
        if (data.display_name) setDisplayName(data.display_name);
      }
      setLoading(false);
    };

    fetchLinks();
  }, [username, stateLinks]);

  const pageUrl = window.location.origin + '/' + username;

  const handleCopy = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div className="empty-state">
        <p>Loading...</p>
      </div>
    );
  }

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

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="user-container">
      <div className="user-avatar">{initial}</div>
      <h1>@{displayName}</h1>

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
