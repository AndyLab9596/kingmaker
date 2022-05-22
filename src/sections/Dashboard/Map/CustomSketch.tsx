import React from 'react';
import { css } from '@emotion/react';
import { Menu, Dropdown } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

export enum SKETCH_NAMES {
  RECTANGLE = 'Rectangle',
  LASSO = 'Lasso',
  CIRCLE = 'Circle',
}

const sketches = [
  {
    name: SKETCH_NAMES.RECTANGLE,
    iconClassName: 'esri-icon-checkbox-unchecked',
  },
  {
    name: SKETCH_NAMES.LASSO,
    iconClassName: 'esri-icon-lasso',
  },
  {
    name: SKETCH_NAMES.CIRCLE,
    iconClassName: 'esri-icon-radio-unchecked',
  },
];

interface CustomSketchProps {
  cancelSketch: React.RefObject<HTMLDivElement>;
  onSelect: (sketchName: SKETCH_NAMES | null) => void;
}

export const CustomSketch: React.FC<CustomSketchProps> = ({ cancelSketch, onSelect }) => {
  const [selectedSketch, setSelectedSketch] = React.useState<string | null>();

  const menu = (
    <Menu>
      {sketches.map((sketch, index) => (
        <Menu.Item
          key={index}
          onClick={() => {
            onSelect(sketch.name);
            setSelectedSketch(sketch.name);
          }}
          css={css`
            border-left: 3px solid ${selectedSketch === sketch.name ? '#4383D9' : 'transparent'};
          `}
        >
          <div className="flex items-center">
            <span className={sketch.iconClassName} />
            <div className="ml-8">{sketch.name}</div>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <div
        className="w-32 h-32 mr-4 flex justify-center items-center cursor-pointer"
        css={css`
          border: 1px solid #4383d9;
          color: ${selectedSketch ? 'white' : 'black'};
          background-color: ${selectedSketch ? '#4383D9' : 'transparent'};
          pointer-events: ${selectedSketch ? 'auto' : 'none'};
        `}
        ref={cancelSketch}
        onClick={() => {
          onSelect(null);
          setSelectedSketch(null);
        }}
      >
        {sketches.map(
          (sketch, index) => sketch.name === selectedSketch && <span key={index} className={sketch.iconClassName} />,
        )}

        {!selectedSketch && <span className="esri-icon-cursor" />}
      </div>
      <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
        <CaretDownOutlined className="h-32 flex items-center" />
      </Dropdown>
    </>
  );
};
