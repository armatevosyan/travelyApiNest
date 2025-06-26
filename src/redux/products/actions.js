import { createAction } from 'redux-actions';

// Get Products Actions
export const getProductsRequest = createAction('GET_PRODUCTS_REQUEST');
export const getProductsSuccess = createAction('GET_PRODUCTS_SUCCESS');
export const getProductsFailure = createAction('GET_PRODUCTS_FAILURE');

// Get Single Product Actions
export const getProductRequest = createAction('GET_PRODUCT_REQUEST');
export const getProductSuccess = createAction('GET_PRODUCT_SUCCESS');
export const getProductFailure = createAction('GET_PRODUCT_FAILURE');

// Get Pending Products Actions
export const getPendingProductsRequest = createAction('GET_PENDING_PRODUCTS_REQUEST');
export const getPendingProductsSuccess = createAction('GET_PENDING_PRODUCTS_SUCCESS');
export const getPendingProductsFailure = createAction('GET_PENDING_PRODUCTS_FAILURE');

// Get Product Statistics Actions
export const getProductStatsRequest = createAction('GET_PRODUCT_STATS_REQUEST');
export const getProductStatsSuccess = createAction('GET_PRODUCT_STATS_SUCCESS');
export const getProductStatsFailure = createAction('GET_PRODUCT_STATS_FAILURE');

// Approve Product Actions
export const approveProductRequest = createAction('APPROVE_PRODUCT_REQUEST');
export const approveProductSuccess = createAction('APPROVE_PRODUCT_SUCCESS');
export const approveProductFailure = createAction('APPROVE_PRODUCT_FAILURE');

// Reject Product Actions
export const rejectProductRequest = createAction('REJECT_PRODUCT_REQUEST');
export const rejectProductSuccess = createAction('REJECT_PRODUCT_SUCCESS');
export const rejectProductFailure = createAction('REJECT_PRODUCT_FAILURE');

// Update Product Status Actions (Admin only)
export const updateProductStatusRequest = createAction('UPDATE_PRODUCT_STATUS_REQUEST');
export const updateProductStatusSuccess = createAction('UPDATE_PRODUCT_STATUS_SUCCESS');
export const updateProductStatusFailure = createAction('UPDATE_PRODUCT_STATUS_FAILURE');

// Delete Product Actions (Admin only)
export const deleteProductRequest = createAction('DELETE_PRODUCT_REQUEST');
export const deleteProductSuccess = createAction('DELETE_PRODUCT_SUCCESS');
export const deleteProductFailure = createAction('DELETE_PRODUCT_FAILURE');

// Bulk Update Status Actions (Admin only)
export const bulkUpdateStatusRequest = createAction('BULK_UPDATE_STATUS_REQUEST');
export const bulkUpdateStatusSuccess = createAction('BULK_UPDATE_STATUS_SUCCESS');
export const bulkUpdateStatusFailure = createAction('BULK_UPDATE_STATUS_FAILURE');

// Bulk Delete Actions (Admin only)
export const bulkDeleteProductsRequest = createAction('BULK_DELETE_PRODUCTS_REQUEST');
export const bulkDeleteProductsSuccess = createAction('BULK_DELETE_PRODUCTS_SUCCESS');
export const bulkDeleteProductsFailure = createAction('BULK_DELETE_PRODUCTS_FAILURE');

// Clear Messages Actions
export const clearProductMessages = createAction('CLEAR_PRODUCT_MESSAGES');
export const clearProductErrors = createAction('CLEAR_PRODUCT_ERRORS');

// Set Selected Products Actions
export const setSelectedProducts = createAction('SET_SELECTED_PRODUCTS');
export const clearSelectedProducts = createAction('CLEAR_SELECTED_PRODUCTS');
