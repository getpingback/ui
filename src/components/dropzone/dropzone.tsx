import React, { useState } from 'react';
import { ImageArrowUpIcon } from '@stash-ui/duotone-icons';
import { ImageSwitchIcon, ImageMinusIcon } from '@stash-ui/regular-icons';
import {
  formatFileSize,
  handleFormatFile,
  dropImage,
  handleDragOver,
} from '@/hooks/useFileHandler';
import { cn } from '@/lib/utils';

const labels = {
  'pt-BR': {
    dropYourImageHere: 'Arraste sua imagem aqui, ou <u>busque</u>',
    pngJpgGif: 'PNG, JPG, JPEG e GIF, limite de tamanho de 5 MB.',
    change: 'Alterar',
    remove: 'Remover',
  },
  en: {
    dropYourImageHere: 'Drop your image here, or <u>browse</u>',
    pngJpgGif: 'PNG, JPG, JPEG and GIF, max 5 MB size limit.',
    change: 'Change',
    remove: 'Remove',
  },
  es: {
    dropYourImageHere: 'Suelta tu imagen aquí, o <u>navegar</u>',
    pngJpgGif: 'PNG, JPG, JPEG y GIF, límite de tamaño de 5 MB.',
    change: 'Cambiar',
    remove: 'Eliminar',
  },
};

export interface DropzoneProps {
  uploadedFile?: { name: string; size: number; src: string };
  locale?: 'pt-BR' | 'en' | 'es';
  onChange?: (
    type: string,
    file: { name: string; size: number; src: string } | {}
  ) => void;
}

function Dropzone({ uploadedFile, onChange, locale = 'en' }: DropzoneProps) {
  const [file, setFile] = useState(uploadedFile);

  const avatarStyle = {
    backgroundImage: `url(${file?.src})`,
    width: 132,
    height: 132,
    minWidth: 132,
    minHeight: 132,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: 8,
    border: '1px solid #27272A14',
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    const event = dropImage(e) as React.ChangeEvent<HTMLInputElement>;
    handleUploadFile(event);
  };

  const handleUploadFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (await handleFormatFile(event)) as {
      name: string;
      size: number;
      src: string;
    };
    setFile(file);
    onChange && onChange('upload', file);
  };

  const removeFile = () => {
    setFile(undefined);
    onChange && onChange('remove', {});
  };

  const ImagePreview = () => {
    const Button = ({
      onClick,
      className,
      children,
      ...props
    }: {
      onClick?: () => void;
      className?: string;
      children: React.ReactNode;
    }) => (
      <button
        onClick={onClick}
        className={cn(
          'w-full flex items-center justify-center rounded-lg h-[32px] border border-[#D4D4D8] py-[8px] px-[12px] text-secondary-foreground text-xs font-semibold hover:shadow-[0_0_0_3px_#71717A12] transition-all',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );

    return (
      <div
        className='flex justify-between h-[132px]'
        data-testid='image-preview'
      >
        <div data-testid='image' style={avatarStyle} />

        <div className='w-full flex flex-col justify-between pl-[12px]'>
          <div>
            {file?.name && (
              <p className='text-sm font-semibold text-primary-foreground'>
                {file?.name}
              </p>
            )}
            {file?.size && (
              <p className='text-xs font-normal text-[#A1A1AA]'>
                {formatFileSize(file?.size)}
              </p>
            )}
          </div>

          <div className='flex'>
            <Button className='mr-[12px]'>
              <label
                htmlFor='file-upload'
                className='flex items-center cursor-pointer'
              >
                <ImageSwitchIcon width={16} height={16} className='mr-[4px]' />
                {labels[locale].change}
                <input
                  id='file-upload'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={(e) => handleUploadFile(e)}
                />
              </label>
            </Button>
            <Button onClick={removeFile} data-testid='remove-btn'>
              <ImageMinusIcon width={16} height={16} className='mr-[4px]' />
              {labels[locale].remove}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const DropArea = () => (
    <label
      data-testid='drop-area'
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      htmlFor='file-upload'
      className='flex justify-center items-center flex-col border-2 border-dashed p-[24px] rounded-xl [&>svg>path]:hover:fill-[#9061F9] [&>svg>g]:hover:fill-[#9061F9] hover:border-[#9061F973] transition-all cursor-pointer'
    >
      <ImageArrowUpIcon className='[&>path]:fill-[#71717A] [&>path>g]:fill-[#71717A]' />
      <p
        className='text-sm font-normal text-secondary-foreground'
        dangerouslySetInnerHTML={{
          __html: labels[locale].dropYourImageHere,
        }}
      />
      <p className='text-xs font-normal text-tertiary-foreground'>
        {labels[locale].pngJpgGif}
      </p>
      <input
        id='file-upload'
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleUploadFile}
      />
    </label>
  );

  return (
    <div className='w-full' data-testid='dropzone'>
      {file ? <ImagePreview /> : <DropArea />}
    </div>
  );
}

export { Dropzone };
