import React from 'react';
import { Dropdown, Menu, Switch, Tooltip } from 'antd';
import { SettingFilled } from '@ant-design/icons';

import minusIcon from 'src/assets/images/icons/minus-icon.svg';
import plusIcon from 'src/assets/images/icons/plus-icon.svg';
import filterRemove from 'src/assets/images/icons/filter-remove.svg';

interface CustomZoomProps {
  zoomIn: () => void;
  zoomOut: () => void;
  clearFilter: () => void;
  setIsFilterChartsByChart: (isCheck: boolean) => void;
}

export const CustomZoom: React.FC<CustomZoomProps> = ({ zoomIn, zoomOut, clearFilter, setIsFilterChartsByChart }) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <div className="flex items-center">
          <Switch defaultChecked onChange={setIsFilterChartsByChart} />
          <span className="ml-8">Update charts with selection</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex items-center">
      <Tooltip title="Zoom Out">
        <img src={minusIcon} className="minus-icon cursor-pointer" onClick={zoomOut} />
      </Tooltip>
      <span className="opacity-500 mx-10">|</span>
      <Tooltip title="Zoom In">
        <img src={plusIcon} className="plus-icon cursor-pointer" onClick={zoomIn} />
      </Tooltip>
      <Tooltip title="Clear Filter" className="clear-filter">
        <img src={filterRemove} className="cursor-pointer ml-20" onClick={clearFilter} />
      </Tooltip>
      <Dropdown overlay={menu} trigger={['click']} placement="topLeft" className="ml-20">
        <Tooltip title="Settings">
          <SettingFilled className="text-16" />
        </Tooltip>
      </Dropdown>
    </div>
  );
};
