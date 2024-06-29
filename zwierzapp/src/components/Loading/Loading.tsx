import styles from "./Loading.module.scss";

function Loading({ message }) {
    return (
        <div className={styles.loadingContainer}>
                <p>{message}</p>
            <div className={styles.spinnerObject}></div>
        </div>
    );
}

export default Loading;
