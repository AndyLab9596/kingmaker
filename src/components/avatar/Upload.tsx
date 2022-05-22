import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

interface AvatarProps {
  src?: string;
  alt?: string;
  circle?: boolean;
  width?: number;
  height?: number;
  size?: number;
  file?: File;
  className?: string;
  onClick?(): void;
}

const AntIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const UploadAvatar: React.FC<AvatarProps> = React.memo((props) => {
  const { src, file, circle, width, height, size, className = '', onClick } = props;
  const [isLoading, setIsLoading] = useState(true);

  const fileUrl = React.useMemo(() => {
    if (file && file.type.includes('image/')) {
      return URL.createObjectURL(file);
    }
    return undefined;
  }, [file]);
  return (
    <div
      onClick={onClick}
      className="border-20 overflow-hidden border-solid border-white border-opacity-20 rounded-full"
    >
      {!src && !fileUrl ? (
        <div
          style={{
            width: size || 20,
            height: size || 20,
          }}
          className={`flex items-center justify-center bg-background ${className}`}
        >
          <div className="flex flex-col gap-y-10 justify-center items-center text-white">
            <FaUpload size={40} />
            <div className="text-14">Upload Photo</div>
          </div>
        </div>
      ) : (
        <section
          style={{
            width: width || size || '20px',
            height: height || size || '20px',
          }}
          className={`${circle ? 'rounded-full' : ''} ${className} flex items-center justify-center`}
        >
          {isLoading && <Spin indicator={AntIcon} />}
          <img
            src={fileUrl || src}
            onLoad={() => setIsLoading(false)}
            style={isLoading ? { display: 'none' } : undefined}
            className="object-cover w-full h-full"
            alt=""
          />
        </section>
      )}
    </div>
  );
});

export default UploadAvatar;
