function StatusBadge({ status }) {

  let styles = "";

  if (status === "ACTIVE") {
    styles =
      "bg-green-100 text-green-700";
  }

  else if (status === "WARNING") {
    styles =
      "bg-yellow-100 text-yellow-700";
  }

  else if (status === "CRITICAL") {
    styles =
      "bg-red-100 text-red-700";
  }

  else if (status === "EXPIRED") {
    styles =
      "bg-gray-200 text-gray-700";
  }

  else if (status === "DISPATCHED") {
    styles =
      "bg-blue-100 text-blue-700";
  }

  return (

    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}
    >

      {status}

    </span>
  );
}

export default StatusBadge;