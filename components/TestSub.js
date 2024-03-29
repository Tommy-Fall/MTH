import { useEffect, useState } from "react"
import styles from '../styles/Test.module.css'
import { useRouter } from 'next/router'
import Summary from './Summary'

let checked_operations = []
let pop = 0;
const TestSub = (props) => {
    const router = useRouter()

    const [operation, setOperation] = useState(false)
    const [input, setInput] = useState('')
    const [wrong, setWrong] = useState(null)

    const [finished, setFinished] = useState(false)
    const [summary, setSummary] = useState([])

    const update_operation = () => {
        // if (typeof Number(props.number) === 'number' && checked_operations.length === 11) return router.push('/')
        // if (checked_operations.length === 101) return router.push('/')

        setWrong(null)
        setInput('')
    
        let main_number = Number(props.number)
        if (props.number === 'all') main_number = Math.floor(Math.random() * 10) + 1
        let secondary_number

        secondary_number = Math.floor(Math.random() * 10) + 1
        
        for (let i = 0; i < checked_operations.length; i++) {
            
            if (((checked_operations[i][0] === secondary_number) && (main_number === checked_operations[i][1])) || ((checked_operations[i][1] === secondary_number) && (main_number === checked_operations[i][0]))) {
                pop++
                console.log(checked_operations)
                if(pop > 300) return
                return update_operation()
            }
        }

        if ((Math.floor(Math.random() * 2) + 1) === 1) setOperation([main_number, secondary_number])
        else setOperation([secondary_number, main_number])
        checked_operations.push([main_number, secondary_number])


    }

    useEffect(() => {
        update_operation()
    }, [props.number])

    const submit_response = () => {
        setInput('')
        if ((operation[0] + operation[1]) === Number(input)) update_operation()
        else {
            setWrong(operation[0] + operation[1])
        }
    }


    const Keypad = () => (

        <div className={styles.keypad}>
            {[...Array(9)].map((x, i) =>
                <button
                    key={i}
                    onClick={() => setInput(input.length < 5 ? input + String(i + 1) : input)}
                >
                    {i + 1}
                </button>
            )}
            <button onClick={() => setInput(input.slice(0, -1))}>+</button>
            <button onClick={() => setInput(input.length < 5 ? input + String(0) : input)}>0</button>
            <button onClick={() => submit_response()}>OK</button>
        </div>

    )

    return (
        <div className={styles.container}>


            {finished ? (<Summary summary={summary} />) : (
                <>
                    <div className={styles.operation}>{operation[0]} + {operation[1]}</div>
                    <div className={styles.input}>{input}</div>

                    {wrong ? (
                        <div className={styles.wrong}><label>Correct answer:</label> <span>{wrong}</span></div>
                    ) : null}

                    {Keypad()}
                </>
            )}
        </div>
    )
}

export default TestSub