export interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
    error?: any;
  }
  
  export const successResponse = (message: string, data: any = null): ApiResponse => {
    return {
      success: true,
      message,
      data,
    };
  };
  
  export const errorResponse = (message: string, error: any = null): ApiResponse => {
    return {
      success: false,
      message,
      error,
    };
  };