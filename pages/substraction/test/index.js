import TestSub from '../../../components/TestSub'
import { useRouter } from 'next/router'

const SubstractionTest = () => {
    const router = useRouter()
    
    return (
        <div>
            <TestSub number={router.query.number}/>
        </div>
    )
}


export default SubstractionTest