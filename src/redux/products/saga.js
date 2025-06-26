import { axiosApiInstance, config } from 'custom-configs';
import { catchResponseMessages } from 'utils/methods';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  // Get Products
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure,
  // Get Single Product
  getProductRequest,
  getProductSuccess,
  getProductFailure,
  // Get Pending Products
  getPendingProductsRequest,
  getPendingProductsSuccess,
  getPendingProductsFailure,
  // Get Product Stats
  getProductStatsRequest,
  getProductStatsSuccess,
  getProductStatsFailure,
  // Approve Product
  approveProductRequest,
  approveProductSuccess,
  approveProductFailure,
  // Reject Product
  rejectProductRequest,
  rejectProductSuccess,
  rejectProductFailure,
  // Update Product Status
  updateProductStatusRequest,
  updateProductStatusSuccess,
  updateProductStatusFailure,
  // Delete Product
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  // Bulk Update Status
  bulkUpdateStatusRequest,
  bulkUpdateStatusSuccess,
  bulkUpdateStatusFailure,
  // Bulk Delete
  bulkDeleteProductsRequest,
  bulkDeleteProductsSuccess,
  bulkDeleteProductsFailure
} from './actions';

const ADMIN_URL = `${config.API_URL}/api`;

// Helper function to transform backend data to frontend format
const transformProductData = (product) => {
  return {
    id: product.ID,
    name: product.post_title,
    description: product.post_excerpt,
    status: product.post_status,
    date: product.post_date,
    dateEstablish: product.date_establish,
    rating: product.rating_avg,
    ratingCount: product.rating_count,
    wishlist: product.wishlist,
    claimUse: product.claim_use,
    claimVerified: product.claim_verified,
    address: product.address,
    zipCode: product.zip_code,
    phone: product.phone,
    fax: product.fax,
    email: product.email,
    website: product.website,
    color: product.color,
    icon: product.icon,
    priceMin: product.price_min,
    priceMax: product.price_max,
    bookingPriceDisplay: product.booking_price_display,
    bookingStyle: product.booking_style,
    latitude: product.latitude,
    longitude: product.longitude,
    guid: product.guid,
    image: product.image,
    author: product.author,
    category: product.category
  };
};

// Get Products
function* getProducts({ payload }) {
  try {
    const { filters = {} } = payload || {};

    const response = yield call(() => axiosApiInstance.get(`${ADMIN_URL}/admin/products`, { params: filters }));

    if (response?.status === 200) {
      const transformedData = {
        data: (response.data.data || response.data || []).map(transformProductData),
        total: response.data.total || response.data.data?.length || 0,
        message: response.data.message || 'Products fetched successfully'
      };
      yield put(getProductsSuccess(transformedData));
    }
  } catch (e) {
    console.log('Error in getProducts:', e);
    if (e?.response?.data) {
      yield put(getProductsFailure(catchResponseMessages(e)));
    } else {
      yield put(getProductsFailure('Failed to fetch products'));
    }
  }
}

// Get Single Product
function* getProduct({ payload }) {
  try {
    const { id, userRole = 'admin' } = payload || {};
    const endpoint = userRole === 'moderator' ? '/products/moderator/products' : '/products/products';

    const response = yield call(() => axiosApiInstance.get(`${ADMIN_URL}${endpoint}/${id}`));

    if (response?.status === 200) {
      const transformedData = {
        data: transformProductData(response.data.data || response.data),
        message: response.data.message || 'Product fetched successfully'
      };
      yield put(getProductSuccess(transformedData));
    }
  } catch (e) {
    console.log('Error in getProduct:', e);
    if (e?.response?.data) {
      yield put(getProductFailure(catchResponseMessages(e)));
    } else {
      yield put(getProductFailure('Failed to fetch product'));
    }
  }
}

// Get Pending Products
function* getPendingProducts({ payload }) {
  try {
    const { userRole = 'products', filters = {} } = payload || {};
    const endpoint = userRole === 'moderator' ? '/products/moderator/products/pending/list' : '/products/products/pending/list';

    const response = yield call(() => axiosApiInstance.get(`${ADMIN_URL}${endpoint}`, { params: filters }));

    if (response?.status === 200) {
      const transformedData = {
        data: (response.data.data || response.data || []).map(transformProductData),
        total: response.data.total || response.data.data?.length || 0,
        message: response.data.message || 'Pending products fetched successfully'
      };
      yield put(getPendingProductsSuccess(transformedData));
    }
  } catch (e) {
    console.log('Error in getPendingProducts:', e);
    if (e?.response?.data) {
      yield put(getPendingProductsFailure(catchResponseMessages(e)));
    } else {
      yield put(getPendingProductsFailure('Failed to fetch pending products'));
    }
  }
}

// Get Product Stats
function* getProductStats({ payload }) {
  try {
    const { userRole = 'products' } = payload || {};
    const endpoint = userRole === 'moderator' ? '/products/moderator/products/stats/overview' : '/products/products/stats/overview';

    const response = yield call(() => axiosApiInstance.get(`${ADMIN_URL}${endpoint}`));

    if (response?.status === 200) {
      yield put(getProductStatsSuccess(response.data));
    }
  } catch (e) {
    console.log('Error in getProductStats:', e);
    if (e?.response?.data) {
      yield put(getProductStatsFailure(catchResponseMessages(e)));
    } else {
      yield put(getProductStatsFailure('Failed to fetch product statistics'));
    }
  }
}

// Approve Product
function* approveProduct({ payload }) {
  try {
    const { id, approvalData = {}, userRole = 'admin' } = payload || {};
    const endpoint = userRole === 'moderator' ? '/products/moderator/products' : '/products/products';

    const response = yield call(() => axiosApiInstance.patch(`${ADMIN_URL}${endpoint}/${id}/approve`, approvalData));

    if (response?.status === 200) {
      yield put(approveProductSuccess(response.data));
    }
  } catch (e) {
    console.log('Error in approveProduct:', e);
    if (e?.response?.data) {
      yield put(approveProductFailure(catchResponseMessages(e)));
    } else {
      yield put(approveProductFailure('Failed to approve product'));
    }
  }
}

// Reject Product
function* rejectProduct({ payload }) {
  try {
    const { id, rejectionData = {}, userRole = 'admin' } = payload || {};
    const endpoint = userRole === 'moderator' ? '/products/moderator/products' : '/products/products';

    const response = yield call(() => axiosApiInstance.patch(`${ADMIN_URL}${endpoint}/${id}/reject`, rejectionData));

    if (response?.status === 200) {
      yield put(rejectProductSuccess(response.data));
    }
  } catch (e) {
    console.log('Error in rejectProduct:', e);
    if (e?.response?.data) {
      yield put(rejectProductFailure(catchResponseMessages(e)));
    } else {
      yield put(rejectProductFailure('Failed to reject product'));
    }
  }
}

// Update Product Status (Admin only)
function* updateProductStatus({ payload }) {
  try {
    const { id, statusData } = payload || {};

    const response = yield call(() => axiosApiInstance.patch(`${ADMIN_URL}/admin/products/${id}/status`, statusData));

    if (response?.status === 200) {
      yield put(updateProductStatusSuccess(response.data));
    }
  } catch (e) {
    console.log('Error in updateProductStatus:', e);
    if (e?.response?.data) {
      yield put(updateProductStatusFailure(catchResponseMessages(e)));
    } else {
      yield put(updateProductStatusFailure('Failed to update product status'));
    }
  }
}

// Delete Product (Admin only)
function* deleteProduct({ payload }) {
  try {
    const { id } = payload || {};

    const response = yield call(() => axiosApiInstance.delete(`${ADMIN_URL}/admin/products/${id}`));

    if (response?.status === 200) {
      yield put(deleteProductSuccess(response.data));
    }
  } catch (e) {
    console.log('Error in deleteProduct:', e);
    if (e?.response?.data) {
      yield put(deleteProductFailure(catchResponseMessages(e)));
    } else {
      yield put(deleteProductFailure('Failed to delete product'));
    }
  }
}

// Bulk Update Status (Admin only)
function* bulkUpdateStatus({ payload }) {
  try {
    const { productIds, statusData } = payload || {};

    const response = yield call(() =>
      axiosApiInstance.patch(`${ADMIN_URL}/admin/products/bulk/status`, {
        productIds,
        ...statusData
      })
    );

    if (response?.status === 200) {
      yield put(bulkUpdateStatusSuccess(response.data));
    }
  } catch (e) {
    console.log('Error in bulkUpdateStatus:', e);
    if (e?.response?.data) {
      yield put(bulkUpdateStatusFailure(catchResponseMessages(e)));
    } else {
      yield put(bulkUpdateStatusFailure('Failed to update products status'));
    }
  }
}

// Bulk Delete (Admin only)
function* bulkDeleteProducts({ payload }) {
  try {
    const { productIds } = payload || {};

    const response = yield call(() =>
      axiosApiInstance.delete(`${ADMIN_URL}/admin/products/bulk/delete`, {
        data: { productIds }
      })
    );

    if (response?.status === 200) {
      yield put(bulkDeleteProductsSuccess(response.data));
    }
  } catch (e) {
    console.log('Error in bulkDeleteProducts:', e);
    if (e?.response?.data) {
      yield put(bulkDeleteProductsFailure(catchResponseMessages(e)));
    } else {
      yield put(bulkDeleteProductsFailure('Failed to delete products'));
    }
  }
}

export default function* adminProductsSaga() {
  yield takeLatest(getProductsRequest, getProducts);
  yield takeLatest(getProductRequest, getProduct);
  yield takeLatest(getPendingProductsRequest, getPendingProducts);
  yield takeLatest(getProductStatsRequest, getProductStats);
  yield takeLatest(approveProductRequest, approveProduct);
  yield takeLatest(rejectProductRequest, rejectProduct);
  yield takeLatest(updateProductStatusRequest, updateProductStatus);
  yield takeLatest(deleteProductRequest, deleteProduct);
  yield takeLatest(bulkUpdateStatusRequest, bulkUpdateStatus);
  yield takeLatest(bulkDeleteProductsRequest, bulkDeleteProducts);
}
