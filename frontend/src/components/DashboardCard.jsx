function DashboardCard({

  title,
  value,
  subtitle

}) {

  return (

    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-semibold text-gray-800 mt-2">

        {value}

      </h2>

      <p className="text-sm text-gray-400 mt-2">

        {subtitle}

      </p>

    </div>
  );
}

export default DashboardCard;