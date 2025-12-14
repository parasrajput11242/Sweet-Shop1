import { useEffect, useState } from "react";

export default function SweetForm({ onSubmit, editingSweet }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (editingSweet) setForm(editingSweet);
  }, [editingSweet]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">
        {editingSweet ? "Update Sweet" : "Add Sweet"}
      </h3>

      <div className="grid grid-cols-2 gap-2">
        <input name="name" value={form.name} placeholder="Name" onChange={handleChange} />
        <input name="category" value={form.category} placeholder="Category" onChange={handleChange} />
        <input name="price" value={form.price} placeholder="Price" onChange={handleChange} />
        <input name="quantity" value={form.quantity} placeholder="Quantity" onChange={handleChange} />
      </div>

      <button
        onClick={() => onSubmit(form)}
        className="mt-3 bg-green-600 text-white px-4 py-1 rounded"
      >
        {editingSweet ? "Update" : "Add"}
      </button>
    </div>
  );
}