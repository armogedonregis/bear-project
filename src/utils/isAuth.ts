import axios from 'axios'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { NextPageContext } from 'next'
import Router from 'next/router'

export const isAuth = async ({ req, res }: NextPageContext) => {
  const token = getCookie('token', { req, res })
  try {
    if (!token) {
      return false
    }
    const user = await axios.get(`${process.env.API_KEY}/users`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    })

    return user.data
  } catch (error: any) {
    deleteCookie('token')
    return false
  }
}

export const authLogin = async (token: string) => {
  setCookie('token', token, { maxAge: 60 * 60 * 24 })
}

export const authLogout = () => {
  deleteCookie('token')
  Router.push('/login')
}
