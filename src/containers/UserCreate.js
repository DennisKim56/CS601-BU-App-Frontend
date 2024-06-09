import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Config from "../utility/config";

import "./UserCreate.css";

const UserCreate = () => {
  return (
    <div className="create-user-container">
      <form id="form-id" className="create-user-form-container shadow">
        <div class="input-container">
          <label class="form-label">First Name</label>
          <input id="first-name-input" class="form-input" type="text" />
        </div>
        <div class="input-container">
          <label class="form-label">Last Name</label>
          <input id="last-name-input" class="form-input" type="text" />
        </div>
        <div class="input-container">
          <label class="form-label">Email</label>
          <input id="email-input" class="form-input" type="email" />
        </div>
        <div class="input-container">
          <label class="form-label">Package</label>
          <select id="package-input" class="form-input">
            <option hidden disabled selected value>
              -- Select A Package --
            </option>
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>
        <div class="subscribe-container">
          <label>Subscribe</label>
          <input id="subscribe-input" type="checkbox" />
        </div>
        <div class="submit-container">
          <input
            type="submit"
            value="Submit"
            class="submit-btn"
            onclick="handleSubmit(); return false;"
          />
        </div>
      </form>
    </div>
  );
};

export default UserCreate;
