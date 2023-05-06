import axiosInstance from "./axios.ts";
import {AcceptFriendRequestResponse, FriendRequest} from "../type.ts";
import {ISendFriendRequestForm} from "../sections/dashboard/SendFriendRequest.tsx";


export const rejectFriendRequest = async (id: number) =>
    axiosInstance.patch<FriendRequest>(`/friends-request/reject?id=${id}`)

export const acceptFriendRequest = async (id: number) =>
    axiosInstance.patch<AcceptFriendRequestResponse>(`/friends-request/accept?id=${id}`)

export const cancelFriendRequest = async (id: number) =>
    axiosInstance.delete<FriendRequest>(`/friends-request/cancel?id=${id}`)

export const sendFriendRequest = async (data: ISendFriendRequestForm) =>
    axiosInstance.post<FriendRequest>(`/friends-request`, data)

export const getFriendRequests = async () =>
    axiosInstance.get<FriendRequest[]>(`/friends-request`)