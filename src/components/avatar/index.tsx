import React, { useState } from 'react';
import { Avatar as AntAvatar, Spin } from 'antd';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';

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

const Avatar: React.FC<AvatarProps> = React.memo((props) => {
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
        <AntAvatar
          size={size || 20}
          className={`flex items-center justify-center ${className}`}
          icon={<UserOutlined />}
        />
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
            onError={() => setIsLoading(false)}
            style={isLoading ? { display: 'none' } : undefined}
            className="object-cover w-full h-full"
            alt=""
          />
        </section>
      )}
    </div>
  );
});

export default Avatar;
