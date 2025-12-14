export default function SweetCard({
  sweet,
  onPurchase,
  isAdmin,
  onDelete,
  onEdit,
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold">{sweet.name}</h2>
      <p className="text-sm text-gray-500">{sweet.category}</p>
      <p className="mt-1 font-bold">₹{sweet.price}</p>
      <p className="text-sm">Stock: {sweet.quantity}</p>

      {!isAdmin && (
        <button
          disabled={sweet.quantity === 0}
          onClick={() => onPurchase(sweet.id)}
          className="mt-3 w-full bg-pink-500 text-white py-1 rounded disabled:bg-gray-300"
        >
          Purchase
        </button>
      )}

      {isAdmin && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onEdit(sweet)}
            className="flex-1 bg-blue-500 text-white py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(sweet.id)}
            className="flex-1 bg-red-500 text-white py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}