/* eslint-disable eqeqeq */
import React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../config";
import { addDoc, collection } from "@firebase/firestore";

const inputFields = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "phone", label: "Mobile number", type: "number" },
  { id: "email", label: "E-mail", type: "email" },
  {
    id: "password",
    label: "Password (Min 6 characters)",
    type: "password",
    extraAttributes: { pattern: ".{6,}" },
  },
  { id: "confirmPassword", label: "Confirm Password", type: "password" },
];

class Authenticate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { signup } = this.props;
    if (signup) this.registerUser();
    else this.loginUser();
  };

  registerUser = async () => {
    const { firstName, email, password, confirmPassword } = this.state;
    if (password != confirmPassword) {
      alert("password must be same as confirm password");
      return;
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log({ user });
          await updateProfile(auth.currentUser, { displayName: firstName });
          sendEmailVerification(auth.currentUser);
        })
        .catch((err) => {
          console.log(err.code + ": " + err.message);
          alert(`${err.code}`.replace("auth/", "").replaceAll("-", " "));
        });
    }
  };

  // CONTINUE FROM HERE!!!!

  // createUserInDB = async () => {
  //   const { firstName, lastName, phone, email, password } = this.state;
  //   const docRef = await addDoc(collection(db, "users"), {
  //     firstName,
  //     lastName,
  //     phone,
  //     email,
  //     password,
  //   });
  // };

  loginUser = () => {
    const { email, password } = this.state;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log({ user });
      })
      .catch((err) => {
        console.log(err.code + ": " + err.message);
      });
  };

  handleInputChange = (fieldID, value) =>
    this.setState({ [fieldID]: value.trim() });

  render() {
    const { signup } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="px-3 mb-5">
          {inputFields
            .filter((field) =>
              !signup ? field.id == "email" || field.id == "password" : true
            )
            .map((field, i) => {
              const extraAttributes = field?.extraAttributes ?? {};
              return (
                <input
                  key={i}
                  type={field.type ?? "text"}
                  className="form-control mb-3"
                  value={this.state[field.id] ?? ""}
                  onChange={(e) =>
                    this.handleInputChange(field.id, e.target.value)
                  }
                  placeholder={field.label}
                  required
                  {...extraAttributes}
                />
              );
            })}
          {!signup && <div className="btn p-0 mb-3">Forgot password?</div>}
          <input
            type="submit"
            value={!signup ? "LOG IN" : "SIGN UP"}
            className="btn w-100"
            style={{ backgroundColor: "#f68512" }}
          />
        </form>
      </div>
    );
  }
}

export default Authenticate;
