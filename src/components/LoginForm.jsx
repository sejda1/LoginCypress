import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialData = {
  name: '',
  surname: '',
  email: '',
  password: '',
  phone: '',
  message: '',
  confirmation: false,
  gender: '',
};

export default function LoginForm() {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isValidForm, setIsValidForm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const ValidateForm = () => {
    const validationErrors = {};

    if (formData.name.length < 3) {
      validationErrors.name = 'İsim en az 3 karakter olmalı.';
    }
    if (formData.surname.length < 2) {
      validationErrors.surname = 'Soyisim en az 2 karakter olmalı.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      validationErrors.email = 'Geçerli bir e-posta adresi giriniz.';
    }
    if (formData.password.length < 5) {
      validationErrors.password = 'Şifreniz en az 5 karakter olmalı.';
    }
    if (!formData.phone.match(/[0-9]{3}-[0-9]{3}-[0-9]{4}/)) {
      validationErrors.phone = 'Doğru formatta giriniz.';
    }
    if (!formData.confirmation) {
      validationErrors.confirmation = 'Onay kutusunu işaretlemeniz gerekiyor.';
    }
    if (!formData.gender) {
      validationErrors.gender = 'Cinsiyetinizi işaretleyiniz.';
    }

    setErrors(validationErrors);
    setIsValidForm(Object.keys(validationErrors).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidForm) {
      localStorage.setItem('formData', JSON.stringify(formData));
      navigate('/go');
      setFormData(initialData);
      setErrors({});
    }
  };

  useEffect(() => {
    ValidateForm();
  }, [formData]);

  return (
    <Form onSubmit={handleSubmit} data-cy="login-form">
      <h1 data-cy="form-header">ZİYARETÇİ KAYIT FORMU</h1>
      <FormGroup>
        <Label for="name">Adınız:</Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          invalid={!!errors.name}
          data-cy="input-name"
        />
        {errors.name && <div className="invalid-feedback" data-cy="error-name">{errors.name}</div>}
      </FormGroup>

      <FormGroup>
        <Label for="surname">Soyadınız:</Label>
        <Input
          type="text"
          name="surname"
          id="surname"
          value={formData.surname}
          onChange={handleChange}
          required
          invalid={!!errors.surname}
          data-cy="input-surname"
        />
        {errors.surname && <div className="invalid-feedback" data-cy="error-surname">{errors.surname}</div>}
      </FormGroup>

      <FormGroup>
        <Label for="email">E-mail:</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="test@example.com"
          required
          invalid={!!errors.email}
          data-cy="input-email"
        />
        {errors.email && <div className="invalid-feedback" data-cy="error-email">{errors.email}</div>}
      </FormGroup>

      <FormGroup>
        <Label for="password">Parola:</Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="5"
          invalid={!!errors.password}
          data-cy="input-password"
        />
        {errors.password && <div className="invalid-feedback" data-cy="error-password">{errors.password}</div>}
      </FormGroup>

      <FormGroup>
        <Label for="phone">Telefon Numarası:</Label>
        <Input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="555-555-5555"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
          invalid={!!errors.phone}
          data-cy="input-phone"
        />
        {errors.phone && <div className="invalid-feedback" data-cy="error-phone">{errors.phone}</div>}
      </FormGroup>

      <FormGroup>
        <Label>Cinsiyetinizi Seçiniz:</Label>
        <div className="gender">
          <Label check>
            <Input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
              data-cy="input-gender-female"
            />
            Kadın
          </Label>
          <Label check>
            <Input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
              data-cy="input-gender-male"
            />
            Erkek
          </Label>
          <Label check>
            <Input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === 'Other'}
              onChange={handleChange}
              data-cy="input-gender-other"
            />
            Belirtmek İstemiyorum
          </Label>
        </div>
        {errors.gender && <div className="invalid-feedback" data-cy="error-gender">{errors.gender}</div>}
      </FormGroup>

      <FormGroup>
        <Label for="message">Mesajınız:</Label>
        <Input
          type="textarea"
          name="message"
          id="message"
          value={formData.message}
          onChange={handleChange}
          data-cy="input-message"
        />
      </FormGroup>

      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="confirmation"
            checked={formData.confirmation}
            onChange={handleChange}
            data-cy="input-confirmation"
          />
          Girdiğim bilgilerin doğruluğunu onaylıyorum.
        </Label>
        {errors.confirmation && <div className="invalid-feedback" data-cy="error-confirmation">{errors.confirmation}</div>}
      </FormGroup>

      <button className="buton" type="submit" disabled={!isValidForm} data-cy="submit-button">
        KAYIT OL
      </button>
    </Form>
  );
}
