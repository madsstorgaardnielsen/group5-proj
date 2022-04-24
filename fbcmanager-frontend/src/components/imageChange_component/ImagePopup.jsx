import React, { useState, useCallback } from "react";
import { useModal } from "react-hooks-use-modal";
import "./style.css";
import profile from "../../res/img/profile/tmp-profile.png";

const ImagePopup = () => {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: true,
  });

  return (
      <div className="tilmeldBtn">
      <button type="submit" className="btn btn-primary" onClick={open}>
        Change profile picture
      </button>
      <Modal>
        <div className="modalDiv">
          <form>

            <section className="centerStat">
              <a><img target={"_blank"} src={profile} className="profile-pic"/></a>
            </section>

            <div class="form-group">
              <label for="exampleInputEmail1">Upload picture</label>
              <input
                className="form-control"
                type="file"
                id={"uploadProfilePic"}
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

export default ImagePopup;
