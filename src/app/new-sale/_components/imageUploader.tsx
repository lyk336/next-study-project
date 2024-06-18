'use client';

import { formatFileSize } from '@edgestore/react/utils';
import { UploadCloudIcon, X } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';

type InputProps = {
  className?: string;
  value?: File[];
  onChange?: (files: File[]) => void | Promise<void>;
  onFilesAdded?: (addedFiles: File[]) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return 'Invalid file type.';
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return 'The file is not supported.';
  },
};

const MultiImageDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  ({ dropzoneOptions, value, disabled, onChange, onFilesAdded }, ref) => {
    const [customError, setCustomError] = React.useState<string>();

    const imageUrls = React.useMemo(() => {
      if (value) {
        return value.map((file) => URL.createObjectURL(file));
      }
      return [];
    }, [value]);

    // dropzone configuration
    const { getRootProps, getInputProps, fileRejections } = useDropzone({
      accept: { 'image/*': [] },
      disabled,
      onDrop: (acceptedFiles) => {
        setCustomError(undefined);
        if (dropzoneOptions?.maxFiles && (value?.length ?? 0) + acceptedFiles.length > dropzoneOptions.maxFiles) {
          setCustomError(ERROR_MESSAGES.tooManyFiles(dropzoneOptions.maxFiles));
          return;
        }
        if (acceptedFiles) {
          void onFilesAdded?.(acceptedFiles);
          void onChange?.([...(value ?? []), ...acceptedFiles]);
        }
      },
      ...dropzoneOptions,
    });

    // error validation messages
    const errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === 'file-too-large') {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === 'file-invalid-type') {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === 'too-many-files') {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } else {
          return ERROR_MESSAGES.fileNotSupported();
        }
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);

    return (
      <div className='image-uploader__box'>
        {/* Error Text */}
        <div className='form__error'>{customError ?? errorMessage}</div>
        {/* Images */}
        <div className='image-uploader'>
          <ul className='image-uploader__images'>
            {value?.map((file, index) => (
              <li key={index} className='image-uploader__image'>
                <Image
                  src={imageUrls[index]}
                  alt={typeof file === 'string' ? file : file.name}
                  width={90}
                  height={60}
                />
                {/* Remove Image Icon */}
                {imageUrls[index] && !disabled && (
                  <button
                    className='image-uploader__remove'
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange?.(value.filter((_, i) => i !== index) ?? []);
                    }}
                  >
                    <X width={16} height={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Dropzone */}
          {(!value || value.length < (dropzoneOptions?.maxFiles ?? 1)) && (
            <div {...getRootProps()} className='dropzone'>
              {/* Main File Input */}
              <input ref={ref} {...getInputProps()} />
              <div className='dropzone__box'>
                <UploadCloudIcon className='dropzone__cloud-icon' />
                <div className='dropzone__text'>drag & drop to upload</div>
                <div className='dropzone__select'>select</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);
MultiImageDropzone.displayName = 'MultiImageDropzone';

export { MultiImageDropzone };
