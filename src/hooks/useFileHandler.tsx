export const formatFileSize = (size: number) => {
  if (size === 0) return '0 Byte';

  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(1) +
    [' Bytes', ' KB', ' MB', ' GB', ' TB'][i]
  );
};

export const handleFormatFile = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  if (!event?.target?.files) return;

  const file = event?.target?.files[0];
  const url = URL.createObjectURL(file);

  return {
    name: file.name,
    size: file.size,
    src: url,
  };
};

export const dropImage = (e: React.DragEvent<HTMLLabelElement>) => {
  e.preventDefault();
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    const file = e.dataTransfer.files[0];
    const event = {
      target: {
        files: [file],
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    return event;
  }
};

export const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
  e.preventDefault();
};
