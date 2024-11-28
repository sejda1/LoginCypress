import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router';

export default function LoginForm() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        phone: '',
        message: '',
        confirmation: false,
        gender: false,
    });

    const [errors, setErrors] = useState({});
    const [isValidForm, setIsValidForm] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
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
            validationErrors.phone = 'Örn: 555-555-5555';
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
            setFormData({
                name: '',
                surname: '',
                email: '',
                password: '',
                phone: '',
                message: '',
                confirmation: false,
                gender: false,
            });
            setErrors({});
        }
    };

    useEffect(() => {
        ValidateForm();
    }, [formData]);


    return (
        <>
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Kullanıcı Giriş Formu</legend>
                <p>Lütfen Bilgilerinizi Giriniz.</p>
                <div>
                    <label>Adınız:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        data-cy="input-name" 
                    />
                    {errors.name && <p className='error'>{errors.name}</p>}
                </div>
                <div>
                    <label>Soyadınız:</label>
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                        data-cy="input-surname" 
                    />
                    {errors.surname && <p className='error'>{errors.surname}</p>}
                </div>
                <div>
                    <label>E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        data-cy="input-email"
                    />
                    {errors.email && <p className='error'>{errors.email}</p>}
                </div>
                <div>
                    <label>Parola:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        minLength="5"
                        required
                        data-cy="input-password" 
                    />
                    {errors.password && <p className='error'>{errors.password}</p>}
                </div>
                <div>
                    <label>Telefon Numarası:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        required
                        data-cy="input-phone" 
                    />
                    {errors.phone && <p className='error'>{errors.phone}</p>}
                </div>
                <div>
                    <label>Cinsiyetinizi Seçiniz:</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === 'Female'}
                            onChange={handleChange}
                            data-cy="radio-gender-female" 
                        />
                        Kadın
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === 'Male'}
                            onChange={handleChange}
                            data-cy="radio-gender-male" 
                        />
                        Erkek
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Other"
                            checked={formData.gender === 'Other'}
                            onChange={handleChange}
                            data-cy="radio-gender-other"  
                        />
                        Belirtmek İstemiyorum
                    </label>
                    {errors.gender && <p className='error'>{errors.gender}</p>}
                </div>
                <div>
                    <label>Mesajınız:</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        cols="33"
                        data-cy="textarea-message" 
                    />
                </div>
                <div>
                    <div className='checkbox'>
                        <input
                            type="checkbox"
                            name="confirmation"
                            checked={formData.confirmation}
                            onChange={handleChange}
                            data-cy="checkbox-confirmation"  
                        />
                        <label>Girdiğim bilgilerin doğruluğunu onaylıyorum.</label>
                    </div>
                    {errors.confirmation && <p className='error'>{errors.confirmation}</p>}
                </div>
                <button type="submit" disabled={!isValidForm} data-cy="submit-button">Giriş</button>  {/* data-cy ekledik */}
            </fieldset>
        </form>
    </>
    
    );
}
