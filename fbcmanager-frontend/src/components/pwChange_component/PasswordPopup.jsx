import React, { useState, useCallback } from "react";
import { useModal } from "react-hooks-use-modal";
import "./style.css";

const PasswordPopup = () => {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: true,
  });

  return (
      <div>
      <button type="submit" className="btn btn-primary" onClick={open}>
        Change password
      </button>
      <Modal>
        <div className="modalDiv">
          <form>
            <div class="form-group">
              <label for="exampleInputPassword1">Current password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">New password</label>
              <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Confirm new password</label>
              <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
              />
            </div>
            <div className="loginBtnDiv">
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default PasswordPopup;
