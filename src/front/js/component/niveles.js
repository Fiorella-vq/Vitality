import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/habits.css";


export const Niveles = ({ title, totalDays, nextLevel, storageKey }) => {

  const navigate = useNavigate();

  const initialHabits = [
    { name: "Beber 2L de agua", icon: "fa-droplet" },
    { name: "Caminar 10k pasos", icon: "fa-person-walking" },
    { name: "Dormir 8 horas", icon: "fa-bed" },
    { name: "Comer 3 frutas", icon: "fa-apple-whole" },
    { name: "Meditación 10 min", icon: "fa-spa" },
    { name: "Leer 15 páginas", icon: "fa-book-open" },
    { name: "Entrenamiento fuerza", icon: "fa-dumbbell" }
  ];

  const [habits, setHabits] = useState([]);
  const [daysCompleted, setDaysCompleted] = useState(0);

  useEffect(() => {

    const savedHabits = localStorage.getItem(storageKey + "Habits");
    const savedDays = localStorage.getItem(storageKey + "Days");

    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      const withState = initialHabits.map(h => ({ ...h, done: false }));
      setHabits(withState);
    }

    if (savedDays) {
      setDaysCompleted(parseInt(savedDays));
    }

  }, []);

  const toggleHabit = (index) => {

    const updated = [...habits];
    updated[index].done = !updated[index].done;

    setHabits(updated);
    localStorage.setItem(storageKey + "Habits", JSON.stringify(updated));
  };

  const completed = Array.isArray(habits)
  ? habits.filter(h => h.done).length
  : 0;
  const progress = Math.round((daysCompleted / totalDays) * 100);

  const completeDay = () => {

    if (completed !== 7) {
      alert("Debes completar los 7 hábitos.");
      return;
    }

    const newDays = daysCompleted + 1;

    setDaysCompleted(newDays);
    localStorage.setItem(storageKey + "Days", newDays);

    const resetHabits = habits.map(h => ({ ...h, done: false }));
    setHabits(resetHabits);
    localStorage.setItem(storageKey + "Habits", JSON.stringify(resetHabits));

    if (newDays >= totalDays) {

  localStorage.removeItem(storageKey + "Days");
  localStorage.removeItem(storageKey + "Habits");

  if (nextLevel) {
    navigate(nextLevel);
  }
}

  };

  return (
    <div className="habits-container">

      <h1 className="title">{title}</h1>

      <div className="progress-card">

        <div className="progress-header">
          <div>
            <p className="progress-label">DÍAS COMPLETADOS</p>
            <h2>{daysCompleted}/{totalDays} días</h2>
          </div>

          <span className="percent">{progress}%</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="remaining">
          Faltan {totalDays - daysCompleted} días para avanzar.
        </p>

      </div>

      <div className="habits-title">
        <h2>Hábitos del Día</h2>
        <span className="badge">7 HÁBITOS</span>
      </div>

      {habits.map((habit, index) => (
        <div className="habit-card" key={index}>

          <div className="habit-icon">
            <i className={`fa-solid ${habit.icon}`}></i>
          </div>

          <div className="habit-info">
            <h3>{habit.name}</h3>

            {habit.done ? (
              <p className="completed">Completado</p>
            ) : (
              <p className="pending">Pendiente</p>
            )}
          </div>

          <div
            className="habit-check"
            onClick={() => toggleHabit(index)}
            style={{ cursor: "pointer" }}
          >

            {habit.done ? (
              <i className="fa-solid fa-circle-check"></i>
            ) : (
              <i className="fa-regular fa-circle"></i>
            )}

          </div>

        </div>
      ))}

      <button className="complete-day-btn" onClick={completeDay}>
        Finalizar Día
      </button>

    </div>
  );
};