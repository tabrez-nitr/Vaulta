
import { getTransactions } from '@/lib/api'
import DashboardView from './DashboardView'


export default async function DashboardPage({ params }) {

    const { pageID } = await params

    const transactions = await getTransactions(pageID)
    console.log("Data received from API:", JSON.stringify(transactions, null, 2));

    return (
        <main>
            <DashboardView transactions={transactions} />
        </main>
    )
}