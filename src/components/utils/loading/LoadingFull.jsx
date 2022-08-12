import styles from './loading.module.css'

export default function Loading(){
    return(
        <>
        <div className={styles.containerLoaderFull}>
            <img src='/icons/loading.svg' alt='Carregamento' className={styles.loaderFull}/>
        </div>
        </>
    )
}