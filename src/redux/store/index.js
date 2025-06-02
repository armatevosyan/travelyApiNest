// ** Redux, Thunk & Root Reducer Imports
import createDebounce from 'redux-debounced';
import rootReducer from 'redux/rootReducer';
import rootSaga from 'redux/rootSaga';
import { useSelector as useAppSelector } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// ** init middleware
const middleware = [sagaMiddleware, createDebounce()];

// ** Dev Tools
const composeEnhancers =
  (process.env.REACT_APP_DEVELOPMENT_MODE !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// ** Create store
const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)));

const { dispatch } = store;

sagaMiddleware.run(rootSaga);

const useSelector = useAppSelector;
const persister = persistStore(store);

export { store, useSelector, dispatch, persister };
