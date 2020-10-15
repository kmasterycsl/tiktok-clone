export const ROUTE_PROFILE_PAGE = (userId?) => `/tabs/user/profile/` + (userId || '')
export const ROUTE_TAG_DETAIL_PAGE = (tagId) => `/tabs/tag/detail/` + tagId
export const ROUTE_FOLLOWER_FOLLOWING_PAGE = (userId) => `/tabs/user/profile/${userId}/following-follower`
