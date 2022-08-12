import styles from './loading.module.css'

export default function Loading(){
    return(
        <>
        <div className={styles.containerLoader}>
            <img src='/icons/loading.svg' alt='Carregamento' className={styles.loader}/>
        </div>
        </>
    )
}