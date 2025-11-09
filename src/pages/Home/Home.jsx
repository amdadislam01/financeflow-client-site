import React from 'react'
import HeroSection from '../../components/HeroSection/HeroSection'
import Overview from '../../components/Overview/Overview'
import BudgetingTips from '../../components/BudgetingTips/BudgetingTips'
import WhyFinancialPlanning from '../../components/WhyFinancialPlanning/WhyFinancialPlanning'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Overview />
      <BudgetingTips />
      <WhyFinancialPlanning />
    </div>
  )
}

export default Home
