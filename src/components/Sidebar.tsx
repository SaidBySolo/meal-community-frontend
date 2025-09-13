import React from "react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const sidebarStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: open ? "0" : "-250px",
    width: "250px",
    height: "100%",
    backgroundColor: "white",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    transition: "left 0.3s ease-in-out",
    zIndex: 1100,
    padding: "2rem 1rem",
    boxSizing: "border-box",
  };

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1050,
    opacity: open ? 1 : 0,
    visibility: open ? "visible" : "hidden",
    transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
  };

  const menuStyle: React.CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0,
  };

  const menuItemStyle: React.CSSProperties = {
    padding: "1rem",
    fontSize: "1.2rem",
    color: "var(--gray-11)",
    cursor: "pointer",
    borderRadius: "8px",
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={sidebarStyle}>
        <ul style={menuStyle}>
          <a href="/" style={{ textDecoration: "none" }}>
            <li style={menuItemStyle}>급식보기</li>
          </a>
          <li style={menuItemStyle}>시간표</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
