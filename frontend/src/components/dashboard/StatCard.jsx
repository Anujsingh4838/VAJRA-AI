function StatCard({ icon, title, value, type }) {
  return (
    <article className={`stat-card stat-card--${type}`}>
      <div className="stat-card__icon">
        {icon}
      </div>

      <div className="stat-card__content">
        <p className="stat-card__title">{title}</p>
        <h3>{value}</h3>
      </div>
    </article>
  );
}

export default StatCard;