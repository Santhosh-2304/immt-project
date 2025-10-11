import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function Sidebar({ user, homes, selectedHomeId, onHomeClick, variant }) {
  const navigate = useNavigate();
  // Inside Sidebar.jsx or Logout button handler
const handleLogout = () => {
  localStorage.removeItem('user');
  window.location.href = '/login'; // full reload ensures cache is cleared
};

  return (
    <aside className={`sidebar ${variant === 'dashboard' ? 'sidebar-dashboard' : 'sidebar-light'}`}>
      <div className="user-info">
        <div className="avatar">{user?.name?.split(' ').map(n => n[0]).slice(0,2).join('')}</div>
        <div>
          <div className="user-name">{user?.name}</div>
          <div className="user-email">{user?.email}</div>
        </div>
      </div>

      <nav className="menu">
        <div className="menu-section">
            {homes.map((home,index)=>(
                <div
              key={home._id}
              className={`menu-item ${selectedHomeId === home._id ? 'active' : ''}`}
              onClick={() => onHomeClick(home._id)}
            >
              <span className="icon">🏠</span>
              <span>{home.name || `Home ${index + 1}`}</span>
            </div>
            ))}
            <div className='UserLink' onClick={() => navigate(`/User`)}>
          <span className="icon"> 🙍🏻‍♂️ </span>
          <span>Users</span>
          </div>
        </div>
        <div className="menu-bottom">
          <button className="menu-item logout" onClick={handleLogout}>
            <span className="icon">⤴️</span>
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
