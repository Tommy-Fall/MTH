import styles from '../../styles/Operation.module.css'
import { useRouter } from 'next/router'

const Multiplication = () => {
    const router = useRouter()

    return (
        <div className={styles.container}>
            <button
                    onClick={() => router.push({
                        pathname: '/multiplication/test',
                        query: {number: 'all'}
                    })}
                    className={styles.option_all}
                >
                    All
                </button>
            {[...Array(10)].map((x, i) =>
                <button
                    onClick={() => router.push({
                        pathname: '/multiplication/test',
                        query: {number: i + 1}
                    })}
                    key={i} className={styles.option}
                >
                    {i + 1}
                </button>
            )}
        </div>
    )
}

export default Multiplication