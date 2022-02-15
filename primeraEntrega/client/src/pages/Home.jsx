import React from 'react'
import { Layout } from '../components/Layout'
import { ProductsList } from '../components/ProductsList'
import { ProductsForm } from '../components/ProductsForm'

export const Home = () => {
  return (
    <Layout>
      <ProductsList />
    </Layout>
  )
}
