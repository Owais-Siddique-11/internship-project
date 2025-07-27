import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import "./Services.css";

// Sample image URLs that work well for services
const sampleImageUrls = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600",
  "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
];

const emojiOptions = [
  { emoji: "💻", label: "Computer/Web" },
  { emoji: "🤖", label: "AI/Robotics" },
  { emoji: "📱", label: "Mobile" },
  { emoji: "📊", label: "Data/Analytics" },
  { emoji: "🎨", label: "Design" },
  { emoji: "📝", label: "Content" },
  { emoji: "🔧", label: "Development Tools" },
  { emoji: "🛒", label: "E-commerce" },
  { emoji: "🔐", label: "Security" },
  { emoji: "📚", label: "Education" },
  { emoji: "🏢", label: "Business" },
  { emoji: "📈", label: "Marketing" },
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ 
    title: "", 
    description: "",
    imageUrl: ""
  });
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [useEmoji, setUseEmoji] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showSampleImages, setShowSampleImages] = useState(false);
  const [imageError, setImageError] = useState(false);

  const API = "http://localhost:3005/api/v1/services";
  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data.data);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "imageUrl") {
      setImageError(false);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", imageUrl: "" });
    setSelectedEmoji("");
    setUseEmoji(false);
    setEditingId(null);
    setImageError(false);
    setShowSampleImages(false);
  };

  const validateImageUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Use the selected emoji as the imageUrl if useEmoji is true
    const dataToSubmit = { ...formData };
    if (useEmoji && selectedEmoji) {
      dataToSubmit.imageUrl = selectedEmoji;
    } else if (useEmoji) {
      // If useEmoji is true but no emoji is selected, set imageUrl to null
      dataToSubmit.imageUrl = null;
    } else if (dataToSubmit.imageUrl) {
      // Validate image URL if one is provided
      const isValid = await validateImageUrl(dataToSubmit.imageUrl);
      if (!isValid) {
        setImageError(true);
        return;
      }
    }

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, dataToSubmit, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(API, dataToSubmit, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      resetForm();
      fetchServices();
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };

  const handleEdit = (service) => {
    // Check if imageUrl is an emoji (single character)
    const isEmoji = service.imageUrl && service.imageUrl.length === 2;
    
    setFormData({ 
      title: service.title, 
      description: service.description,
      imageUrl: isEmoji ? "" : (service.imageUrl || "")
    });
    
    if (isEmoji) {
      setSelectedEmoji(service.imageUrl);
      setUseEmoji(true);
    } else {
      setSelectedEmoji("");
      setUseEmoji(false);
    }
    
    setEditingId(service.id);
    setImageError(false);
    setShowSampleImages(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices();
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  // Check if an imageUrl is likely an emoji (single Unicode character)
  const isEmojiUrl = (url) => {
    return url && url.length <= 2;
  };

  const selectSampleImage = (url) => {
    setFormData({...formData, imageUrl: url});
    setShowSampleImages(false);
  };

  return (
    <div className="admin-layout">
      <AdminNavbar />
      <main className="dashboard-main">
        <div className="services-container">
          <h2 className="services-title">Manage Services</h2>
          
          <div className="services-form-card">
            <h3 className="form-subtitle">{editingId ? "Edit" : "Add New"} Service</h3>
            <form onSubmit={handleSubmit} className="services-form">
              <div className="form-group">
                <label htmlFor="title" className="form-label">Service Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  className="form-input"
                  placeholder="Enter service title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description" className="form-label">Service Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-textarea"
                  placeholder="Enter service description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                />
              </div>
              
              <div className="form-group image-option-toggle">
                <label className="form-label">Visual Representation</label>
                <div className="toggle-buttons">
                  <button 
                    type="button"
                    className={`toggle-btn ${!useEmoji ? 'active' : ''}`}
                    onClick={() => setUseEmoji(false)}
                  >
                    Image URL
                  </button>
                  <button 
                    type="button"
                    className={`toggle-btn ${useEmoji ? 'active' : ''}`}
                    onClick={() => setUseEmoji(true)}
                  >
                    Emoji
                  </button>
                </div>
              </div>
              
              {!useEmoji ? (
                <div className="form-group">
                  <label htmlFor="imageUrl" className="form-label">Image URL</label>
                  <div className="url-input-container">
                    <input
                      id="imageUrl"
                      type="url"
                      name="imageUrl"
                      className={`form-input ${imageError ? 'input-error' : ''}`}
                      placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                      value={formData.imageUrl}
                      onChange={handleChange}
                    />
                    <button 
                      type="button" 
                      className="sample-images-btn"
                      onClick={() => setShowSampleImages(!showSampleImages)}
                    >
                      Sample Images
                    </button>
                  </div>
                  {imageError && (
                    <p className="error-message">Invalid image URL. Please try another URL or use one of our sample images.</p>
                  )}
                  <p className="form-hint">Paste a link to an image or use one of our sample images</p>
                  
                  {showSampleImages && (
                    <div className="sample-images-grid">
                      {sampleImageUrls.map((url, index) => (
                        <div 
                          key={index} 
                          className="sample-image-container"
                          onClick={() => selectSampleImage(url)}
                        >
                          <img src={url} alt={`Sample ${index + 1}`} className="sample-image" />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {formData.imageUrl && !imageError && (
                    <div className="image-preview-container">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        className="image-preview" 
                        onError={() => setImageError(true)}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label">Select Emoji</label>
                  <div className="emoji-selector">
                    {emojiOptions.map((option) => (
                      <button
                        key={option.emoji}
                        type="button"
                        className={`emoji-btn ${selectedEmoji === option.emoji ? 'selected' : ''}`}
                        onClick={() => setSelectedEmoji(option.emoji)}
                        title={option.label}
                      >
                        <span className="emoji">{option.emoji}</span>
                      </button>
                    ))}
                  </div>
                  {selectedEmoji && (
                    <div className="selected-emoji">
                      <span>Selected: </span>
                      <span className="emoji-large">{selectedEmoji}</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="form-actions">
                {editingId && (
                  <button 
                    type="button" 
                    className="btn-cancel" 
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
                <button type="submit" className="btn-submit">
                  {editingId ? "Update" : "Add"} Service
                </button>
              </div>
            </form>
          </div>
          
          <div className="services-list-container">
            <h3 className="services-subtitle">Current Services</h3>
            {services.length === 0 ? (
              <div className="empty-state">No services found. Add your first service above.</div>
            ) : (
              <ul className="services-list">
                {services.map((service) => (
                  <li key={service.id} className="service-item">
                    {service.imageUrl && (
                      isEmojiUrl(service.imageUrl) ? (
                        <div className="service-emoji-container">
                          <span className="service-emoji">{service.imageUrl}</span>
                        </div>
                      ) : (
                        <div className="service-image-container">
                          <img 
                            src={service.imageUrl} 
                            alt={service.title} 
                            className="service-image" 
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/80x80?text=Image';
                            }}
                          />
                        </div>
                      )
                    )}
                    <div className="service-content">
                      <h4 className="service-title">{service.title}</h4>
                      <p className="service-description">{service.description}</p>
                    </div>
                    <div className="service-actions">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEdit(service)}
                      >
                        Edit
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(service.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;