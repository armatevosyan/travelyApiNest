import { handleActions } from 'redux-actions';
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
  bulkDeleteProductsFailure,
  // Clear Messages
  clearProductMessages,
  clearProductErrors,
  // Selected Products
  setSelectedProducts,
  clearSelectedProducts
} from './actions';

const initialState = {
  // Loading states
  loading: false,
  loadingStats: false,
  loadingSingle: false,
  loadingPending: false,
  loadingAction: false,
  loadingBulk: false,

  // Success states
  success: false,
  successMessage: '',
  statsSuccess: false,
  singleSuccess: false,
  pendingSuccess: false,
  actionSuccess: false,
  bulkSuccess: false,

  // Error states
  error: false,
  errorMessage: '',
  statsError: false,
  singleError: false,
  pendingError: false,
  actionError: false,
  bulkError: false,

  // Data
  products: [],
  productsCount: 0,
  pendingProducts: [],
  pendingCount: 0,
  singleProduct: null,
  stats: {
    totalProducts: 0,
    pendingProducts: 0,
    approvedProducts: 0,
    rejectedProducts: 0
  },
  // Selected products for bulk operations
  selectedProducts: [],
  // Filters
  filters: {
    status: 'all',
    search: '',
    category: 'all'
  }
};

const reducer = handleActions(
  {
    // Get Products
    [getProductsRequest]: (state) => ({
      ...state,
      loading: true,
      error: false,
      errorMessage: '',
      success: false,
      successMessage: ''
    }),
    [getProductsSuccess]: (state, { payload }) => ({
      ...state,
      loading: false,
      success: true,
      products: payload.data || payload || [],
      productsCount: payload.total || payload.data?.length || 0,
      successMessage: payload.message || 'Products fetched successfully'
    }),
    [getProductsFailure]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: true,
      errorMessage: payload || 'Failed to fetch products'
    }),

    // Get Single Product
    [getProductRequest]: (state) => ({
      ...state,
      loadingSingle: true,
      singleError: false,
      singleSuccess: false
    }),
    [getProductSuccess]: (state, { payload }) => ({
      ...state,
      loadingSingle: false,
      singleSuccess: true,
      singleProduct: payload.data || payload,
      successMessage: payload.message || 'Product fetched successfully'
    }),
    [getProductFailure]: (state, { payload }) => ({
      ...state,
      loadingSingle: false,
      singleError: true,
      errorMessage: payload || 'Failed to fetch product'
    }),

    // Get Pending Products
    [getPendingProductsRequest]: (state) => ({
      ...state,
      loadingPending: true,
      pendingError: false,
      pendingSuccess: false
    }),
    [getPendingProductsSuccess]: (state, { payload }) => ({
      ...state,
      loadingPending: false,
      pendingSuccess: true,
      pendingProducts: payload.data || payload || [],
      pendingCount: payload.total || payload.data?.length || 0,
      successMessage: payload.message || 'Pending products fetched successfully'
    }),
    [getPendingProductsFailure]: (state, { payload }) => ({
      ...state,
      loadingPending: false,
      pendingError: true,
      errorMessage: payload || 'Failed to fetch pending products'
    }),

    // Get Product Stats
    [getProductStatsRequest]: (state) => ({
      ...state,
      loadingStats: true,
      statsError: false,
      statsSuccess: false
    }),
    [getProductStatsSuccess]: (state, { payload }) => ({
      ...state,
      loadingStats: false,
      statsSuccess: true,
      stats: {
        totalProducts: payload.totalProducts || 0,
        pendingProducts: payload.pendingProducts || 0,
        approvedProducts: payload.approvedProducts || 0,
        rejectedProducts: payload.rejectedProducts || 0
      }
    }),
    [getProductStatsFailure]: (state, { payload }) => ({
      ...state,
      loadingStats: false,
      statsError: true,
      errorMessage: payload || 'Failed to fetch product statistics'
    }),

    // Approve Product
    [approveProductRequest]: (state) => ({
      ...state,
      loadingAction: true,
      actionError: false,
      actionSuccess: false
    }),
    [approveProductSuccess]: (state, { payload }) => ({
      ...state,
      loadingAction: false,
      actionSuccess: true,
      successMessage: payload.message || 'Product approved successfully'
    }),
    [approveProductFailure]: (state, { payload }) => ({
      ...state,
      loadingAction: false,
      actionError: true,
      errorMessage: payload || 'Failed to approve product'
    }),

    // Reject Product
    [rejectProductRequest]: (state) => ({
      ...state,
      loadingAction: true,
      actionError: false,
      actionSuccess: false
    }),
    [rejectProductSuccess]: (state, { payload }) => ({
      ...state,
      loadingAction: false,
      actionSuccess: true,
      successMessage: payload.message || 'Product rejected successfully'
    }),
    [rejectProductFailure]: (state, { payload }) => ({
      ...state,
      loadingAction: false,
      actionError: true,
      errorMessage: payload || 'Failed to reject product'
    }),

    // Update Product Status
    [updateProductStatusRequest]: (state) => ({
      ...state,
      loadingAction: true,
      actionError: false,
      actionSuccess: false
    }),
    [updateProductStatusSuccess]: (state, { payload }) => ({
      ...state,
      loadingAction: false,
      actionSuccess: true,
      successMessage: payload.message || 'Product status updated successfully'
    }),
    [updateProductStatusFailure]: (state, { payload }) => ({
      ...state,
      loadingAction: false,
      actionError: true,
      errorMessage: payload || 'Failed to update product status'
    }),

    // Delete Product
    [deleteProductRequest]: (state) => ({
      ...state,
      loadingAction: true,
      actionError: false,
      actionSuccess: false
    }),
    [deleteProductSuccess]: (state, { payload }) => ({
      ...state,
      loadingAction: false,
      actionSuccess: true,
      successMessage: payload.message || 'Product deleted successfully'
    }),
    [deleteProductFailure]: (state, { payload }) => ({
      ...state,
      loadingAction: false,
      actionError: true,
      errorMessage: payload || 'Failed to delete product'
    }),

    // Bulk Update Status
    [bulkUpdateStatusRequest]: (state) => ({
      ...state,
      loadingBulk: true,
      bulkError: false,
      bulkSuccess: false
    }),
    [bulkUpdateStatusSuccess]: (state, { payload }) => ({
      ...state,
      loadingBulk: false,
      bulkSuccess: true,
      successMessage: payload.message || 'Products status updated successfully'
    }),
    [bulkUpdateStatusFailure]: (state, { payload }) => ({
      ...state,
      loadingBulk: false,
      bulkError: true,
      errorMessage: payload || 'Failed to update products status'
    }),

    // Bulk Delete
    [bulkDeleteProductsRequest]: (state) => ({
      ...state,
      loadingBulk: true,
      bulkError: false,
      bulkSuccess: false
    }),
    [bulkDeleteProductsSuccess]: (state, { payload }) => ({
      ...state,
      loadingBulk: false,
      bulkSuccess: true,
      successMessage: payload.message || 'Products deleted successfully'
    }),
    [bulkDeleteProductsFailure]: (state, { payload }) => ({
      ...state,
      loadingBulk: false,
      bulkError: true,
      errorMessage: payload || 'Failed to delete products'
    }),

    // Clear Messages
    [clearProductMessages]: (state) => ({
      ...state,
      success: false,
      successMessage: '',
      actionSuccess: false,
      bulkSuccess: false
    }),
    [clearProductErrors]: (state) => ({
      ...state,
      error: false,
      errorMessage: '',
      actionError: false,
      bulkError: false,
      singleError: false,
      pendingError: false,
      statsError: false
    }),

    // Selected Products
    [setSelectedProducts]: (state, { payload }) => ({
      ...state,
      selectedProducts: payload
    }),
    [clearSelectedProducts]: (state) => ({
      ...state,
      selectedProducts: []
    })
  },
  initialState
);

export default reducer;
