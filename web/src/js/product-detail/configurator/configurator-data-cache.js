export const cachedData = [];

export const addDataSetToCachedData = (dataSet) => cachedData.push(dataSet);

export const isDataCached = (optionId) => !!cachedData.filter(cachedDataItem => cachedDataItem.id === optionId)[0];

export const getCachedDataById = (optionId) => cachedData.filter(cachedDataItem => cachedDataItem.id === optionId)[0];
