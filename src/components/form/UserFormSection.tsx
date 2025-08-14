import { useUserForm } from "../../hooks/useUserForm";

interface UserFormSectionProps {
  onUserRegistered?: () => void;
}

export const UserFormSection = ({ onUserRegistered }: UserFormSectionProps) => {
  const { positions, form, errors, submitting, isFormValid, handleChange, handleSubmit } = useUserForm(onUserRegistered);

  return (
    <section className="users-form-section">
      <h2 className="users-form-section__title">Working with POST request</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate className="users-form-section__form">
        <div className="users-form-section__field">
          <input
            type="text"
            name="name"
            placeholder=" "
            value={form.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
          />
          <label>Your name</label>
          {errors.name && <p className="users-form-section__error-text">{errors.name}</p>}
        </div>
        <div className="users-form-section__field">
          <input
            name="email"
            placeholder=" "
            type="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          <label>Email</label>
          {errors.email && <p className="users-form-section__error-text">{errors.email}</p>}
        </div>
        <div className="users-form-section__field">
          <input
            name="phone"
            placeholder=" "
            value={form.phone}
            onChange={handleChange}
            className={errors.phone ? "error" : ""}
          />
          <label>Phone</label>
          <small className="users-form-section__phone-number">+38 (XXX) XXX - XX - XX</small>
          {errors.phone && <p className="users-form-section__error-text">{errors.phone}</p>}
        </div>
        <div className="users-form-section__position-section">
          <legend>Select your position</legend>
          <div className="users-form-section__positions">
            {positions.map((pos) => (
              <label key={pos.id}>
                <input
                  type="radio"
                  name="position_id"
                  value={pos.id}
                  checked={form.position_id === pos.id}
                  onChange={handleChange}
                />
                {pos.name}
              </label>
            ))}
            {errors.position_id && <p className="users-form-section__error-text">{errors.position_id}</p>}
          </div>
        </div>
        <div className="users-form-section__file-section">
          <label htmlFor="photo" className="users-form-section__file-label">
            <input
              id="photo"
              type="file"
              name="photo"
              accept="image/jpeg,image/jpg"
              onChange={handleChange}
              hidden
            />
            <span className="users-form-section__file-text">
              {form.photo ? form.photo.name : "Upload your photo"}
            </span>
          </label>
          {errors.photo && <p className="users-form-section__error-text">{errors.photo}</p>}
        </div>
        <button type="submit" disabled={submitting || !isFormValid} className="users-form-section__btn">
          {submitting ? "Signing up..." : "Sign up"}
        </button>
      </form>
    </section>
  );
};
