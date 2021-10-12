import { useEffect, useState } from "react"
import styles from '../styles/Test.module.css'
import { useRouter } from 'next/router'
import Summary from './Summary'

let checked_operations = []
const Test = (props) => {
    const router = useRouter()

    const [operation, setOperation] = useState(false)
    const [input, setInput] = useState('')
    const [wrong, setWrong] = useState(null)

    const [finished, setFinished] = useState(false)
    const [summary, setSummary] = useState([])

    const update_operation = () => {
        console.log(props.number)
        if (typeof Number(props.number) === 'number' && checked_operations.length === 11) return router.push('/')
        else if (checked_operations.length === 101) return router.push('/')

        setWrong(null)
        setInput('')
        let main_number = Number(props.number)
        if (props.number === 'all') main_number = Math.floor(Math.random() * 10) + 1
        let secondary_number

        secondary_number = Math.floor(Math.random() * 10) + 1

        for (let i = 0; i < checked_operations.length; i++) {
            if (((checked_operations[i][0] === secondary_number) && (main_number === checked_operations[i][1])) || ((checked_operations[i][1] === secondary_number) && (main_number === checked_operations[i][0]))) {
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
        if ((operation[0] * operation[1]) === Number(input)) update_operation()
        else {
            setWrong(operation[0] * operation[1])

            // console.log(operation)
            // console.log(summary[summary.length - 1] , 'fefe')
            // if ((operation[0] !== summary[summary.length - 1][0]) && (operation[1] !== summary[summary.length - 1][1])) {
            //     let newItem = [operation[0], operation[1]]
            //     let summaryCopy = summary
            //     summaryCopy.push(newItem)
            //     setSummary(summaryCopy)
            // }
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
            <button onClick={() => setInput(input.slice(0, -1))}>X</button>
            <button onClick={() => setInput(input.length < 5 ? input + String(0) : input)}>0</button>
            <button onClick={() => submit_response()}>OK</button>
        </div>

    )

    return (
        <div className={styles.container}>


            {finished ? (<Summary summary={summary} />) : (
                <>
                    <div className={styles.operation}>{operation[0]} x {operation[1]}</div>
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

export default Test