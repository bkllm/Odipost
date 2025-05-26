export interface PaginatedResponse<T> {
  data:       T[]
  totalPages: number;
}

export interface ApiResponse<T> {
  data:       T
  message?:   string
  success?:   boolean
}