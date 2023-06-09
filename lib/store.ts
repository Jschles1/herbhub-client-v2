import { createReducerContext } from 'react-use';

type ActionType = 'search' | 'filter' | 'sortBy' | 'reset';

type Action = {
  type: ActionType;
  payload: {
    value: string;
    checked?: boolean;
  };
};

const createURLParams = (
  params: string,
  newParamType: ActionType,
  newParam: string,
  isChecked: boolean = false
): string => {
  const urlParams = new URLSearchParams(params);
  const isFilterChange = newParamType === 'filter';
  const isSearchChange = newParamType === 'search';
  const isSortByChange = newParamType === 'sortBy';

  if (isSortByChange && newParam === null) {
    urlParams.delete(newParamType);
    return urlParams.toString();
  }

  const isDispensaryLocationChange =
    newParam.includes('loc/') && isFilterChange;
  const filter = urlParams.get('filter');

  if (isSearchChange) {
    newParam.trim() === ''
      ? urlParams.delete(newParamType)
      : urlParams.set(newParamType, newParam);
  }

  if (isSortByChange) {
    urlParams.set(newParamType, newParam);
  }

  // Adding new filter if checked, remove value if unchecked
  if (isFilterChange) {
    if (isChecked) {
      if (filter) {
        if (filter.includes(',')) {
          if (filter.includes('loc/') && isDispensaryLocationChange) {
            const paramArray = filter.split(',');
            const newParamArray = paramArray.map((param) =>
              param.includes('loc/') ? newParam : param
            );
            newParam = newParamArray.join(',');
          } else {
            newParam = filter + ',' + newParam;
          }
        } else {
          if (!isDispensaryLocationChange) {
            newParam = filter + ',' + newParam;
          }
        }
      }
      urlParams.set(newParamType, newParam);
    } else {
      if (filter) {
        if (filter.includes(',')) {
          newParam = filter
            .split(',')
            .filter((param) => param !== newParam)
            .join(',');
        } else {
          newParam = filter.replace(newParam, '');
        }
        urlParams.set(newParamType, newParam);
      } else {
        urlParams.delete(newParamType);
      }
    }
  }

  return urlParams.toString();
};

export const initialState = '';

const reducer = (state: string, action: Action) => {
  switch (action.type) {
    case 'search':
    case 'filter':
    case 'sortBy':
      const result = createURLParams(
        state,
        action.type,
        action.payload.value,
        action.payload.checked
      );
      return result;
    case 'reset':
    default:
      return initialState;
  }
};

export const [useQueryParams, QueryParamsProvider] = createReducerContext(
  reducer,
  initialState
);
