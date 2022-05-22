import React from 'react';
import { DashboardFilterParams } from '@goldfishcode/kingmakerdata-api-sdk/libs/api/dashboard/models';

import { CustomMap } from './CustomMap';
import { useAppSelector } from 'src/reducers/model';
import { last } from 'lodash';
interface MapProps {
  handleFilter: (params: DashboardFilterParams) => void;
}
const cacheNameLocal = 'MapData';
const Map: React.FC<MapProps> = ({ handleFilter }) => {
  const profile = useAppSelector((state) => state.auth.myProfile)!;
  const getFileVersion = () => {
    let csvName: string | undefined;
    if (profile && profile.position_file_path) {
      csvName = last(profile.position_file_path.split('/'));
    }
    return csvName || 'csv_cache';
  };
  const initialCache = async (cacheName = cacheNameLocal, url = '') => {
    if ('caches' in window && profile.position_file_path) {
      // Opening given cache and putting our data into it
      const res = await fetch(profile.position_file_path, {
        method: 'GET',
        headers: {
          'content-type': 'text/csv;charset=UTF-8',
        },
      });
      if (res.status === 200) {
        const data = await res.text();
        const dataSave = new Response(JSON.stringify(data));
        const cache = await caches.open(cacheName);
        await cache.put(url, dataSave);
      } else {
        console.log(`Error code ${res.status}`);
      }
    }
  };

  const emptyCache = async () => {
    if ('caches' in window) {
      const names = await caches.keys();
      const deletes = names.map((f) => caches.delete(f));
      await Promise.allSettled(deletes);
    }
  };

  const getDataCache = async (cacheName = cacheNameLocal) => {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(getFileVersion());
    if (!cachedResponse || !cachedResponse.ok) {
      await emptyCache();
      return false;
    }
    return await cachedResponse.json();
  };

  const getData = async () => {
    console.time('Load Data');
    const cacheResponse = await getDataCache(cacheNameLocal);
    let response = '';
    if (!cacheResponse) {
      console.log('Call API');
      await initialCache(cacheNameLocal, getFileVersion());
      response = await getDataCache(cacheNameLocal);
    } else {
      console.log('Read Cache');
      response = cacheResponse;
    }
    const blob = new Blob([response], {
      type: 'plain/text',
    });

    const defaultCsv = `
    id|latitude|longitude
    0|0|0
    `;
    const defaultBlob = new Blob([defaultCsv], {
      type: 'plain/text',
    });
    console.timeLog('Load Data');
    return response ? URL.createObjectURL(blob) : URL.createObjectURL(defaultBlob);
  };

  return <CustomMap handleFilter={handleFilter} getCsvUrl={getData} />;
};

export default Map;
