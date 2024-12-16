import { useState, useEffect } from "react";
import { axios } from "@/lib/axiosClient";
import { useRouter } from "next/navigation";

interface Document {
  _id: string;
  name: string;
  url: string;
  status: string;
}

const UpdateInsuranceDocForm = ({
  insuranceId,
  documentId,
}: {
  insuranceId: string;
  documentId: string;
}) => {
  const [document, setDocument] = useState<Document | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(
          `/insurance/${insuranceId}/document/${documentId}`
        ); // Replace with your actual API endpoint
        setDocument(response.data);
      } catch (err) {
        setError("Failed to load document.");
      }
    };
    fetchDocument();
  }, [insuranceId, documentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDocument((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      await axios.patch(
        `insurance/update/company/${insuranceId}/document/${documentId}`,
        document
      ); // Replace with your actual API endpoint
      setMessage("Document updated successfully!");
      //   router.push(`/insurance/${insuranceId}`); // Redirect to the insurance details page
      router.back(); // Redirect to the insurance details page
    } catch (err) {
      setError("Failed to update document.");
    }
  };

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Document</h2>
      {message && <div className="mb-4 text-green-600">{message}</div>}
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={document.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">URL</label>
          <input
            type="text"
            name="url"
            value={document.url}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <input
            type="text"
            name="status"
            value={document.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Update Document
        </button>
      </form>
    </div>
  );
};

export default UpdateInsuranceDocForm;
