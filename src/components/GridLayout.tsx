import React from 'react'
import { FinancialRecord } from "@/types/financial";
import TotalIncomeCard from './TotalIncomeCard'
import TotalProfitCard from './TotalProfitCard'
import SalesByProduct from './SalesByProduct';
import ProfitByProduct from './ProfitByProduct';
import SalesChart from './SalesChart';
import TopProductsCard from './TopProductsCard';

interface FinancialDataProps {
  data: FinancialRecord[];
}

const GridLayout = ({ data }: FinancialDataProps) => {
  return (
    <div className="grid sm:grid-cols-4 sm:grid-auto-row gap-4 my-10">
        <TotalIncomeCard data={data} />
        <TotalProfitCard data={data} />
        <SalesByProduct data={data} />
        <ProfitByProduct data={data} />
        <SalesChart data={data} />
        <TopProductsCard data={data} />
    </div>
  )
}

export default GridLayout