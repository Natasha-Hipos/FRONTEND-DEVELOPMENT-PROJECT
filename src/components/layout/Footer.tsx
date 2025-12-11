import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-center p-3">
      © {new Date().getFullYear()} Student & Employee - All rights reserved.
    </footer>
  );
};

export default Footer;
