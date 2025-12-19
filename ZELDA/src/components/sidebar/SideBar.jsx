import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

export default function SideBar({ menuItems, gamePath, activeSection, handleNavClick }) {
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleNavClick(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-30% 0px -70% 0px', 
        threshold: 0 
      }
    );

    menuItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect(); 
  }, [menuItems, handleNavClick]);

  return (
    <aside className="sidebar">
      <div className="sidebar-title">Curriculum</div>
      <ul className="sidebar-list">
        {menuItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault(); 
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                handleNavClick(item.id);
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      <Link to={gamePath} className="game-btn-sidebar">실전 해킹 (Game Start)</Link>
    </aside>
  );
}