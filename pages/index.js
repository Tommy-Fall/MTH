import styles from '../styles/Home.module.css'
import router, { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()

  return (
    <div className={styles.container}>
      <button onClick={()=>router.push('/multiplication')} className={styles.option}>Multiplication</button>
      <button onClick={()=>router.push('/substraction')} className={styles.option}>Substraction</button>
    </div>
  )
}
