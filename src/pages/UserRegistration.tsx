import { useState } from "react";

export default function UserRegistration() {
  const [formData, setFormData] = useState({
    userType: "A",
    userRole: "agent",
    fullName: "",
    phone: "",
    email: "",
    dob: "",
    gender: "M",
    address: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = () => {
    const timestamp = new Date().toISOString();
    const payload = {
      user_type: formData.userType === "A" ? "agent" : formData.userRole,
      full_name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      dob: formData.dob,
      gender: formData.gender,
      address: formData.address,
      status: formData.status,
      created_at: timestamp,
      updated_at: timestamp,
    };
    console.log("User Registered:", payload);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-10 px-6">
      <div className="w-full max-w-5xl p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">User Registration</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">User Type</label>
            <select
              className="w-full p-2 border rounded"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <option value="A">Agent</option>
              <option value="E">Employee</option>
            </select>
          </div>
  
          {formData.userType === "A" && (
            <div>
              <label className="block mb-2">Company Name</label>
              <select className="w-full p-2 border rounded">
                <option value="MIIB">Marsh India Insurance Brokers Pvt. Ltd.</option>
                <option value="AIIB">Aon India Insurance Brokers Pvt. Ltd.</option>
                <option value="ARIB">Anand Rathi Insurance Brokers Ltd.</option>
                <option value="PIB">Prudent Insurance Brokers Pvt. Ltd.</option>
                <option value="HIBI">Howden Insurance Brokers India Pvt. Ltd.</option>
                <option value="GIB">Gallagher Insurance Brokers Pvt. Ltd.</option>
                <option value="UIBS">Unison Insurance Broking Services Pvt. Ltd.</option>
                <option value="JBIB">J.B. Boda Insurance Brokers Pvt. Ltd.</option>
                <option value="MIB">Mahindra Insurance Brokers Ltd.</option>
                <option value="FPIB">First Policy Insurance Brokers Pvt. Ltd.</option>
              </select>
            </div>
          )}
          
          {formData.userType === "E" && (
            <div>
              <label className="block mb-2">User Role</label>
              <select className="w-full p-2 border rounded" name="userRole" value={formData.userRole} onChange={handleChange}>
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-2">Full Name</label>
            <input type="text" className="w-full p-2 border rounded" name="fullName" value={formData.fullName} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-2">Mobile Number</label>
            <input type="text" className="w-full p-2 border rounded" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-2">Email Address</label>
            <input type="email" className="w-full p-2 border rounded" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-2">DOB</label>
            <input type="date" className="w-full p-2 border rounded" name="dob" value={formData.dob} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block mb-2">Gender</label>
            <select className="w-full p-2 border rounded" name="gender" value={formData.gender} onChange={handleChange}>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="N">Non-Binary</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Status</label>
            <select className="w-full p-2 border rounded" name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block mb-2">Address</label>
          <input type="text" className="w-full p-2 border rounded" name="address" value={formData.address} onChange={handleChange} />
        </div>
        
        <button className="w-full bg-primary text-white p-2 rounded mt-4" onClick={registerUser}>Register</button>
      </div>
    </div>
  );
}
