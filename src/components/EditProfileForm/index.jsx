import { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import useAuth from "hooks/useAuth";
import { convertToBase64 } from "utils/helpers";
import { updatedAuthUser } from "features/auth/authSlice";
import { updateUsersById } from "features/register/registerSlice";
import Button from "components/Button";
import "./editProfileForm.scss";

const EditProfileForm = ({ setIsEditProfileFormOpen }) => {
  const { authUser } = useAuth();
  const [imagePreview, setImagePreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    if (!values.firstname) {
      errors.firstname = "First name is required";
    }
    if (!values.lastname) {
      errors.lastname = "Last name is required";
    }

    return errors;
  };

  const handleImageChange = async (e, input) => {
    const newSelectedImage = await convertToBase64(e.target.files[0]);
    setSelectedImage(newSelectedImage);
    input.onChange(newSelectedImage);
  };

  const onSubmit = (userInfo) => {
    dispatch(updatedAuthUser(userInfo));
    dispatch(updateUsersById(userInfo));
    setIsEditProfileFormOpen(false);
  };

  useEffect(() => {
    setImagePreview(selectedImage !== null || Boolean(authUser.profileImage));
  }, [selectedImage, authUser.profileImage]);

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={authUser}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="firstname">
            {({ input, meta }) => (
              <div className="form-group">
                <label>First Name</label>
                <input {...input} type="text" placeholder="First name" />
                {meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="lastname">
            {({ input, meta }) => (
              <div className="form-group">
                <label>Last Name</label>
                <input {...input} type="text" placeholder="Last name" />
                {meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="username">
            {({ input, meta }) => (
              <div className="form-group">
                <label>Userame</label>
                <input {...input} type="text" placeholder="Username" readOnly />
                {meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="subtitle">
            {({ input, meta }) => (
              <div className="form-group">
                <label>Subtitle</label>
                <input {...input} type="text" placeholder="Subtitle" />
                {meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="about">
            {({ input, meta }) => (
              <div className="form-group">
                <label>About</label>
                <textarea {...input} type="text" placeholder="About" />
                {meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="profileImage">
            {({ input, meta }) => (
              <div className="form-group">
                <label>Profile Image</label>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, input)}
                />
                {imagePreview && (
                  <img
                    src={selectedImage ? selectedImage : authUser?.profileImage}
                    alt="Author Image"
                  />
                )}
                {meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div className="form__buttons">
            <Button type={"submit"} className="submit-button">
              Submit
            </Button>
            <Button
              type={"button"}
              onClickHandler={() => setIsEditProfileFormOpen(false)}
              className="cancel-button"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    />
  );
};

export default EditProfileForm;

EditProfileForm.propTypes = {
  setIsEditProfileFormOpen: PropTypes.func.isRequired,
};