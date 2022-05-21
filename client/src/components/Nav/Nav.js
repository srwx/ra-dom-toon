import { useState, useEffect } from "react";

export default function Nav() {
  const [position, setPosition] = useState("0 0");

  useEffect(() => {
    const routine_id = setInterval(() => {
      const x = Math.floor(Math.random() * 60) + 20;
      const y = Math.floor(Math.random() * 60) + 20;

      setPosition(x.toString() + "% " + y.toString() + "%");
    }, 1000);

    return () => {
      clearInterval(routine_id);
    };
  }, []);

  return (
    <nav>
      <div className="Logo" style={{ "--random-position": position }}>
        <div className="Shape" />
        <span>RA DOM TOON</span>
      </div>
      <div>SOME buttons</div>
    </nav>
  );
}
