import React, {useState, useCallback} from "react";
import {useModal} from "react-hooks-use-modal";
import "./style.css";

const LoginPopup = () => {
    const [Modal, open, close, isOpen] = useModal("root", {
        preventScroll: true,
        closeOnOverlayClick: true,
    });

    return (
        <div>
            <button className="headerLogin" onClick={open}>
                Login
            </button>
            <Modal>
                <div className="modalDiv">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input
                                type="email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                            />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                            />
                        </div>
                        <div className="loginBtnDiv">
                            <button type="submit" class="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default LoginPopup;