/* eslint-disable eqeqeq */
import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const inputFields = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "phone", label: "Mobile number", type: "number" },
  { id: "email", label: "E-mail", type: "email" },
  { id: "password", label: "Password", type: "password" },
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
    const auth = getAuth();
    if (signup) this.registerUser(auth);
    else this.loginUser(auth);
  };

  registerUser = (auth) => {
    const { firstName, lastName, phone, email, password, confirmPassword } =
      this.props;
    if (password != confirmPassword) {
      alert("password must be same as confirm password");
      return;
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log({ user });
        })
        .catch((err) => {
          console.log(err.code + ": " + err.message);
        });
    }
  };

  loginUser = (auth) => {
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
            .map((field) => (
              <input
                type={field.type ?? "text"}
                className="form-control mb-3"
                value={this.state[field.id] ?? ""}
                onChange={(e) =>
                  this.handleInputChange(field.id, e.target.value)
                }
                placeholder={field.label}
                required
              />
            ))}
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
