import React, { useState } from "react";

import { jwtDecode } from "jwt-decode";
import UploadIcon from "../../icons/UploadIcon";
import DWG_upload from "../../images/DWG_upload.svg";

import {
  useAddProjectMutation,
  useGetProjectListQuery,
} from "../../redux/features/api/api";

const AddProjectModal = ({ onClose, setProjectAdded }) => {
  const [addProject] = useAddProjectMutation();
  const [selectedFile, setSelectedFile] = useState(null);

  const token = localStorage.getItem("token");
  // const userId = token ? jwtDecode(token)?.user?.id : null;
  let userId = "";
  try {
    if (token) {
      const decoded = jwtDecode(token);
      userId = decoded?.id || decoded?._id || decoded?.user?.id || "";
    }
  } catch (err) {
    console.error("Invalid token:", err);
  }

  const [formData, setFormData] = useState({
    user: userId,
    name: "",
    location: "",
    building_type: "",
    sub_building_type: "",
    level: "",
    dxf_file: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".dxf")) {
      setSelectedFile(file);
    }
    // else {
    //   alert("Please upload a .dxf file");
    // }
  };

  // const handleAddProject = async () => {
  //   if (!selectedFile) {
  //     alert("Please upload a .dxf file");
  //     return;
  //   }

  //   const form = new FormData();
  //   for (const key in formData) {
  //     form.append(key, formData[key]);
  //   }
  //   form.append("file", selectedFile);

  //   try {
  //     // Optional: validate inputs before calling mutation
  //     const response = await addProject(formData).unwrap();
  //     console.log("Project added:", response);
  //     // const { data: projects, isLoading, isError } = useGetProjectListQuery();
  //     setProjectAdded(true);
  //     onClose(); // Close modal after successful submission
  //   } catch (error) {
  //     console.error("Error adding project:", error);
  //   }
  // };

  const handleAddProject = async () => {
    // if (!selectedFile) {
    //   alert("Please upload a .dxf file");
    //   return;
    // }

    const form = new FormData();
    form.append("user", formData.user);
    form.append("name", formData.name);
    form.append("location", formData.location);
    form.append("building_type", formData.building_type);
    form.append("sub_building_type", formData.sub_building_type);
    form.append("level", formData.level);
    form.append("dxf_file", selectedFile); // ✅ name must match `upload.single("dxf_file")` on backend

    try {
      const response = await addProject(form).unwrap();
      console.log("Project added:", response);
      setProjectAdded(true);
      onClose();
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[650px] p-6 rounded-2xl shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-800">
            Working on a new project?
          </h2>
          <button onClick={onClose} className="text-gray-500 text-xl">
            ×
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Project Name"
            autoComplete="off"
            className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none bg-gray-200"
          />
          <button
            onClick={handleAddProject}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add Project
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-500 focus:outline-none bg-gray-200"
            >
              <option value="">Select</option>
              <option value="Delhi">Delhi</option>
              <option value="Noida">Noida</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Building Type
            </label>
            <select
              name="building_type"
              value={formData.building_type}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-500 focus:outline-none bg-gray-200"
            >
              <option value="">Select</option>
              <option value="X">X</option>
              <option value="Y">Y</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Sub building type
            </label>
            <select
              name="sub_building_type"
              value={formData.sub_building_type}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-500 focus:outline-none bg-gray-200"
            >
              <option value="">Select</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-500 focus:outline-none bg-gray-200"
            >
              <option value="">Select</option>
              <option value="M">M</option>
              <option value="N">N</option>
            </select>
          </div>
        </div>
        <div>
          <label className=" text-gray-700 mb-1">
            <div className=" ">Project Files</div>
            <div className="relative cursor-pointer">
              <div className="flex justify-between mt-6 mb-6 border border-gray-300 p-2 text-l bg-gray-200 rounded-md">
                <div className="flex items-center gap-2">
                  <img src={DWG_upload} alt="Upload Icon" className="h-5 w-5" />
                  <span>
                    {selectedFile ? selectedFile.name : "Upload Plan (.dxf)"}
                  </span>
                </div>
                <div className="text-white p-2 rounded">
                  <UploadIcon />
                </div>
              </div>
              <input
                type="file"
                accept=".dxf"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
