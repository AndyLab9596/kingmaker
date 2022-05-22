import Handles from '@arcgis/core/core/Handles';
import * as watchUtils from '@arcgis/core/core/watchUtils';
import Geometry from '@arcgis/core/geometry/Geometry';
import * as webMercatorUtils from '@arcgis/core/geometry/support/webMercatorUtils';
import CSVLayer from '@arcgis/core/layers/CSVLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import Point from '@arcgis/core/geometry/Point';
import Sketch from '@arcgis/core/widgets/Sketch';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import ZoomViewModel from '@arcgis/core/widgets/Zoom/ZoomViewModel';
import { css } from '@emotion/react';
import { DashboardFilterParams } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/dashboard/models';
import { message, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import peopleIcon from 'src/assets/images/icons/people-icon.svg';
import pickUpIcon from 'src/assets/images/icons/pick-up-icon.svg';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { dashboardDataAction } from 'src/reducers/dashboard/action';
import { useAppDispatch, useAppSelector } from 'src/reducers/model';
import { CustomSketch, SKETCH_NAMES } from './CustomSketch';
import { CustomZoom } from './CustomZoom';

interface CustomMapProps {
  getCsvUrl: () => Promise<string>;
  handleFilter: (params: DashboardFilterParams) => void;
}

class MapData {
  public csvLayer: CSVLayer | undefined = undefined;
  public highlight: Handles | undefined = undefined;

  setCsvLayer(csvLayer: CSVLayer) {
    this.csvLayer = csvLayer;
  }

  setHighlight(highlight: Handles) {
    this.highlight = highlight;
  }
}

const mapData = new MapData();

export const CustomMap: React.FC<CustomMapProps> = ({ getCsvUrl, handleFilter }) => {
  const { windowSize } = useWindowSize();
  const dispatch = useAppDispatch();

  const profile = useAppSelector((state) => state.auth.myProfile)!;
  const dashboardFilterParams = useAppSelector((state) => state.dashboard.dashboardFilterParams);
  const cancelSketch = useRef<HTMLDivElement>(null);

  const vm = new ZoomViewModel();
  const [mapView, setMapView] = useState<MapView>();
  const [geometry, setGeometry] = useState<Geometry>();

  const [loading, setLoading] = useState<boolean>(true);
  const [maxZoomed, setMaxZoomed] = useState<boolean>(false);
  const [minZoomed, setMinZoomed] = useState<boolean>(false);
  const [isClearSelection, setIsClearSelection] = useState<boolean>(false);
  const [isShowSuggestion, setIsShowSuggestion] = useState<boolean>(false);
  const [isClearFilter, setIsClearFilter] = useState<boolean>(false);

  const republicanMarkerSymbol = {
    type: 'simple-marker',
    color: [222, 34, 40],
    size: '8px',
  };

  const independentMarkerSymbol = {
    type: 'simple-marker',
    color: [235, 190, 51],
    size: '8px',
  };

  const democraticMarkerSymbol = {
    type: 'simple-marker',
    color: [67, 131, 217],
    size: '8px',
  };

  const getInfo = async (data) => {
    setIsShowSuggestion(true);

    const {
      attributes: { first_name, last_name, vote_likely, est_party },
    } = data.graphic;
    const popup = document.createElement('div');

    popup.innerHTML = `
      <div style="display: flex; align-items: center">
        <img src="${peopleIcon}" style="width: 30px"/>
        <span style="margin-left: 25px;">${first_name} ${last_name}</span>
      </div>

      <div style="display: flex; align-items: center; margin-top: 16px;">
        <img src="${pickUpIcon}" style="width: 30px"/>
        <span style="margin-left: 25px;">${vote_likely || 'N/A'}</span>
      </div>

      <div style="display: flex; align-items: center; margin-top: 16px;">
        <div style="width: 30px">
          <svg stroke="#b71d21" fill="#b71d21" stroke-width="0" viewBox="0 0 24 24" height="30" width="30" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"></path>
          </svg>
        </div>
        <span style="margin-left: 25px;">${'N/A'}</span>
      </div>

      <div style="display: flex; align-items: center; margin-top: 16px;">
        <div style="width: 30px">
          <svg viewBox="64 64 896 896" focusable="false" data-icon="field-time" width="30" height="30" fill="#b71d21" aria-hidden="true">
            <path d="M945 412H689c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h256c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM811 548H689c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h122c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM477.3 322.5H434c-6.2 0-11.2 5-11.2 11.2v248c0 3.6 1.7 6.9 4.6 9l148.9 108.6c5 3.6 12 2.6 15.6-2.4l25.7-35.1v-.1c3.6-5 2.5-12-2.5-15.6l-126.7-91.6V333.7c.1-6.2-5-11.2-11.1-11.2z"></path>
            <path d="M804.8 673.9H747c-5.6 0-10.9 2.9-13.9 7.7a321 321 0 01-44.5 55.7 317.17 317.17 0 01-101.3 68.3c-39.3 16.6-81 25-124 25-43.1 0-84.8-8.4-124-25-37.9-16-72-39-101.3-68.3s-52.3-63.4-68.3-101.3c-16.6-39.2-25-80.9-25-124 0-43.1 8.4-84.7 25-124 16-37.9 39-72 68.3-101.3 29.3-29.3 63.4-52.3 101.3-68.3 39.2-16.6 81-25 124-25 43.1 0 84.8 8.4 124 25 37.9 16 72 39 101.3 68.3a321 321 0 0144.5 55.7c3 4.8 8.3 7.7 13.9 7.7h57.8c6.9 0 11.3-7.2 8.2-13.3-65.2-129.7-197.4-214-345-215.7-216.1-2.7-395.6 174.2-396 390.1C71.6 727.5 246.9 903 463.2 903c149.5 0 283.9-84.6 349.8-215.8a9.18 9.18 0 00-8.2-13.3z"></path>
          </svg>
        </div>
        <span style="margin-left: 25px;">${est_party || 'N/A'}</span>
      </div>
    `;

    return popup;
  };

  const showSuggestionAlert = () => {
    message.info({
      content: 'Use our lasso tool to select an area',
    });
  };

  const csvLayer = new CSVLayer({
    renderer: {
      type: 'unique-value',
      field: 'est_party',
      uniqueValueInfos: [
        {
          value: 'Likely Republican',
          symbol: republicanMarkerSymbol,
        },
        {
          value: 'Likely Independent',
          symbol: independentMarkerSymbol,
        },
        {
          value: 'Likely Democratic',
          symbol: democraticMarkerSymbol,
        },
      ],
    } as any,
    popupTemplate: new PopupTemplate({
      title: '{first_name} {last_name}',
      outFields: ['*'],
      content: getInfo,
    }),
  });

  const getDefinitionExpression = (): string => {
    let query = '';

    if (dashboardFilterParams.city_council) {
      query = `city_council = '${
        dashboardFilterParams.city_council === 'N/A' ? '' : dashboardFilterParams.city_council
      }'`;
    }

    if (dashboardFilterParams.age_bracket) {
      query += `${query && ' AND '}age_bracket = '${dashboardFilterParams.age_bracket}'`;
    }

    if (dashboardFilterParams.est_party) {
      query += `${query && ' AND '}est_party = '${dashboardFilterParams.est_party}'`;
    }

    if (dashboardFilterParams.select_control_party) {
      query += `${query && ' AND '}est_party IN (${dashboardFilterParams.select_control_party
        .split(',')
        .map((i) => `'${i.trim()}'`)
        .toString()})`;
    }

    if (dashboardFilterParams.gender) {
      query += `${query && ' AND '}gender = '${
        dashboardFilterParams.gender === 'N/A' ? '' : dashboardFilterParams.gender === 'Male' ? 'M' : 'F'
      }'`;
    }

    if (dashboardFilterParams.voted !== undefined) {
      query += `${query && ' AND '}voted = '${dashboardFilterParams.voted ? 'True' : 'False'}'`;
    }

    if (dashboardFilterParams.contact_bar) {
      query += `${query && ' AND '} ${
        dashboardFilterParams.contact_bar === 'Mail'
          ? `contact_mail = 'True'`
          : dashboardFilterParams.contact_bar === 'Visit'
          ? `contact_visit = 'True'`
          : dashboardFilterParams.contact_bar === 'Event'
          ? `contact_event = 'True'`
          : `contact_call_text = 'True'`
      }`;
    }

    if (dashboardFilterParams.contact_poll) {
      query += `${query && ' AND '}${
        dashboardFilterParams.contact_poll === 'Contacted'
          ? `(contact_mail = 'True' OR contact_visit = 'True' OR contact_event = 'True' OR contact_call_text = 'True')`
          : `(contact_mail = 'False' AND contact_visit = 'False' AND contact_event = 'False' AND contact_call_text = 'False')`
      }`;
    }

    if (dashboardFilterParams.voter_likelihood_bar) {
      query += `${query && ' AND '}prim_cat = '${dashboardFilterParams.voter_likelihood_bar}'`;
    }

    if (dashboardFilterParams.select_control_vote_prediction) {
      query += `${query && ' AND '}prim_cat IN (${dashboardFilterParams.select_control_vote_prediction
        .split(',')
        .map((i) => `'${i}'`)
        .toString()})`;
    }

    if (dashboardFilterParams.preferred_voting_style_bar) {
      query += `${query && ' AND '}prim_type = '${dashboardFilterParams.preferred_voting_style_bar}'`;
    }

    if (dashboardFilterParams.voter_likelihood_poll) {
      query += `${query && ' AND '}prim_cat IN ('Likely','Expected') AND est_party = '${
        dashboardFilterParams.voter_likelihood_poll
      }'`;
    }

    return query;
  };

  const updateFilter = (features) => {
    if (mapView) {
      mapView.map.layers.forEach((layer) => {
        mapView.whenLayerView(layer).then((layerView: any) => {
          if (layer.type === 'csv') {
            layerView.when(() => {
              if (layerView.layer.geometryType === 'point') {
                if (mapData.highlight) {
                  mapData.highlight.remove();
                }

                mapData.setHighlight(layerView.highlight(features));
              }
            });

            watchUtils.whenFalse(layerView, 'updating', () => {
              if (csvLayer.loaded) {
                setLoading(false);
              }
            });
          }
        });
      });
    }
  };

  const handleWhenSelectOnMap = (features) => {
    if (mapView) {
      updateFilter(features);
      mapView.ui.remove('selected-features');

      const wrapperSelectedFeatures = document.createElement('div');
      const cursorMarqueeIcon = document.createElement('span');
      const selectedFeatures = document.createElement('span');
      const closeIcon = document.createElement('span');

      wrapperSelectedFeatures.id = 'selected-features';
      wrapperSelectedFeatures.className = 'flex bg-white absolute top-16 p-6 items-center';
      wrapperSelectedFeatures.style.left = 'calc(50% + 42px)';
      wrapperSelectedFeatures.style.color = '#4383d9';

      cursorMarqueeIcon.className = 'esri-icon-cursor-marquee h-32 flex items-center ml-8';
      selectedFeatures.className = 'ml-8 mr-12 font-bold';
      selectedFeatures.innerHTML = `${features.length}`;
      closeIcon.className = 'cursor-pointer text-12 text-red font-bold';
      closeIcon.innerHTML = '&#x2715';
      closeIcon.onclick = () => {
        setIsClearSelection(true);
        mapView.ui.remove('selected-features');
      };

      wrapperSelectedFeatures.appendChild(cursorMarqueeIcon);
      wrapperSelectedFeatures.appendChild(selectedFeatures);
      wrapperSelectedFeatures.appendChild(closeIcon);

      if (features.length === 0) {
        closeIcon.click();
      } else {
        mapView.ui.add(wrapperSelectedFeatures);
      }
    }
  };

  const clearSelection = async () => {
    setGeometry(undefined);
    updateFilter(null);

    dispatch(
      dashboardDataAction.cancelSketch({
        ...dashboardFilterParams,
        polygon: [],
      }),
    );

    setIsClearSelection(false);
  };

  const clearFilter = () => {
    dispatch(dashboardDataAction.setIsClearFilter(true));

    dispatch(
      dashboardDataAction.setDashboardFilterParams({
        age_bracket: '',
        est_party: '',
        voted: undefined,
        contact_bar: '',
        contact_poll: '',
        voter_likelihood_poll: '',
        voter_likelihood_bar: '',
        city_council: '',
        gender: '',
        polygon: undefined,
      }),
    );

    setIsClearFilter(true);
  };

  const isFiltering = () => {
    const {
      age_bracket,
      city_council,
      contact_bar,
      contact_poll,
      est_party,
      gender,
      polygon,
      preferred_voting_style_bar,
      select_control_party,
      select_control_vote_prediction,
      voted,
      voter_likelihood_bar,
      voter_likelihood_poll,
    } = dashboardFilterParams;

    if (
      age_bracket ||
      city_council ||
      contact_bar ||
      contact_poll ||
      est_party ||
      gender ||
      polygon ||
      preferred_voting_style_bar ||
      (select_control_party && select_control_party.split(',').length !== 3) ||
      (select_control_vote_prediction && select_control_vote_prediction.split(',').length !== 4) ||
      voted ||
      voter_likelihood_bar ||
      voter_likelihood_poll
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (mapView && isClearFilter) {
      setGeometry(undefined);
      updateFilter(null);
      setIsClearFilter(false);
      mapView.ui.remove('selected-features');
    }
  }, [mapView, isClearFilter]);

  useEffect(() => {
    if (isClearSelection) {
      clearSelection();
    }
  }, [isClearSelection]);

  useEffect(() => {
    if (isShowSuggestion) {
      showSuggestionAlert();
    }

    const timeout = setTimeout(() => {
      setIsShowSuggestion(false);
    }, 3250);

    return () => clearTimeout(timeout);
  }, [isShowSuggestion]);

  useEffect(() => {
    if (mapView) {
      if (profile.position_centre_point) {
        mapView.center = new Point({
          latitude: profile.position_centre_point[1],
          longitude: profile.position_centre_point[0],
        });
      }

      getCsvUrl().then((url) => {
        csvLayer.set('url', url);
        mapView.map.layers.add(csvLayer);
        mapData.setCsvLayer(csvLayer);
        mapView.whenLayerView(csvLayer).then((layerView) => {
          watchUtils.whenFalse(layerView, 'updating', () => {
            if (csvLayer.loaded) {
              setLoading(false);
            }
          });
        });
      });
    }
  }, [mapView]);

  useEffect(() => {
    if (mapData.csvLayer && geometry && mapView) {
      mapData.csvLayer
        .queryFeatures({
          where: getDefinitionExpression(),
          geometry,
        })
        .then((result) => {
          handleWhenSelectOnMap(result.features);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          const geometryData: any = webMercatorUtils.webMercatorToGeographic(geometry);
          handleFilter({
            ...dashboardFilterParams,
            polygon: geometryData.rings[0],
          });
          cancelSketch.current?.click();
        });
    }
  }, [geometry, mapView]);

  useEffect(() => {
    if (mapData.csvLayer) {
      if (getDefinitionExpression()) {
        mapData.csvLayer.definitionExpression = getDefinitionExpression();
      } else {
        mapData.csvLayer.definitionExpression = 'true';
      }

      setLoading(true);
      mapData.csvLayer.refresh();
    }
  }, [
    dashboardFilterParams.age_bracket,
    dashboardFilterParams.est_party,
    dashboardFilterParams.gender,
    dashboardFilterParams.voted,
    dashboardFilterParams.contact_bar,
    dashboardFilterParams.contact_poll,
    dashboardFilterParams.voter_likelihood_bar,
    dashboardFilterParams.voter_likelihood_poll,
    dashboardFilterParams.city_council,
    dashboardFilterParams.select_control_party,
    dashboardFilterParams.select_control_vote_prediction,
    dashboardFilterParams.preferred_voting_style_bar,
  ]);

  useEffect(() => {
    const webMap = new WebMap({
      basemap: 'streets-vector',
    });

    const view = new MapView({
      container: 'map-view',
      map: webMap,
      zoom: windowSize <= 1366 ? 6 : 8,
      // zoom: windowSize <= 1366 ? 3 : 4,
      constraints: {
        maxZoom: 20,
        minZoom: windowSize <= 1366 ? 2 : 4,
        // minZoom: 2,
      },
      ui: {
        components: ['attribution'],
      },
      popup: {
        dockOptions: {
          buttonEnabled: false,
        },
      },
      highlightOptions: {
        haloColor: [222, 34, 40],
      },
    });

    const onViewLoaded = () => {
      vm.view = view;
      watchUtils.init(view, 'zoom', onZoomChange);
    };

    const onZoomChange = (value) => {
      setMaxZoomed(value === view.constraints.maxZoom);
      setMinZoomed(value === view.constraints.minZoom);
    };

    const zoomIn = () => {
      if (!maxZoomed) {
        vm.zoomIn();
      }
    };

    const zoomOut = () => {
      if (!minZoomed) {
        vm.zoomOut();
      }
    };

    view.when(() => {
      const graphicsLayer = new GraphicsLayer();

      const sketchViewModel = new SketchViewModel({
        view,
        layer: graphicsLayer,
        defaultCreateOptions: {
          mode: 'freehand',
        },
        updateOnGraphicClick: false,
      });

      const sketch = new Sketch({
        viewModel: sketchViewModel,
      });

      sketch.on('create', ({ graphic, state, tool }) => {
        if (state === 'complete') {
          if (tool !== 'polygon') {
            setIsShowSuggestion(true);
          }

          if (graphic.geometry && mapData.csvLayer) {
            setGeometry(graphic.geometry);
          }
        }
      });

      const drawByName = (sketchName: SKETCH_NAMES | null) => {
        if (!sketchName) {
          sketch.cancel();
        }

        if (SKETCH_NAMES.RECTANGLE === sketchName) {
          sketch.create('rectangle');
        }

        if (SKETCH_NAMES.LASSO === sketchName) {
          sketch.create('polygon');
        }

        if (SKETCH_NAMES.CIRCLE === sketchName) {
          sketch.create('circle');
        }

        view.popup.close();
      };

      const wrapperSketch = document.createElement('div');
      wrapperSketch.className = 'flex bg-white w-62 p-6 absolute top-16 left-0 right-0 mx-auto items-center';

      const wrapperZoom = document.createElement('div');
      wrapperZoom.style.borderRadius = '24px';
      wrapperZoom.style.transform = 'translate(-50%, -50%)';
      wrapperZoom.className = 'p-20 bg-white -bottom-16 left-1/2';

      view.ui.add(wrapperZoom);

      if (!(profile.is_demo_account && profile.is_demo_account_ready === false)) {
        view.ui.add(wrapperSketch);
      }
      if (!(profile.is_demo_account && profile.is_demo_account_ready === false)) {
        ReactDOM.render(<CustomSketch onSelect={drawByName} cancelSketch={cancelSketch} />, wrapperSketch);
      }
      ReactDOM.render(
        <CustomZoom
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          clearFilter={clearFilter}
          setIsFilterChartsByChart={(isCheck) => dispatch(dashboardDataAction.setIsFilterChartsByChart(isCheck))}
        />,
        wrapperZoom,
      );

      onViewLoaded();
    });

    view.ui.remove('attribution');
    setMapView(view);

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div
      css={[
        cssWrapper,
        css`
          .plus-icon,
          .minus-icon {
            color: #707070;
          }
          .plus-icon {
            opacity: ${maxZoomed ? 0.5 : 1};
            pointer-events: ${maxZoomed ? 'none' : 'auto'};
          }

          .minus-icon {
            opacity: ${minZoomed ? 0.5 : 1};
            pointer-events: ${minZoomed ? 'none' : 'auto'};
          }

          .clear-filter {
            display: ${isFiltering() ? 'block' : 'none'};
          }
        `,
      ]}
      className="w-full h-full"
    >
      <div id="map-view" className="w-full h-full"></div>

      {loading && <Spin size="large" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
    </div>
  );
};

const cssWrapper = css`
  position: relative;

  .esri-view-surface {
    &:focus::after {
      outline: none;
    }
  }

  .esri-ui {
    .esri-popup {
      border-radius: 24px;
    }

    .esri-popup--shadow {
      box-shadow: none;
    }

    .esri-popup__main-container {
      background-color: white;
      border-radius: 24px;
      width: 100%;

      .esri-popup__header {
        .esri-popup__button {
          outline: none;
          &:hover {
            background-color: white;
          }
        }

        .esri-widget__heading.esri-popup__header-title {
          display: none;
        }
      }

      .esri-popup__content {
        margin-left: 28px;
        margin-right: 28px;
        max-width: 300px;
      }

      .esri-feature.esri-widget {
        background-color: white;
        color: #707070;
        font-weight: 500;
        font-size: 20px;
      }

      .esri-popup__footer {
        .esri-popup__button {
          outline: none;
          &:hover {
            background-color: white;
          }
        }

        .esri-popup__navigation {
          background-color: white;

          .esri-popup__button {
            background-color: white;
            color: #707070;
          }
        }
      }

      .esri-popup__feature-menu {
        .esri-popup__feature-menu-header,
        .esri-popup__feature-menu-item {
          background-color: #707070;
          color: white;
        }
      }
    }

    .esri-popup__pointer .esri-popup__pointer-direction {
      background-color: white;
    }
  }
`;
