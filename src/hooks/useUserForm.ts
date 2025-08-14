import { useState, useEffect, useRef } from "react";
import type { Position } from "../types/Position";
import type { FormDataState } from "../types/FormDataState";
import type { Errors } from "../types/Errors";

export const useUserForm = (onUserRegistered?: () => void) => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [form, setForm] = useState<FormDataState>({
    name: "",
    email: "",
    phone: "",
    position_id: null,
    photo: null,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/positions")
      .then(res => res.json())
      .then(data => data.success && setPositions(data.positions));
  }, []);

  const validate = (updatedForm = form) => {
    const errs: Errors = {};
    if (updatedForm.name.length < 2 || updatedForm.name.length > 60) errs.name = "Name should be 2-60 characters";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updatedForm.email)) errs.email = "Invalid email";
    if (!updatedForm.phone.startsWith("+380") || updatedForm.phone.length !== 13)
      errs.phone = "Phone should start with +380 and be 13 chars";
    if (!updatedForm.position_id) errs.position_id = "Position is required";
    if (!updatedForm.photo) errs.photo = "Photo is required";
    else {
      if (!["image/jpeg", "image/jpg"].includes(updatedForm.photo.type)) errs.photo = "Photo must be jpg/jpeg";
      if (updatedForm.photo.size > 5 * 1024 * 1024) errs.photo = "Photo must be <= 5MB";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setIsFormValid(validate(form));
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files) setForm(f => ({ ...f, photo: files[0] }));
    else if (name === "position_id") setForm(f => ({ ...f, position_id: Number(value) }));
    else setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const tokenRes = await fetch("https://frontend-test-assignment-api.abz.agency/api/v1/token");
      const tokenData = await tokenRes.json();
      if (!tokenData.success) {
        alert("Не вдалося отримати токен");
        setSubmitting(false);
        return;
      }
      const token = tokenData.token;
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("position_id", String(form.position_id));
      if (form.photo) formData.append("photo", form.photo);

      const res = await fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
        method: "POST",
        headers: { Token: token },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert("Користувача успішно зареєстровано!");
        onUserRegistered?.();
        setForm({ name: "", email: "", phone: "", position_id: null, photo: null });
        setErrors({});
      } else alert(data.message || "Помилка реєстрації");
    } catch {
      alert("Помилка мережі або сервера");
    }
    setSubmitting(false);
  };

  return {
    positions,
    form,
    errors,
    submitting,
    isFormValid,
    handleChange,
    handleSubmit,
  };
};
