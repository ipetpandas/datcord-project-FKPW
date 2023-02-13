import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal.js";
import { thunkCreateServer } from "../../../store/servers";
import "./CreateServerForm.css";

const CreateServerForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [icon_url, setIconUrl] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newServer = {
      name,
      icon_url,
      description,
    };

    let createdServer = await dispatch(thunkCreateServer(newServer)).catch(
      async (res) => {
        console.log("FRONT END RES", res);
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    if (createdServer) {
      closeModal();
    }
  };

  return (
    <div className="create-server-container">
      <div className="create-server-header-container">
        <h1 className="create-server-title">Create Server</h1>
        <div className="create-server-subtext">
          Your server is where you and your friends hang out. Make yours and
          start talking.
        </div>
      </div>
      <form className="create-server-form-container" onSubmit={handleSubmit}>
        <div className="create-server-form-title">Server Name</div>
        <div className="create-server-input">
          <input
            className="input-fields"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="create-server-form-title">Img Url</div>
        <div className="create-server-input">
          <input
            className="input-fields"
            type="text"
            value={icon_url}
            onChange={(e) => setIconUrl(e.target.value)}
            required
          />
        </div>
        <div className="create-server-form-title">Description</div>
        <div className="create-server-text-area">
          <textarea
            className="input-fields"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="create-server-buttons-container">
          <button className="create-server-button-cancel" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" className="create-server-button-submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateServerForm;
