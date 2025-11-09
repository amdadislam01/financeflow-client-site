import React from 'react'
import HeroSection from '../../components/HeroSection/HeroSection'
import Overview from '../../components/Overview/Overview'
import BudgetingTips from '../../components/BudgetingTips/BudgetingTips'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Overview />
      <BudgetingTips />
    </div>
  )
}

export default Home
