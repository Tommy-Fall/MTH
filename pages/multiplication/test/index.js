import Test from '../../../components/Test'
import { useRouter } from 'next/router'

const MultiplicationTest = () => {
    const router = useRouter()
    
    return (
        <div>
            <Test number={router.query.number}/>
        </div>
    )
}


export default MultiplicationTest