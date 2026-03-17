import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";


export const getAllAssignments = createAsyncThunk('/teacher/get-assignments',async(_,{rejectWithValue})=>{
try{
    const response = await api.get('/teacher/get-assignments')
    console.log(response.data)
    return response.data
}catch(error){
    console.log("Backend error data:", error.response?.data)
    const data = error.response?.data
    return rejectWithValue(data?.message || data?.error || data?.msg || error.message)
}
})

export const getCompletedAssignments = createAsyncThunk('/submission/get-completed', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/submission')
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log("Backend error data:", error.response?.data)
        const data = error.response?.data
        return rejectWithValue(data?.message || data?.error || data?.msg || error.message)
    }
})

export const submitAssignment = createAsyncThunk('/student/submit-assignment', async (payload, { rejectWithValue }) => {
    try {
        const formData = new FormData()
        formData.append('assignment', payload.assignment)
        formData.append('student', payload.student)
        formData.append('mentor', payload.mentor)
        if (payload.frontendGithubUrl) formData.append('frontendGithubUrl', payload.frontendGithubUrl)
        if (payload.backendGithubUrl) formData.append('backendGithubUrl', payload.backendGithubUrl)
        if (payload.deployedUrl) formData.append('deployedUrl', payload.deployedUrl)
        if (payload.behanceUrl) formData.append('behanceUrl', payload.behanceUrl)
        if (payload.figmaUrl) formData.append('figmaUrl', payload.figmaUrl)
        if (payload.note) formData.append('note', payload.note)
        if (payload.referenceFile) {
            formData.append('referenceFile', {
                uri: payload.referenceFile.uri,
                name: payload.referenceFile.name,
                type: payload.referenceFile.type || 'application/pdf',
            })
        }
        const response = await api.post('/submission/submit-assignment', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return response.data
    } catch (error) {
        console.log("Backend error data:", error.response?.data)
        const data = error.response?.data
        return rejectWithValue(data?.message || data?.error || data?.msg || error.message)
    }
})