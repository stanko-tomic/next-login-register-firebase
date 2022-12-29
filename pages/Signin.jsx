import React, { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import styles from "../styles/Signin.module.css";
import Spinner from "../components/Spinner";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { signIn } = UserAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      router.push("/Account");
    } catch (e) {
      setError("Wrong email or password.");
      console.log(e.message);
    }
  };

  return (
    <Suspense>
      {loading ? (
        <div>
          <Spinner loading={loading} />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.gridContainer}>
            <article className={styles.loginPage}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formTitle}>
                  <h1>Hey, welcome back 👋</h1>
                  <p>Welcome back, please sign in below.</p>
                </div>
                <div className={styles.formGroup}>
                  <div className={styles.labelError}>
                    <label>Email Address</label>
                    <p className={styles.error}>{error}</p>
                  </div>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    type="email"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Password</label>
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    type="password"
                  />
                </div>
                <div className={`${styles.formGroup} ${styles.formGroupBtn}`}>
                  <button>Sign In</button>
                </div>
                <p>
                  Don't have an account yet?{" "}
                  <Link href="/Signup">Sign up.</Link>
                </p>
              </form>
            </article>
            <article className={styles.gradient}>
              <div className={styles.circle}>
                <div className={styles.blur}></div>
              </div>
            </article>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default Signin;
