'use client';

import { FC, useState } from 'react';
import { useFormik, FormikErrors, isString } from 'formik';
import { validationSchema } from '@/scripts/validationSchemaForSale';
import { useRouter } from 'next/navigation';

interface FormValues {
  productName: string;
  price: number | '';
  images: File[];
  description: string;
}
interface IFormikFormProps {
  userId: string | null;
}

const FormikForm: FC<IFormikFormProps> = ({ userId }) => {
  const [fetchError, setFetchError] = useState<string>('');
  const router = useRouter();

  const initialValues: FormValues = {
    productName: '',
    price: '',
    images: [],
    description: '',
  };
  const handleSubmit = (formData: FormValues): void => {
    if (!userId) return;

    const data = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key as keyof FormValues])) {
        continue;
      }
      const value = formData[key as keyof FormValues];
      if (isString(value)) {
        data.append(key, value);
      } else {
        data.append(key, JSON.stringify(value));
      }
    }
    formData.images.forEach((image) => {
      data.append('images', image);
    });
    data.append('sellerId', userId);

    fetch('/api/post-new-sale', {
      method: 'POST',
      body: data,
    })
      .then((resp: Response) => {
        if (resp.status === 400) {
          throw new Error('Failed to post data');
        }
        router.replace('/goods');
      })
      .catch((e: Error) => {
        setFetchError(e.message);
        console.error(e);
      });
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values, actions) => {
      handleSubmit(values);
      actions.setSubmitting(false);
    },
    validate: (values) => {
      const result = validationSchema.safeParse(values);
      if (!result.success) {
        const errors: FormikErrors<FormValues> = {};
        const fieldErrors = result.error.formErrors.fieldErrors;
        for (const key in fieldErrors) {
          if (fieldErrors.hasOwnProperty(key)) {
            errors[key as keyof FormValues] = fieldErrors[key as keyof typeof fieldErrors]?.[0];
          }
        }
        return errors;
      }
    },
  });
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(event.currentTarget.files || []);
    formik.setFieldValue('images', files);
  };

  return (
    <form onSubmit={formik.handleSubmit} className='new-sale__form form'>
      <div className='form__field'>
        <label htmlFor='productName' className='form__label'>
          Product name
        </label>
        {formik.errors.productName && formik.touched.productName && (
          <p className='form__error'>{formik.errors.productName}</p>
        )}
        <input
          type='text'
          id='productName'
          name='productName'
          placeholder='Product name'
          className='form__input'
          maxLength={60}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.productName}
        />
      </div>
      <div className='form__field'>
        <label htmlFor='price' className='form__label'>
          Price <span className='form__hint'>(in dollars $)</span>
        </label>
        {formik.errors.price && formik.touched.price && <p className='form__error'>{formik.errors.price}</p>}
        <input
          type='number'
          id='price'
          name='price'
          placeholder='1.00'
          className='form__input'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
      </div>
      <div className='form__field'>
        <label htmlFor='images' className='form__label'>
          Product images <span className='form__hint'>(1-10 files)</span>
        </label>
        {formik.errors.images && formik.touched.images && (
          <p className='form__error'>
            {formik.errors.images && (typeof formik.errors.images === 'string' ? formik.errors.images : 'error')}
          </p>
        )}
        <input
          type='file'
          id='images'
          name='images'
          multiple={true}
          className='form__input image-input'
          onChange={handleFileChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className='form__field'>
        <label htmlFor='description' className='form__label'>
          Description <span className='form__hint'>(optional)</span>
        </label>
        {formik.errors.description && formik.touched.description && (
          <p className='form__error'>{formik.errors.description}</p>
        )}
        <textarea
          id='description'
          name='description'
          placeholder='About product'
          rows={6}
          className='form__input'
          maxLength={200}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
      </div>
      <button className='form__submit' type='submit' disabled={formik.isSubmitting}>
        Submit
      </button>
      {fetchError && <p className='form__error'>{fetchError}</p>}
    </form>
  );
};

export default FormikForm;
