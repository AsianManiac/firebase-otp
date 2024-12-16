import { useState, useEffect } from "react";
import { axios } from "@/lib/axiosClient";
import { useRouter } from "next/navigation";

interface Document {
  name: string;
  url: string;
}

interface InsuranceType {
  name: string;
  price: number;
  duration: string;
  coverage: string;
}

interface Insurance {
  name: string;
  email: string;
  phone: string;
  photoUrl: string;
  documents: Document[];
  types: InsuranceType[];
}

interface InsuranceData {
  data: Insurance;
}

const UpdateInsuranceForm = ({ id }: { id: string }) => {
  const [insurance, setInsurance] = useState<InsuranceData["data"] | null>(
    null
  );
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchInsurance = async () => {
      try {
        const response = await axios.get(`/insurance/${id}`); // Replace with your actual API endpoint
        setInsurance(response.data);
      } catch (err) {
        setError("Failed to load insurance.");
      }
    };
    fetchInsurance();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (insurance) {
      if (name.includes("documents") || name.includes("types")) {
        const [field, index, subField] = name.split(".");
        setInsurance((prev) => ({
          ...prev!,
          [field]: (
            prev![field as keyof Insurance] as Document[] | InsuranceType[]
          ).map((item, i) =>
            i === parseInt(index) ? { ...item, [subField]: value } : item
          ),
        }));
      } else {
        setInsurance((prev) => ({ ...prev!, [name]: value }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      await axios.put(`/api/insurance/${id}`, insurance); // Replace with your actual API endpoint
      setMessage("Insurance updated successfully!");
      router.push("/"); // Redirect to another page or show success message
    } catch (err) {
      setError("Failed to update insurance.");
    }
  };

  const addDocument = () => {
    setInsurance((prev) => ({
      ...prev!,
      documents: [...prev!.documents, { name: "", url: "" }],
    }));
  };

  const addType = () => {
    setInsurance((prev) => ({
      ...prev!,
      types: [
        ...prev!.types,
        { name: "", price: 0, duration: "", coverage: "" },
      ],
    }));
  };

  if (!insurance) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Insurance</h2>
      {message && <div className="mb-4 text-green-600">{message}</div>}
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={insurance.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={insurance.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={insurance.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Photo URL</label>
          <input
            type="text"
            name="photoUrl"
            value={insurance.photoUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Documents</label>
          {insurance.documents.map((doc, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name={`documents.${index}.name`}
                value={doc.name}
                onChange={handleChange}
                placeholder="Document Name"
                className="w-full px-3 py-2 mb-2 border rounded-md"
                required
              />
              <input
                type="text"
                name={`documents.${index}.url`}
                value={doc.url}
                onChange={handleChange}
                placeholder="Document URL"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addDocument}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Add Document
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Insurance Types</label>
          {insurance.types.map((type, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name={`types.${index}.name`}
                value={type.name}
                onChange={handleChange}
                placeholder="Type Name"
                className="w-full px-3 py-2 mb-2 border rounded-md"
                required
              />
              <input
                type="number"
                name={`types.${index}.price`}
                value={type.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full px-3 py-2 mb-2 border rounded-md"
                required
              />
              <input
                type="text"
                name={`types.${index}.duration`}
                value={type.duration}
                onChange={handleChange}
                placeholder="Duration"
                className="w-full px-3 py-2 mb-2 border rounded-md"
                required
              />
              <input
                type="text"
                name={`types.${index}.coverage`}
                value={type.coverage}
                onChange={handleChange}
                placeholder="Coverage"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addType}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Add Insurance Type
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Update Insurance
        </button>
      </form>
    </div>
  );
};

export default UpdateInsuranceForm;
