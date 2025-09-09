import React, { useState } from 'react';
import { formatFileSize, handleFormatFile, dropImage, handleDragOver } from '@/hooks/useFileHandler';
import { ArrowsSwitchIcon, CloudArrowUpIcon, MinusIcon } from '@stash-ui/light-icons';
import { FolderPlusIcon } from '@stash-ui/solid-icons';
import { Button } from '../button';
import { cn } from '@/lib/utils';
import { Spinner } from '../spinner';

export interface DropzoneProps {
  isLoading?: boolean;
  accept?: string;
  messages: {
    title: string;
    description: string;
    primaryButton: string;
    removeButton: string;
  };
  uploadedFile?: { name: string; size: number; src: string; type: string };
  onChange?: (
    file:
      | {
          type: 'upload' | 'remove';
          file: { name: string; size: number; src: string | ''; type: string };
        }
      | {}
  ) => void;
}

interface PreviewProps {
  file: { name: string; size: number; src: string; type: string };
  messages: {
    title: string;
    description: string;
    primaryButton: string;
    removeButton: string;
  };
  handleUploadFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: () => void;
  accept: string;
  isLoading?: boolean;
}

function Dropzone({ uploadedFile, onChange, messages, isLoading, accept = 'image/*' }: DropzoneProps) {
  const [file, setFile] = useState(uploadedFile);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    const event = dropImage(e) as React.ChangeEvent<HTMLInputElement>;
    handleUploadFile(event);
  };

  const handleUploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (await handleFormatFile(event)) as {
      name: string;
      size: number;
      src: string;
      type: string;
    };

    setFile(file);
    onChange &&
      onChange({
        type: 'upload',
        file: file
      });
  };

  const removeFile = () => {
    setFile(undefined);
    onChange &&
      onChange({
        type: 'remove',
        file: {}
      });
  };

  return (
    <div
      className="flex items-center justify-center border-2 border-dashed border-hover h-[180px] w-full max-w-[632px] rounded-2xl hover:border-filled transition-all cursor-pointer"
      data-testid="dropzone"
    >
      {file || isLoading ? (
        <Preview
          file={file || { name: '', size: 0, src: '', type: '' }}
          messages={messages}
          handleUploadFile={handleUploadFile}
          removeFile={removeFile}
          accept={accept}
          isLoading={isLoading}
        />
      ) : (
        <label
          className="w-full h-full flex items-center justify-center flex-col p-6 cursor-pointer"
          data-testid="drop-area"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          htmlFor="file-upload"
        >
          <CloudArrowUpIcon className="[&>path]:fill-icon-tertiary mb-2 w-7 h-7" />
          <p className="text-sm font-semibold text-tertiary leading-6">{messages.title}</p>
          <p className="text-xs font-normal text-tertiary">{messages.description}</p>
          <input id="file-upload" type="file" accept={accept} className="hidden" onChange={handleUploadFile} />
        </label>
      )}
    </div>
  );
}

const Preview = ({ file, messages, handleUploadFile, removeFile, accept, isLoading }: PreviewProps) => {
  const isImage = file.type.startsWith('image/');

  const avatarStyle = {
    backgroundImage: `url(${file?.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  const renderFileName = (fileName: string) => {
    if (fileName.length <= 100) {
      return fileName;
    } else {
      const extensionName = fileName.split('.').pop();
      const name = fileName.substring(0, fileName.lastIndexOf('.'));
      const formattedName = extensionName && name.substring(0, 100 - extensionName.length - 3);
      return formattedName + '...' + extensionName;
    }
  };

  if (isLoading) {
    return <Spinner size="large" variant="gray" />;
  }

  return (
    <div className="flex w-fit items-center h-full gap-3 p-6" data-testid="image-preview">
      {isImage && (
        <div
          className="w-32 h-32 lg:min-w-32 lg:min-h-32 min-w-20 min-h-20 rounded-2xl border border-neutral max-w-fit"
          data-testid="image"
          style={avatarStyle}
        />
      )}

      <div className={cn('flex flex-col', { 'justify-between w-fit h-full': isImage, 'items-center h-fit gap-6': !isImage })}>
        <div className={cn({ 'flex flex-col items-center gap-1': !isImage })}>
          {file?.name && (
            <div className="flex items-center gap-1">
              {!isImage && <FolderPlusIcon className="text-icon-tertiary" />}
              <p className="line-clamp-3 break-all text-sm leading-6 font-semibold text-tertiary">{renderFileName(file?.name)}</p>
            </div>
          )}
          {file?.size && <p className="text-xs font-normal text-gray-400">{formatFileSize(file?.size)}</p>}
        </div>

        <div className="flex gap-2 w-fit">
          <Button variant="outline" prefix={<ArrowsSwitchIcon />} data-testid="change-btn">
            <label htmlFor="file-upload" className="flex items-center cursor-pointer">
              {messages.primaryButton}
              <input id="file-upload" type="file" accept={accept} className="hidden" onChange={(e) => handleUploadFile(e)} />
            </label>
          </Button>

          <Button variant="outline" prefix={<MinusIcon />} onClick={removeFile} data-testid="remove-btn">
            {messages.removeButton}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Dropzone };
